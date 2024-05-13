import bcrypt from "bcryptjs";

type RelationalObject = { id: number; parentId: number | null };
export function relationalObjectsToHierarchy<T>(
  objects: T[],
  relationalTransform: (obj: T) => T & RelationalObject
): (T & { children?: T[] })[] {
  const hierarchy: (T & { children?: T[] })[] = [];
  const objDict: { [key: number]: T & RelationalObject & { children?: T[] } } =
    {};
  const transformed = objects.map((obj) => relationalTransform(obj));

  for (const obj of transformed) {
    objDict[obj.id] = obj;
  }
  for (const obj of transformed) {
    if (obj.parentId === null) {
      hierarchy.push(obj);
      continue;
    }
    const parent = objDict[obj.parentId];
    if (!parent)
      throw new Error(
        `Failed to find parent for this object ${JSON.stringify(obj)}`
      );
    if (parent.children === undefined) parent.children = [];
    parent.children.push(obj);
  }

  return hierarchy;
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 11);
}
