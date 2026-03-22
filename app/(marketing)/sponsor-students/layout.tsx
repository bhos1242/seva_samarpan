import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor a Student – Fund Education in Pune",
  description: "Browse profiles of students who need support and sponsor their education directly. See where your money goes and track their progress.",
  keywords: ["sponsor student Pune", "fund education NGO", "student sponsorship India", "Seva Samarpan students"],
  openGraph: {
    title: "Sponsor a Student – Seva Samarpan",
    description: "Choose a student, fund their education, and follow their progress. Direct support, full transparency.",
    url: "/sponsor-students",
    images: [{ url: "/programs/samarpan.png", width: 1200, height: 630, alt: "Sponsor a student through Seva Samarpan" }],
  },
};

export default function StudentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
