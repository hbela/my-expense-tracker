"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addBill(formData: FormData) {
  const name = formData.get("name") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const dueDate = new Date(formData.get("dueDate") as string);
  const payee = formData.get("payee") as string;

  if (!name || isNaN(amount) || !dueDate || !payee) {
    return { success: false, error: "Invalid form data" };
  }
  try {
    const amount = parseFloat(formData.get("amount") as string);
    await prisma.bill.create({
      data: {
        name,
        amount,
        dueDate,
        payee,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to add bill:", error);
    return { success: false, error: "Failed to add bill" };
  }
}

export async function editBill(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const name = formData.get("name") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const dueDate = new Date(formData.get("dueDate") as string);
  const payee = formData.get("payee") as string;

  if (!id || !name || isNaN(amount) || !dueDate || !payee) {
    return { success: false, error: "Invalid form data" };
  }

  try {
    await prisma.bill.update({
      where: { id },
      data: { name, amount, dueDate, payee },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to edit bill:", error);
    return { success: false, error: "Failed to edit bill" };
  }
}

export async function deleteBill(id: number) {
  try {
    await prisma.bill.delete({
      where: { id },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete bill:", error);
    return { success: false, error: "Failed to delete bill" };
  }
}
