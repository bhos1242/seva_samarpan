import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Shield, Palette, Database, Code, Rocket } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built on Next.js 16 with Turbopack for instant hot reload.",
  },
  {
    icon: Shield,
    title: "Auth Ready",
    description: "Auth.js with Google & GitHub providers pre-configured.",
  },
  {
    icon: Palette,
    title: "Beautiful UI",
    description: "shadcn/ui components with dark mode support.",
  },
  {
    icon: Database,
    title: "Database Ready",
    description: "Prisma ORM with PostgreSQL schema ready to go.",
  },
  {
    icon: Code,
    title: "Type Safe",
    description: "Full TypeScript with Zod validation.",
  },
  {
    icon: Rocket,
    title: "Deploy Ready",
    description: "Optimized for Vercel deployment.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto flex flex-col items-center justify-center gap-6 pb-8 pt-16 md:pt-24 px-4">
        <Badge variant="secondary" className="px-4 py-1">
          ⚡ Hackathon Ready
        </Badge>
        <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Ship Your Idea
          <br />
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            In Record Time
          </span>
        </h1>
        <p className="max-w-2xl text-center text-lg text-muted-foreground sm:text-xl">
          Everything you need to win your next hackathon. Auth, database, UI
          components, and more – all pre-configured and ready to go.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/dashboard">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 md:py-24 px-4">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-16 md:py-24 px-4">
        <Card className="mx-auto max-w-3xl text-center">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl">
              Ready to Build Something Amazing?
            </CardTitle>
            <CardDescription className="text-base">
              Start with this template and focus on what matters – your unique
              idea.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Start Building Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
