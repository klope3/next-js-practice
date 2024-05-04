import { prisma } from "../../../prisma/client";

export default async function Categories() {
  const categories = await prisma.category.findMany();

  return (
    <>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </>
  );
}
