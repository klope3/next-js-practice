import { ReactNode } from "react";

type ItemWithChildren<T> = { children?: (T & ItemWithChildren<T>)[] };
type HierarchyViewProps<T> = {
  children?: (T & ItemWithChildren<T>)[];
  renderItem: (item: T) => ReactNode;
};
export function HierarchyView<T>({
  renderItem,
  children,
}: HierarchyViewProps<T>) {
  return (
    <ul>
      {children &&
        children.map((child) => (
          <>
            <li>{renderItem(child)}</li>
            {child.children && (
              <HierarchyView
                renderItem={renderItem}
                children={child.children}
              />
            )}
          </>
        ))}
    </ul>
  );
}
