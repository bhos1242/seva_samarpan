import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor a Student | Seva Samarpan NGO",
  description: "Browse student profiles and sponsor a child's education in Mulshi, Pune. Your contribution can change a life forever.",
  openGraph: {
    title: "Sponsor a Student | Seva Samarpan NGO",
    description: "Support education of tribal and underprivileged students in Pune.",
    url: "/students",
    images: [{ url: "/programs/samarpan.png", width: 1200, height: 630 }],
  },
};

export default function StudentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
