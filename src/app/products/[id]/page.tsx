import { prisma } from "../../../../prisma/client";

export default async function Product({ params }: { params: { id: number } }) {
  const id = +params.id;

  const existingProduct = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return (
    <>
      <h1>{existingProduct ? existingProduct.name : "Create Product"}</h1>
    </>
  );
}
