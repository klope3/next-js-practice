import { revalidatePath } from "next/cache";
import { prisma } from "../../../prisma/client";
import { redirect } from "next/navigation";

async function createCategory(formData: FormData) {
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

export default async function Categories() {
  const categories = await prisma.category.findMany();

  return (
    <>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <div key={category.id}>
            <li>{category.name}</li>
            <DeleteCategoryButton id={category.id} />
          </div>
        ))}
      </ul>
      <form action={createCategory}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

function DeleteCategoryButton({ id }: { id: number }) {
  const deleteCategoryWithId = deleteCategory.bind(null, id);

  return (
    <form action={deleteCategoryWithId}>
      <button>X</button>
    </form>
  );
}
