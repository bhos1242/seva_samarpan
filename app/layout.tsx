import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://sevasamarpan.org"),
  title: {
    default: "Seva Samarpan | NGO in Mulshi, Pune",
    template: "%s | Seva Samarpan",
  },
  description: "Empowering lives through education and care in Mulshi, Pune. We provide free study rooms, education sponsorships, and run a dignified old age home.",
  keywords: ["NGO", "NGO near me", "best NGO near me", "Mulshi", "Pune", "Education", "Old Age Home", "Charity", "Social Work", "Seva Samarpan"],
  authors: [{ name: "Seva Samarpan" }],
  creator: "Seva Samarpan",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "Seva Samarpan | NGO in Mulshi, Pune",
    description: "Empowering lives through education and care in Mulshi, Pune.",
    siteName: "Seva Samarpan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seva Samarpan | NGO in Mulshi, Pune",
    description: "Empowering lives through education and care in Mulshi, Pune.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >

            {children}
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
