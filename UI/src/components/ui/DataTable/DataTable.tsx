import React from "react";
import "./DataTable.css";

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  emptyMessage = "No data found",
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="data-table__empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="data-table__wrapper">
      <table className="data-table" id="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={col.width ? { width: col.width } : undefined}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={keyExtractor(item)}
              className={onRowClick ? "data-table__row--clickable" : ""}
              onClick={() => onRowClick?.(item)}
              style={{ animationDelay: `${index * 0.04}s` }}
            >
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render
                    ? col.render(item)
                    : (item as Record<string, unknown>)[col.key] as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
