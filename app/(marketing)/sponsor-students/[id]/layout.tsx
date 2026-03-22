import { Metadata } from "next";
import { prisma_db } from "@/lib/prisma";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://sevasamarpan.org";

  try {
    const student = await prisma_db.student.findUnique({
      where: { id },
      select: {
        fullName: true,
        photoUrl: true,
        standard: true,
        schoolOrCollege: true,
        location: true,
        category: true,
        requiredAmount: true,
        collectedAmount: true,
      },
    });

    if (!student) {
      return { title: "Student not found" };
    }

    const remaining = student.requiredAmount - student.collectedAmount;
    const description = `${student.fullName} is a ${student.standard} student at ${student.schoolOrCollege}, ${student.location}. ₹${remaining.toLocaleString("en-IN")} more needed. Sponsor their education today.`;

    return {
      title: `Sponsor ${student.fullName} – ${student.standard} Student`,
      description,
      openGraph: {
        title: `Sponsor ${student.fullName}'s Education`,
        description,
        url: `${baseUrl}/sponsor-students/${id}`,
        images: student.photoUrl
          ? [{ url: student.photoUrl, width: 600, height: 600, alt: student.fullName }]
          : undefined,
      },
    };
  } catch {
    return { title: "Sponsor a Student" };
  }
}

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
