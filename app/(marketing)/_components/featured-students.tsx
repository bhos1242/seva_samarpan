import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { StudentCard, type StudentCardProps } from "./student-card";

const featuredStudents: StudentCardProps['student'][] = [
  {
    id: '1',
    fullName: 'Priya Sharma',
    photoUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=400&fit=crop',
    age: 16,
    standard: '11th',
    schoolOrCollege: 'Mulshi High School',
    location: 'Mulshi, Pune',
    category: 'TRIBAL',
    requiredAmount: 25000,
    collectedAmount: 12000,
  },
  {
    id: '2',
    fullName: 'Rahul Patil',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    age: 19,
    standard: 'B.Com 2nd Year',
    schoolOrCollege: 'Pune College',
    location: 'Mulshi, Pune',
    category: 'UNDERPRIVILEGED',
    requiredAmount: 40000,
    collectedAmount: 28000,
  },
  {
    id: '3',
    fullName: 'Anita Desai',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    age: 14,
    standard: '9th',
    schoolOrCollege: 'Government School',
    location: 'Mulshi, Pune',
    category: 'TRIBAL',
    requiredAmount: 18000,
    collectedAmount: 5000,
  },
];

export function FeaturedStudents() {
  return (
    <section className="py-6 md:py-10 bg-muted/20">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Support Our Students</h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Every contribution makes a direct difference in a student&apos;s educational journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-10">
          {featuredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="rounded-xl px-6 md:px-8 h-12 flex items-center shadow-md shadow-primary/20 hover:shadow-lg transition-all" asChild>
            <Link href="/students">
              View All Students <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
