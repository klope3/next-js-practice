import { ReactNode } from "react";

type Column<T> = {
  header: ReactNode;
  createCell: (data: T) => ReactNode;
};
type ResourceTableProps<T> = {
  columns: Column<T>[];
  dataset: T[];
  tableClassName?: string;
};

export async function ResourceTable<T>({
  dataset,
  columns,
  tableClassName,
}: ResourceTableProps<T>) {
  return (
    <>
      <table className={tableClassName}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataset.map((data) => (
            <tr>
              {columns.map((column) => (
                <td>{column.createCell(data)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
