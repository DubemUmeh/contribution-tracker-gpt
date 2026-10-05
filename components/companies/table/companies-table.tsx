"use client";

import { useMemo } from "react";
import { Checkbox } from "@/components/_ui/checkbox";
import { ScrollArea } from "@/components/_ui/scroll-area";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/_ui/table";
import ClassmateRow from "./classmate-row";
import TableFooter from "./table-footer";
import {
  TABLE_CELL_CLASS,
  TABLE_COLUMNS,
  TABLE_GRID_CLASS,
  TABLE_ROW_CLASS,
} from "./table-columns";
import { filterClassmates } from "@/lib/classmates";
import { cn } from "@/lib/utils";
import { useClassmatesStore } from "@/stores/classmates-store";

export default function ClassmatesTable() {
  const classmates = useClassmatesStore((state) => state.classmates);
  const sortBy = useClassmatesStore((state) => state.sortBy);
  const owner = useClassmatesStore((state) => state.owner);
  const stage = useClassmatesStore((state) => state.stage);
  const activityWindow = useClassmatesStore((state) => state.activityWindow);
  const selectedIds = useClassmatesStore((state) => state.selectedIds);
  const detailId = useClassmatesStore((state) => state.detailId);
  const detailOpen = useClassmatesStore((state) => state.detailOpen);
  const toggleSelected = useClassmatesStore((state) => state.toggleSelected);
  const setSelected = useClassmatesStore((state) => state.setSelected);
  const openDetail = useClassmatesStore((state) => state.openDetail);
  const openProfile = useClassmatesStore((state) => state.openProfile);

  const visible = useMemo(
    () => filterClassmates(classmates, { sortBy, owner, stage, activityWindow }),
    [classmates, sortBy, owner, stage, activityWindow],
  );

  const selectedVisible = visible.filter((classmate) =>
    selectedIds.includes(classmate.id),
  );
  const allSelected =
    visible.length > 0 && selectedVisible.length === visible.length;
  const someSelected = selectedVisible.length > 0 && !allSelected;

  function toggleAll() {
    setSelected(allSelected ? [] : visible.map((classmate) => classmate.id));
  }

  return (
    <div className="border-border flex min-h-0 flex-1 flex-col border-t">
      <ScrollArea orientation="both" className="min-h-0 flex-1">
        <Table role="table" className={cn(TABLE_GRID_CLASS, "w-full")}>
          <TableHeader role="rowgroup" className="contents">
            <TableRow role="row" className={TABLE_ROW_CLASS}>
              {TABLE_COLUMNS.map((column) => (
                <TableHead
                  key={column.key}
                  role="columnheader"
                  className={cn(TABLE_CELL_CLASS, column.className)}
                >
                  {column.key === "name" ? (
                    <span className="flex items-center gap-5">
                      <Checkbox
                        checked={
                          allSelected
                            ? true
                            : someSelected
                              ? "indeterminate"
                              : false
                        }
                        onCheckedChange={toggleAll}
                        aria-label="Select all classmates"
                      />
                      {column.label}
                    </span>
                  ) : (
                    column.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody role="rowgroup" className="contents">
            {visible.map((classmate) => (
              <ClassmateRow
                key={classmate.id}
                classmate={classmate}
                selected={selectedIds.includes(classmate.id)}
                active={detailOpen && detailId === classmate.id}
                onToggle={() => toggleSelected(classmate.id)}
                onOpen={() => openDetail(classmate.id)}
                onOpenOwner={() => openProfile(classmate.owner)}
              />
            ))}
            {visible.length === 0 && (
              <TableRow role="row" className={TABLE_ROW_CLASS}>
                <td
                  role="cell"
                  className="caption-style text-muted-foreground col-span-full flex h-[120px] items-center justify-center"
                >
                  No classmates match the current filters.
                </td>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      <TableFooter count={visible.length} />
    </div>
  );
}
