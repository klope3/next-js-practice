import Link from "next/link";
import { prisma } from "../../../prisma/client";

export default async function Products() {
  const products = await prisma.product.findMany();

  return (
    <>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <div key={product.id}>
            <Link href={`/products/${product.id}`}>
              <li>
                {product.name} ${(product.priceCents / 100).toFixed(2)}
              </li>
            </Link>
          </div>
        ))}
      </ul>
      <Link href="/products/0">Create Product</Link>
    </>
  );
}
