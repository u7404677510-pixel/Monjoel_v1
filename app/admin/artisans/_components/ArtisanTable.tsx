"use client";

/**
 * ArtisanTable — vue table TanStack v8 (selection + tri + pagination).
 *
 * Style DA Purple : header `bg-joel-violet/5`, row hover zinc-50.
 * Reuse direct des primitives `@tanstack/react-table` (le wrapper DataTable
 * du design system ne supporte pas les checkboxes de sélection).
 *
 * Colonnes :
 *  - select (checkbox header + row)
 *  - Nom (avatar + nom + email)
 *  - Métiers (badges)
 *  - Zones (chips)
 *  - Statut (badge live)
 *  - Rating (star + valeur)
 *  - Interventions (count)
 *  - Actions (edit / delete / phone)
 */

import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Edit2,
  Phone,
  Star,
  Trash2,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Artisan } from "@/lib/schemas/artisan";
import { STATUS_CONFIG, TRADE_ICONS } from "./status-config";
import { ArtisanAvatar } from "./ArtisanCard";

interface Props {
  data: Artisan[];
  selection: Record<string, boolean>;
  onSelectionChange: (next: Record<string, boolean>) => void;
  onEdit: (a: Artisan) => void;
  onDelete: (a: Artisan) => void;
}

export function ArtisanTable({
  data,
  selection,
  onSelectionChange,
  onEdit,
  onDelete,
}: Props) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ]);

  const columns = useMemo<ColumnDef<Artisan>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllRowsSelected()
                ? true
                : table.getIsSomeRowsSelected()
                  ? "indeterminate"
                  : false
            }
            onChange={(v) => table.toggleAllRowsSelected(!!v)}
            ariaLabel="Tout sélectionner"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onChange={(v) => row.toggleSelected(!!v)}
            ariaLabel={`Sélectionner ${row.original.first_name}`}
          />
        ),
        enableSorting: false,
        size: 40,
      },
      {
        id: "name",
        accessorFn: (a) => `${a.last_name} ${a.first_name}`,
        header: "Artisan",
        cell: ({ row }) => {
          const a = row.original;
          return (
            <div className="flex items-center gap-3 min-w-0">
              <ArtisanAvatar artisan={a} size={36} />
              <div className="min-w-0">
                <p className="font-semibold text-zinc-900 truncate">
                  {a.first_name} {a.last_name}
                </p>
                <p className="text-xs text-zinc-500 truncate">
                  {a.email ?? a.phone}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        id: "trades",
        accessorFn: (a) => a.trades.join(", "),
        header: "Métiers",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.trades.length === 0 ? (
              <span className="text-xs text-zinc-400 italic">—</span>
            ) : (
              row.original.trades.map((t) => {
                const Icon =
                  (TRADE_ICONS as Record<string, typeof Wrench>)[t] ?? Wrench;
                return (
                  <Badge key={t} variant="primary" className="text-[11px]">
                    <Icon size={10} />
                    {t}
                  </Badge>
                );
              })
            )}
          </div>
        ),
        enableSorting: false,
      },
      {
        id: "zones",
        accessorFn: (a) => a.zones.join(", "),
        header: "Zones",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.zones.length === 0 ? (
              <span className="text-xs text-zinc-400 italic">—</span>
            ) : (
              row.original.zones.map((z) => (
                <span
                  key={z}
                  className="px-1.5 py-0.5 text-[11px] font-bold rounded-md bg-zinc-100 text-zinc-700"
                >
                  {z}
                </span>
              ))
            )}
          </div>
        ),
        enableSorting: false,
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => {
          const sc =
            STATUS_CONFIG[row.original.status] ?? STATUS_CONFIG.active;
          return (
            <span
              className={cn(
                "inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full border",
                sc.badgeClass
              )}
            >
              <span className="relative flex h-1.5 w-1.5">
                {sc.pulse && (
                  <span
                    className={cn(
                      "absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping",
                      sc.dotClass
                    )}
                  />
                )}
                <span
                  className={cn(
                    "relative inline-flex h-1.5 w-1.5 rounded-full",
                    sc.dotClass
                  )}
                />
              </span>
              {sc.label}
            </span>
          );
        },
      },
      {
        id: "rating",
        accessorKey: "rating",
        header: "Note",
        cell: ({ row }) => (
          <div className="inline-flex items-center gap-1">
            <Star size={12} className="text-joel-yellow fill-joel-yellow" />
            <span className="text-sm font-semibold text-zinc-800">
              {(row.original.rating ?? 0).toFixed(1)}
            </span>
          </div>
        ),
      },
      {
        id: "interventions",
        accessorKey: "total_interventions",
        header: "Interv.",
        cell: ({ row }) => (
          <span className="text-sm font-semibold text-zinc-700">
            {row.original.total_interventions ?? 0}
          </span>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const a = row.original;
          return (
            <div className="flex items-center gap-1 justify-end">
              <a
                href={`tel:${a.phone}`}
                aria-label="Appeler"
                className="p-2 text-joel-violet hover:bg-joel-violet/5 rounded-lg transition-colors"
              >
                <Phone size={14} />
              </a>
              <button
                type="button"
                onClick={() => onEdit(a)}
                aria-label="Modifier"
                className="p-2 text-joel-violet hover:bg-joel-violet/10 rounded-lg transition-colors"
              >
                <Edit2 size={14} />
              </button>
              <button
                type="button"
                onClick={() => onDelete(a)}
                aria-label="Supprimer"
                className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    [onEdit, onDelete]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection: selection as RowSelectionState,
    },
    getRowId: (row) => row.id,
    onSortingChange: setSorting,
    onRowSelectionChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater(selection as RowSelectionState)
          : updater;
      onSelectionChange(next as Record<string, boolean>);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 12 },
    },
  });

  const totalRows = table.getRowModel().rows.length;
  const pageIdx = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-zinc-200 overflow-hidden bg-white">
        <table className="w-full caption-bottom text-sm">
          <thead className="bg-joel-violet/5">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-joel-violet/10"
              >
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      style={{
                        width:
                          header.getSize() === 150
                            ? undefined
                            : header.getSize(),
                      }}
                      className={cn(
                        "h-11 px-4 text-left align-middle text-joel-violet font-semibold text-xs uppercase tracking-wide",
                        canSort &&
                          "cursor-pointer select-none hover:bg-joel-violet/10 transition-colors"
                      )}
                      onClick={
                        canSort
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                    >
                      {header.isPlaceholder ? null : (
                        <div className="inline-flex items-center gap-1.5">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {canSort && (
                            <span className="inline-flex">
                              {sortDir === "asc" ? (
                                <ArrowUp className="h-3 w-3" />
                              ) : sortDir === "desc" ? (
                                <ArrowDown className="h-3 w-3" />
                              ) : (
                                <ArrowUpDown className="h-3 w-3 opacity-40" />
                              )}
                            </span>
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-zinc-100 last:border-b-0 hover:bg-zinc-50 transition-colors data-[state=selected]:bg-joel-violet/5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 align-middle text-zinc-700"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-24 text-center text-zinc-400 text-sm"
                >
                  Aucun artisan ne correspond aux filtres
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-4 px-2">
        <div className="text-xs text-zinc-500">
          {totalRows} résultat{totalRows > 1 ? "s" : ""}
          {pageCount > 1 && (
            <>
              {" • "}Page {pageIdx + 1} / {pageCount}
            </>
          )}
        </div>
        {pageCount > 1 && (
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Précédent
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Suivant
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Checkbox primitive (DA Purple) ─────────────────────────────────────────

function Checkbox({
  checked,
  onChange,
  ariaLabel,
}: {
  checked: boolean | "indeterminate";
  onChange: (next: boolean) => void;
  ariaLabel: string;
}) {
  const isChecked = checked === true;
  const isIndeterminate = checked === "indeterminate";

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isIndeterminate ? "mixed" : isChecked}
      aria-label={ariaLabel}
      onClick={() => onChange(!isChecked)}
      className={cn(
        "w-4 h-4 rounded-sm border-2 transition-all flex items-center justify-center",
        isChecked || isIndeterminate
          ? "bg-joel-violet border-joel-violet text-white"
          : "bg-white border-zinc-300 hover:border-joel-violet"
      )}
    >
      {isChecked && (
        <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden>
          <path
            d="M3 8l3 3 7-7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {isIndeterminate && (
        <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden>
          <path
            d="M3 8h10"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
