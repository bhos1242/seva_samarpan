'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { MapPin, GraduationCap } from 'lucide-react'

export interface StudentCardProps {
    student: {
        id: string
        fullName: string
        photoUrl: string
        age?: number
        standard: string
        schoolOrCollege: string
        location: string
        category: string
        requiredAmount: number
        collectedAmount: number
    }
    className?: string
}

export function StudentCard({ student, className }: StudentCardProps) {
    const percentage = Math.round((student.collectedAmount / student.requiredAmount) * 100)
    const remaining = student.requiredAmount - student.collectedAmount

    // Simple currency formatter as we don't have the sophisticated one in app folder yet
    const formatINR = (amt: number) => 
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amt)

    return (
        <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 group ${className || ''}`}>
            <div className="relative h-48 w-full overflow-hidden bg-muted">
                <Image
                    src={student.photoUrl}
                    alt={student.fullName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg font-bold truncate leading-tight">
                        {student.fullName}
                        {student.age && <span className="text-muted-foreground text-sm font-normal ml-1">({student.age})</span>}
                    </h3>
                </div>

                <div className="flex flex-col gap-1 text-xs text-muted-foreground mt-1">
                    <div className="flex items-center gap-1.5">
                        <GraduationCap className="h-3.5 w-3.5 text-primary" />
                        <span className="truncate">{student.standard} • {student.schoolOrCollege}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        <span className="truncate">{student.location}</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-4 pt-2 space-y-3">
                <div>
                    <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-bold text-primary">
                            {formatINR(student.collectedAmount)} raised
                        </span>
                        <span className="text-muted-foreground font-medium">
                            of {formatINR(student.requiredAmount)}
                        </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <p className="text-[10px] flex justify-between mt-2.5 font-bold uppercase tracking-wide">
                        <span className="text-primary">{percentage}% Funded</span>
                        <span className="text-muted-foreground">{formatINR(remaining)} to go</span>
                    </p>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button className="w-full h-9 bg-accent hover:bg-accent/90 shadow-md shadow-accent/20 group-hover:shadow-accent/30 text-white transition-all rounded-full font-bold" asChild>
                    <Link href={`/students/${student.id}`}>
                        View & Sponsor
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
