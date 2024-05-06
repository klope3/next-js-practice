import { Category } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { createCategory, deleteCategory } from "../../actions/categories";
import { relationalObjectsToHierarchy } from "@/utility";

export default async function Categories() {
  const categories = await prisma.category.findMany();
  const hierarchy = relationalObjectsToHierarchy(categories, (category) => ({
    ...category,
    parentId: category.parentCategoryId,
  }));

  return (
    <>
      <h1>Categories</h1>
      <CategoryHierarchy children={hierarchy} />
      <form action={createCategory}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

type CategoryWithChildren = Category & { children?: CategoryWithChildren[] };
type CategoryHierarchyProps = {
  children?: CategoryWithChildren[];
};
function CategoryHierarchy({ children }: CategoryHierarchyProps) {
  return (
    <ul>
      {children &&
        children.map((child) => (
          <>
            <li>
              {child.name}
              <DeleteCategoryButton id={child.id} />
            </li>
            {child.children && <CategoryHierarchy children={child.children} />}
          </>
        ))}
    </ul>
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
