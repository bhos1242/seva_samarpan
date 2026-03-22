import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-2xl md:text-4xl font-bold">Page not found</h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-xl h-10 md:h-12">
            <Link href="/">Go home</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-xl h-10 md:h-12">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
