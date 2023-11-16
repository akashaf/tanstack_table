"use client";

import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import mData from "./MOCK_DATA.json";
import { useMemo, useState } from "react";

export default function Home() {
  const data = useMemo(() => mData, []);

  const columns = [
    {
      accessorKey: "student_id",
      header: "student id",
    },
    {
      accessorKey: "Name",
      columns: [
        {
          accessorKey: "first_name",
          header: "first",
          rowSpan: 2,
        },
        {
          accessorKey: "last_name",
          header: "last",
          rowSpan: 2,
        },
      ],
    },
    {
      accessorKey: "age",
      header: "age",
    },
    {
      accessorKey: "email",
      header: "email",
    },
    {
      accessorKey: "country",
      header: "country",
    },
    {
      accessorKey: "postal_code",
      header: "postal code",
    },
    {
      accessorKey: "favorite_color",
      header: "favorite color",
    },
    {
      accessorKey: "gpa",
      header: "gpa",
    },
    {
      accessorKey: "enrollment_date",
      header: "enrollment date",
    },
    {
      accessorKey: "major",
      header: "major",
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });
  return (
    <main>
      <h1 className="mb-8">Tanstack Table</h1>
      <table className="min-w-full divide-y divide-gray-300">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th
                  key={header.id}
                  scope="col"
                  className="capitalize px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="space-x-4">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          first page
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          previous page
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          next page
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          last page
        </button>
      </div>
    </main>
  );
}
