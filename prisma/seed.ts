import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("Admin@123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@sevasamarpan.org" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@sevasamarpan.org",
      password: hashedPassword,
      role: "ADMIN",
      isVerified: true,
    },
  });
  console.log("Created admin user:", admin.email);

  // Create sample students
  const students = await Promise.all([
    prisma.student.upsert({
      where: { id: "seed-student-1" },
      update: {},
      create: {
        id: "seed-student-1",
        fullName: "Priya Sharma",
        photoUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=400&fit=crop",
        age: 16,
        standard: "11th",
        schoolOrCollege: "Government High School, Pune",
        location: "Pune",
        category: "TRIBAL",
        story: "Priya comes from a small village near Pune. Her father works as a daily wage labourer and her mother is a homemaker. Despite financial difficulties, Priya has consistently been among the top students in her class. She dreams of becoming a doctor and serving her community.",
        achievements: "School topper in 10th board exams\nDistrict-level science fair winner\nSelected for state scholarship program",
        requiredAmount: 25000,
        collectedAmount: 12000,
        progressPercentage: 48,
      },
    }),
    prisma.student.upsert({
      where: { id: "seed-student-2" },
      update: {},
      create: {
        id: "seed-student-2",
        fullName: "Rahul Patil",
        photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        age: 19,
        standard: "B.Com 2nd Year",
        schoolOrCollege: "Fergusson College, Pune",
        location: "Pune",
        category: "UNDERPRIVILEGED",
        story: "Rahul lost his father at a young age. His mother works as a domestic help to support the family. He is pursuing his B.Com degree while also tutoring younger students at our library. He wants to become a chartered accountant.",
        achievements: "College-level debate competition winner\nVolunteer at Seva Samarpan library\nMaintains 75%+ attendance despite part-time work",
        requiredAmount: 40000,
        collectedAmount: 28000,
        progressPercentage: 70,
      },
    }),
    prisma.student.upsert({
      where: { id: "seed-student-3" },
      update: {},
      create: {
        id: "seed-student-3",
        fullName: "Anita Desai",
        photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        age: 14,
        standard: "9th",
        schoolOrCollege: "Zilla Parishad School, Pune",
        location: "Pune",
        category: "TRIBAL",
        story: "Anita is a bright student from a tribal community near Pune. She walks 3 km daily to reach school. She is passionate about mathematics and wants to become an engineer. The Seva Samarpan library has been her second home for studying.",
        achievements: "Taluka-level maths olympiad participant\nRegular library user since 2025\nHelps younger students with homework at the library",
        requiredAmount: 18000,
        collectedAmount: 5000,
        progressPercentage: 28,
      },
    }),
  ]);

  console.log(`Created ${students.length} sample students`);
  console.log("\nSeed completed successfully!");
  console.log("Admin login: admin@sevasamarpan.org / Admin@123");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
