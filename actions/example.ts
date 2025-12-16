"use server";

// ============================================
// EXAMPLE SERVER ACTIONS
// Add your server actions here for fast hackathon development
// ============================================

import { revalidatePath } from "next/cache";

// Example: Create action
export async function createExample(formData: FormData) {
  const name = formData.get("name") as string;

  // Your database logic here
  // await prisma.example.create({ data: { name } });

  revalidatePath("/");
  return { success: true, message: "Created successfully!" };
}

// Example: Update action
export async function updateExample(id: string, formData: FormData) {
  const name = formData.get("name") as string;

  // Your database logic here
  // await prisma.example.update({ where: { id }, data: { name } });

  revalidatePath("/");
  return { success: true, message: "Updated successfully!" };
}

// Example: Delete action
export async function deleteExample(id: string) {
  // Your database logic here
  // await prisma.example.delete({ where: { id } });

  revalidatePath("/");
  return { success: true, message: "Deleted successfully!" };
}
