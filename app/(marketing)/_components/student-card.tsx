"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MapPin, GraduationCap } from "lucide-react";

export interface StudentCardProps {
  student: {
    id: string;
    fullName: string;
    photoUrl: string;
    age?: number;
    standard: string;
    schoolOrCollege: string;
    location: string;
    category: string;
    requiredAmount: number;
    collectedAmount: number;
  };
  className?: string;
}

export function StudentCard({ student, className }: StudentCardProps) {
  const percentage = Math.round(
    (student.collectedAmount / student.requiredAmount) * 100,
  );
  const remaining = student.requiredAmount - student.collectedAmount;

  // Simple currency formatter as we don't have the sophisticated one in app folder yet
  const formatINR = (amt: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);

  return (
    <Card
      className={`overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col border-border/40 bg-card rounded-2xl ${className || ""}`}
    >
      <Link
        href={`/students/${student.id}`}
        className="block relative h-40 md:h-48 w-full overflow-hidden bg-muted/50"
      >
        <Image
          src={student.photoUrl}
          alt={student.fullName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <CardHeader className="p-4 pb-2 space-y-1.5">
        <div className="flex justify-between items-start gap-2">
          <Link
            href={`/students/${student.id}`}
            className="hover:underline decoration-primary underline-offset-2 decoration-2 group-hover:text-primary transition-colors"
          >
            <h3 className="text-base md:text-lg font-bold truncate leading-tight text-foreground/90">
              {student.fullName}
              {student.age && (
                <span className="text-muted-foreground text-xs md:text-sm font-medium ml-1.5">
                  ({student.age})
                </span>
              )}
            </h3>
          </Link>
        </div>

        <div className="flex flex-col gap-1 text-[11px] md:text-xs text-muted-foreground font-medium">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="h-3 w-3 text-primary shrink-0" />
            <span className="truncate">
              {student.standard} <span className="opacity-50">•</span>{" "}
              {student.schoolOrCollege}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2 space-y-3 flex-1 flex flex-col justify-end">
        <div>
          <div className="flex justify-between text-xs mb-1.5 font-semibold">
            <span className="text-primary tracking-tight">
              {formatINR(student.collectedAmount)}
            </span>
            <span className="text-muted-foreground tracking-tight">
              Goal {formatINR(student.requiredAmount)}
            </span>
          </div>
          <Progress value={percentage} className="h-1.5 bg-muted/60" />
          <p className="text-[10px] flex justify-between mt-2 font-bold uppercase tracking-widest text-muted-foreground">
            <span>{percentage}%</span>
            <span>{formatINR(remaining)} left</span>
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full h-10 md:h-11 shadow-sm hover:shadow-md transition-all rounded-xl font-bold uppercase tracking-wider text-xs md:text-sm group-hover:bg-primary/90 group-hover:text-primary-foreground"
          variant="outline"
          asChild
        >
          <Link href={`/students/${student.id}`}>Sponsor Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
