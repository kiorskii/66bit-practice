import React, { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { Checkbox, Select, MenuItem } from "@mui/material";
import styles from "./Table.module.scss";
import { Button } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useSetIsBlockedSupplier } from "../../../api/useSuppliers";

const Table = ({ data, onRowClick }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { mutate: setIsBlockedSupplier } = useSetIsBlockedSupplier();

  const handleIsBlockedChange = (id, isBlocked, event) => {
    event.stopPropagation();
    setIsBlockedSupplier({ id, isBlocked });
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "webSite",
      header: "Сайт",
      cell: (info) => <a href={info.getValue() as string}>{info.getValue()}</a>,
    },
    {
      accessorKey: "name",
      header: "Поставщик",
    },
    {
      accessorKey: "city.name",
      header: "Город",
    },
    {
      accessorKey: "phoneNumber",
      header: "Телефон",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "updatedAt",
      header: "Дата",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    },
    {
      accessorKey: "status",
      header: "Статус",
      cell: (info) =>
        (info.getValue() as string) === "DEFAULT" ? (
          <p
            style={{
              padding: "5px",
              borderRadius: "5px",
              backgroundColor: "green",
              color: "white",
            }}
          >
            Сотрудичаем
          </p>
        ) : (
          "Заблокирован"
        ),
    },
    {
      accessorKey: "isBlocked",
      header: "Заблокирован",
      cell: (info) => (
        <Checkbox
          checked={info.getValue() as boolean}
          onChange={(e) =>
            handleIsBlockedChange(info.row.original.id, e.target.checked, e)
          }
          onClick={(e) => e.stopPropagation()} // Остановка распространения события
        />
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
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
                  <th
                    key={header.id}
                    className={styles.table_cell + " " + styles.header}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    <span
                      className={
                        header.column.getIsSorted() ? styles.sorted : ""
                      }
                    >
                      {header.column.getIsSorted() === "asc" ? (
                        <KeyboardArrowDown
                          sx={{
                            color: "gray",
                            position: "absolute",
                            bottom: "5px",
                            right: "5px",
                          }}
                        />
                      ) : (
                        <KeyboardArrowUp
                          sx={{
                            color: "gray",
                            position: "absolute",
                            bottom: "5px",
                            right: "5px",
                          }}
                        />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={styles.table_row}
                onClick={() => onRowClick(row.original)}
              >
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
