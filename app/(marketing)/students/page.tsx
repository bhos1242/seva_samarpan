'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Search, Filter, Loader2, GraduationCap } from "lucide-react"
import { StudentCard, StudentCardProps } from "../_components/student-card"

export default function StudentsPage() {
    const [students, setStudents] = useState<StudentCardProps['student'][]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [category, setCategory] = useState<string>('ALL')

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await fetch('/api/students')
                if (res.ok) {
                    const data = await res.json()
                    setStudents(data)
                }
            } catch (error) {
                console.error("Failed to load students", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchStudents()
    }, [])

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.fullName.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = category === 'ALL' || student.category === category
        return matchesSearch && matchesCategory
    })

    return (
        <div className="flex flex-col min-h-screen pb-20">
            {/* Header Section */}
            <section className="relative py-16 bg-muted/30 border-b">
                 <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[50px_50px]" />
                 <div className="container mx-auto px-4 relative text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                        Support Our <span className="text-primary">Stars</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Your contribution can change a life forever. Choose a student to support their education and dreams.
                    </p>
                 </div>
            </section>

            <div className="container mx-auto px-4 -mt-8 relative z-10">
                {/* Filters */}
                <Card className="p-4 md:p-6 shadow-xl border-none bg-card mb-12">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search students by name..."
                                className="pl-10 h-12 bg-muted/20 border-none focus-visible:ring-primary rounded-xl"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <Filter className="h-5 w-5 text-muted-foreground" />
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger className="w-full md:w-[200px] h-12 bg-muted/20 border-none focus:ring-primary rounded-xl">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Categories</SelectItem>
                                    <SelectItem value="UNDERPRIVILEGED">Underprivileged</SelectItem>
                                    <SelectItem value="TRIBAL">Tribal</SelectItem>
                                    <SelectItem value="ORPHAN">Orphan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </Card>

                {/* Grid */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-24">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                ) : filteredStudents.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredStudents.map((student) => (
                            <StudentCard key={student.id} student={student} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 space-y-4 bg-muted/10 rounded-3xl border-2 border-dashed">
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                            <GraduationCap className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                             <h3 className="text-2xl font-bold">No students found</h3>
                             <p className="text-muted-foreground">Adjust your filters or try a different search term.</p>
                        </div>
                        <Button variant="outline" className="rounded-full" onClick={() => {setSearchQuery(''); setCategory('ALL')}}>
                            Clear All Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
