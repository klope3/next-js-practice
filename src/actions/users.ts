"use server";

import { validateCreateUserForm } from "@/validations";
import { prisma } from "../../prisma/client";
import { hashPassword } from "@/utility";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
  const parsed = validateCreateUserForm(formData);
  const hashedPassword = hashPassword(parsed.password);

  await prisma.user.create({
    data: {
      name: parsed.name,
      email: parsed.email,
      passwordHash: hashedPassword,
      roleId: parsed.roleId,
    },
  });

  revalidatePath("/users");
  redirect("/users");
}
