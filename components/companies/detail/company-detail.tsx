"use client";

import { useState } from "react";
import Asset from "@/components/_ui/asset";
import Avatar from "@/components/_ui/avatar";
import Button from "@/components/_ui/button";
import Tag from "@/components/_ui/tag";
import { ScrollArea } from "@/components/_ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/_ui/sheet";
import FilterMenu from "@/components/_common/filter-menu";
import DetailSection from "./detail-section";
import PipelineHealth from "./pipeline-health";
import ActivityTrend from "./activity-trend";
import ScoreCard from "./score-card";
import {
  SCORE_CARDS,
  TAG_TONES,
  TREND_WINDOWS,
  ownerByName,
} from "@/data/classmates";
import { useClassmatesStore } from "@/stores/classmates-store";
import BuildingIcon from "@/public/assets/images/classmates/detail/building.svg";
import XIcon from "@/public/assets/images/classmates/detail/x.svg";
import MailIcon from "@/public/assets/images/classmates/detail/mail-04.svg";
import PhoneIcon from "@/public/assets/images/classmates/detail/phone.svg";

const WINDOW_OPTIONS = TREND_WINDOWS.map((label) => ({ value: label, label }));

export default function ClassmateDetail() {
  const detailId = useClassmatesStore((state) => state.detailId);
  const detailOpen = useClassmatesStore((state) => state.detailOpen);
  const classmates = useClassmatesStore((state) => state.classmates);
  const closeDetail = useClassmatesStore((state) => state.closeDetail);
  const openProfile = useClassmatesStore((state) => state.openProfile);
  const [trendWindow, setTrendWindow] = useState(TREND_WINDOWS[1]);
  const [scoreWindow, setScoreWindow] = useState(TREND_WINDOWS[1]);

  const classmate = classmates.find((item) => item.id === detailId);
  const owner = classmate ? ownerByName(classmate.owner) : null;

  return (
    <Sheet
      open={detailOpen && classmate !== undefined}
      onOpenChange={(open) => !open && closeDetail()}
    >
      <SheetContent side="right" className="sm:w-[560px] sm:max-w-[560px]">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <BuildingIcon aria-hidden className="text-icon size-3.5" />
            <SheetTitle>Classmate Details</SheetTitle>
          </div>
          <SheetDescription className="sr-only">
            Account summary, pipeline health, activity and score cards
          </SheetDescription>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="-mr-1"
              aria-label="Close details"
            >
              <XIcon aria-hidden className="text-foreground size-4" />
            </Button>
          </SheetClose>
        </SheetHeader>

        {classmate && owner && (
          <ScrollArea className="min-h-0 flex-1">
            <div className="flex items-start gap-3 p-5 shadow-[inset_0_-1px_0_var(--line-strong)]">
              <span className="bg-muted flex size-[50px] shrink-0 items-center justify-center rounded-[12.5px] shadow-[0px_6.25px_6.25px_0px_rgba(15,15,15,0.24),0px_0px_0px_1.563px_#232323]">
                {classmate.logo ? (
                  <Asset
                    type="image"
                    src={classmate.logo}
                    alt={`${classmate.name} logo`}
                    width={1}
                    height={1}
                    fit="contain"
                    className="size-8"
                  />
                ) : (
                  <span className="h2-style text-soft">
                    {classmate.name.slice(0, 1)}
                  </span>
                )}
              </span>
              <div className="flex min-w-0 flex-col gap-3">
                <h2 className="truncate">{classmate.name}</h2>
                <div className="flex flex-wrap items-center gap-[3px]">
                  {classmate.tags.map((tag) => (
                    <Tag key={tag} tone={TAG_TONES[tag]} size="sm">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>

            <DetailSection title="Account summary">
              <div className="lead-style flex flex-wrap items-center gap-x-4 gap-y-3">
                <Button
                  variant="ghost"
                  size="none"
                  onClick={() => openProfile(owner.name)}
                  aria-label={`Open ${owner.name} profile`}
                  className="lead-style text-foreground -mx-1.5 gap-1.5 px-1.5 py-1 font-medium"
                >
                  <Avatar src={owner.avatar} alt="" />
                  {owner.name}
                </Button>
                <span className="flex items-center gap-1">
                  <MailIcon aria-hidden className="text-soft size-3" />
                  {owner.email}
                </span>
                <span className="flex items-center gap-1">
                  <PhoneIcon aria-hidden className="text-soft size-3" />
                  {owner.phone}
                </span>
              </div>
            </DetailSection>

            <DetailSection title="Pipeline health">
              <PipelineHealth classmate={classmate} />
            </DetailSection>

            <DetailSection
              title="Activity trend"
              action={
                <FilterMenu
                  value={trendWindow}
                  options={WINDOW_OPTIONS}
                  onChange={setTrendWindow}
                  align="end"
                />
              }
            >
              <ActivityTrend classmate={classmate} />
            </DetailSection>

            <DetailSection
              title="Score card"
              className="gap-3 shadow-none"
              action={
                <FilterMenu
                  value={scoreWindow}
                  options={WINDOW_OPTIONS}
                  onChange={setScoreWindow}
                  align="end"
                  className="shadow-[0px_4px_4px_0px_rgba(15,15,15,0.24),0px_0px_0px_1px_#393939]"
                />
              }
            >
              <div className="flex flex-col gap-2">
                {SCORE_CARDS.map((card, index) => (
                  <ScoreCard key={`${card.title}-${index}`} card={card} />
                ))}
              </div>
            </DetailSection>
          </ScrollArea>
        )}

        <SheetFooter>
          <Button variant="link" size="none" href="#" className="lead-style">
            Need help? Ask us.
          </Button>
          <div className="flex items-center gap-2">
            <SheetClose asChild>
              <Button variant="subtle" size="sm">
                Cancel
              </Button>
            </SheetClose>
            <Button variant="primary" size="sm" onClick={closeDetail}>
              Save Update
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
