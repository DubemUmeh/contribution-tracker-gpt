"use client";

import Button from "@/components/_ui/button";
import FilterMenu from "@/components/_common/filter-menu";
import MobileFilters from "./mobile-filters";
import {
  ACTIVITY_OPTIONS,
  OWNER_OPTIONS,
  SORT_MENU_OPTIONS,
  STAGE_OPTIONS,
} from "./filter-options";
import type { SortKey } from "@/data/classmates";
import { TODAY, classmatesCsvRows, filterClassmates } from "@/lib/classmates";
import { downloadCsv } from "@/lib/csv";
import { useClassmatesStore } from "@/stores/classmates-store";
import ShareIcon from "@/public/assets/images/companies/toolbar/share.svg";
import PlusIcon from "@/public/assets/images/_common/plus.svg";

export default function ClassmatesToolbar() {
  const sortBy = useClassmatesStore((state) => state.sortBy);
  const owner = useClassmatesStore((state) => state.owner);
  const stage = useClassmatesStore((state) => state.stage);
  const activityWindow = useClassmatesStore((state) => state.activityWindow);
  const setSortBy = useClassmatesStore((state) => state.setSortBy);
  const setOwner = useClassmatesStore((state) => state.setOwner);
  const setStage = useClassmatesStore((state) => state.setStage);
  const setActivityWindow = useClassmatesStore(
    (state) => state.setActivityWindow,
  );
  const setNewClassmateOpen = useClassmatesStore(
    (state) => state.setNewClassmateOpen,
  );

  function exportCsv() {
    const { classmates } = useClassmatesStore.getState();
    const visible = filterClassmates(classmates, {
      sortBy,
      owner,
      stage,
      activityWindow,
    });
    downloadCsv(`classmates-${TODAY}.csv`, classmatesCsvRows(visible));
  }

  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 px-4 py-4">
      <MobileFilters className="sm:hidden" />

      <div className="hidden min-w-0 flex-wrap gap-2 sm:flex">
        <FilterMenu
          label="Sort by"
          value={sortBy}
          options={SORT_MENU_OPTIONS}
          onChange={(value) => setSortBy(value as SortKey)}
        />
        <FilterMenu
          label="Filter"
          value={owner}
          options={OWNER_OPTIONS}
          onChange={setOwner}
        />
        <FilterMenu
          label="Stage"
          value={stage}
          options={STAGE_OPTIONS}
          onChange={setStage}
        />
        <FilterMenu
          label="Last Activity"
          value={String(activityWindow)}
          options={ACTIVITY_OPTIONS}
          onChange={(value) => setActivityWindow(Number(value))}
        />
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Button variant="secondary" size="sm" onClick={exportCsv}>
          <ShareIcon aria-hidden className="size-3" />
          Export
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setNewClassmateOpen(true)}
        >
          <PlusIcon aria-hidden className="size-3" />
          New Event
        </Button>
      </div>
    </div>
  );
}
