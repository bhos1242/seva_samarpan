import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma_db } from "./prisma";

// Extend session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: string;
      isVerified: boolean;
      provider?: string;
    };
  }

  interface User {
    role: string;
    isVerified: boolean;
  }
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma_db),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Validate credentials
          const { email, password } = loginSchema.parse(credentials);

          // Find user by email
          const user = await prisma_db.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            throw new Error("Invalid credentials");
          }

          // Verify password
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) {
            throw new Error("Invalid credentials");
          }

          // Check if user is verified
          if (!user.isVerified) {
            throw new Error("Please verify your email before logging in");
          }

          // Return user object
          return {
            id: user.id,
            email: user.email!,
            name: user.name,
            image: user.image,
            role: user.role,
            isVerified: user.isVerified,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("SignIn callback:", { user, account, provider: account?.provider });
      // Auto-verify OAuth users (Google, GitHub, etc.)
      if (account?.provider && account.provider !== "credentials" && user.email) {
        console.log("Verifying OAuth user:", user.email);
        await prisma_db.user.updateMany({
          where: { email: user.email },
          data: { isVerified: true },
        });
        // Mark user as verified immediately in the user object
        user.isVerified = true;
      }
      return true;
    },
    async jwt({ token, user, account, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isVerified = user.isVerified;
        
        // Store provider info to differentiate OAuth vs credentials
        if (account?.provider) {
          token.provider = account.provider;
          // OAuth users are always verified
          if (account.provider !== "credentials") {
            token.isVerified = true;
          }
        }
      }
      
      // For credentials users, fetch fresh data from DB
      // For OAuth users, trust the token since they're auto-verified
      if (token.id && token.provider === "credentials") {
        const dbUser = await prisma_db.user.findUnique({
          where: { id: token.id as string },
          select: { role: true, isVerified: true },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.isVerified = dbUser.isVerified;
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.provider = token.provider as string | undefined;
      }
      return session;
    },
  },
});
