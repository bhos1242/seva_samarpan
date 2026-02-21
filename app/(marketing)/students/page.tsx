"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Search, Filter, Loader2, GraduationCap } from "lucide-react";
import { StudentCard, StudentCardProps } from "../_components/student-card";

export default function StudentsPage() {
  const [students, setStudents] = useState<StudentCardProps["student"][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string>("ALL");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/students");
        if (res.ok) {
          const data = await res.json();
          setStudents(data);
        }
      } catch (error) {
        console.error("Failed to load students", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.fullName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = category === "ALL" || student.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Header Section */}
      <section className="relative py-12 md:py-16 bg-muted/30 border-b">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[50px_50px]" />
        <div className="container mx-auto px-4 relative text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
            Support Our <span className="text-primary">Stars</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto font-medium">
            Your contribution can change a life forever. Choose a student to
            support their education and dreams.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-6 md:-mt-8 relative z-10">
        {/* Filters */}
        <Card className="p-3 md:p-4 shadow-lg border-border/50 bg-card mb-8 md:mb-10 rounded-2xl">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                className="pl-9 h-10 md:h-11 bg-muted/30 border-none focus-visible:ring-primary rounded-xl text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
              <Filter className="h-4 w-4 text-muted-foreground hidden md:block" />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full md:w-[180px] h-10 md:h-11 bg-muted/30 border-none focus:ring-primary rounded-xl text-sm font-medium">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="ALL" className="text-sm">
                    All Categories
                  </SelectItem>
                  <SelectItem value="UNDERPRIVILEGED" className="text-sm">
                    Underprivileged
                  </SelectItem>
                  <SelectItem value="TRIBAL" className="text-sm">
                    Tribal
                  </SelectItem>
                  <SelectItem value="ORPHAN" className="text-sm">
                    Orphan
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-y-4 bg-muted/10 rounded-3xl border-2 border-dashed border-border/60">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <GraduationCap className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold">No students found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Adjust your filters or try a different search term.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl h-10 px-6 font-semibold"
              onClick={() => {
                setSearchQuery("");
                setCategory("ALL");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
