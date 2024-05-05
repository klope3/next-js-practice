import { prisma } from "../../../../prisma/client";
import { ProductForm } from "./ProductForm";

export default async function ProductPage({
  params,
}: {
  params: { id: number };
}) {
  const id = +params.id;

  const existingProduct = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return (
    <>
      <ProductForm existingProduct={existingProduct} />
    </>
  );
}
