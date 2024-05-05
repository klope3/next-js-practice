"use server";

import { validateProductForm } from "@/validations";
import { prisma } from "../../prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  const { name, price } = validateProductForm(formData);

  await prisma.product.create({
    data: {
      name: name.length ? name : "(Untitled)",
      priceCents: Math.round(price * 100),
    },
  });

  redirect("/products");
}

export async function updateProduct(formData: FormData, id: number) {
  const { name, price } = validateProductForm(formData);

  await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      priceCents: Math.round(price * 100),
    },
  });

  revalidatePath(`/products`);
  redirect(`/products/${id}`);
}
