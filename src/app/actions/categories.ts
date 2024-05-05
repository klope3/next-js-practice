"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../prisma/client";
import { redirect } from "next/navigation";

export async function createCategory(formData: FormData) {
  "use server";

  const name = formData.get("name");
  if (!name) return;

  await prisma.category.create({
    data: {
      name: `${name}`,
    },
  });

  revalidatePath("/categories");
  redirect("/categories");
}

export async function deleteCategory(id: number) {
  "use server";

  await prisma.category.delete({
    where: {
      id,
    },
  });

  revalidatePath("/categories");
}
