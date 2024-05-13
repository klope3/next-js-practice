"use server";

import { validateUserForm } from "@/validations";
import { prisma } from "../../prisma/client";
import { hashPassword } from "@/utility";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
  const parsed = validateUserForm(formData);
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

export async function updateUser(formData: FormData) {
  const parsed = validateUserForm(formData);
  const id = parsed.existingUserId;
  if (!id || isNaN(+id))
    throw new Error(
      "There was a problem with the provided user id. This is a bug."
    );
  const hashedPassword = hashPassword(parsed.password);

  await prisma.user.update({
    where: {
      id: +id,
    },
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
