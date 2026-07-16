import { cn } from "@safari/shared";

export type TableColumn<T> = {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  className?: string;
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  emptyMessage?: string;
  className?: string;
};

export function Table<T>({
  columns,
  rows,
  getRowKey,
  emptyMessage = "Nothing to show yet.",
  className,
}: TableProps<T>) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-card,1.25rem)] border border-border bg-card",
        className,
      )}
    >
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-cream">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted",
                  col.className,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-sm text-muted"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={getRowKey(row)}
                className="border-b border-border last:border-b-0"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-4 py-3 text-foreground",
                      col.className,
                    )}
                  >
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
