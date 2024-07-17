import { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import DATA from "../../../DATA.ts";
import styles from "./Table.module.scss";
import { Button } from "@mui/material";

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "site",
    header: "Site",
    cell: (info) => <a href={info.getValue() as string}>{info.getValue()}</a>,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "isBlocked",
    header: "Blocked",
    cell: (info) => (info.getValue() ? "Yes" : "No"),
  },
];

const Table = () => {
  const data = useMemo(() => DATA.suppliers, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: 10, //custom default page size
      },
    },
  });

  return (
    <>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={styles.table_row}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={styles.table_cell}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={styles.table_row}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.table_cell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <div className={styles.pagination_pages}>
          <p>Отображать:</p>
          {[10, 20, 30, 40, 50, 100, 200, 300].map((pageSize) => (
            <a
              className={
                styles.page_size +
                " " +
                (table.getState().pagination.pageSize === pageSize
                  ? styles.active
                  : "")
              }
              key={pageSize}
              onClick={() => table.setPageSize(pageSize)}
            >
              {pageSize}
            </a>
          ))}
          <a
            onClick={() => {
              table.setPageSize(table.getPrePaginationRowModel().rows.length);
            }}
          >
            все
          </a>
        </div>
        <div className={styles.pagination_info}>
          <p>Страница: </p>

          <a className={styles.page_index + " " + styles.active}>
            {table.getState().pagination.pageIndex + 1}
          </a>
        </div>
        <div className={styles.pagination_buttons}>
          <Button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Table;
