import Link from "next/link";
import { prisma } from "../../../prisma/client";
import { ResourceTable } from "@/components/ResourceTable";

export default async function Products() {
  const products = await prisma.product.findMany();

  return (
    <>
      <h1>Products</h1>
      <ResourceTable
        tableClassName="my-table"
        dataset={products}
        columns={[
          {
            header: <>ID</>,
            createCell: (product) => product.id,
          },
          {
            header: <>Name</>,
            createCell: (product) => (
              <Link href={`/products/${product.id}`}>{product.name}</Link>
            ),
          },
          {
            header: <>Price</>,
            createCell: (product) =>
              `$${(product.priceCents / 100).toFixed(2)}`,
          },
          {
            header: <>Last Updated</>,
            createCell: (product) =>
              `${product.updatedAt.toLocaleDateString()} (${product.updatedAt.toLocaleTimeString()})`,
          },
        ]}
      />
      {/* <ul>
        {products.map((product) => (
          <div key={product.id}>
            <Link href={`/products/${product.id}`}>
              <li>
                {product.name} ${(product.priceCents / 100).toFixed(2)}
              </li>
            </Link>
          </div>
        ))}
      </ul> */}

      <Link href="/products/0">Create Product</Link>
    </>
  );
}
