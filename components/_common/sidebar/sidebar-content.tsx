"use client";

import Button from "@/components/_ui/button";
import { ScrollArea } from "@/components/_ui/scroll-area";
import SidebarNavItem from "./sidebar-nav-item";
import SidebarSection from "./sidebar-section";
import { useClassmatesStore } from "@/stores/classmates-store";
import Logo from "@/public/assets/images/_common/logo.svg";
import BuildingIcon from "@/public/assets/images/classmates/sidebar/building.svg";
import ClipboardIcon from "@/public/assets/images/classmates/sidebar/clipboard.svg";
import BarChartIcon from "@/public/assets/images/classmates/sidebar/bar-chart.svg";
import ListIcon from "@/public/assets/images/classmates/sidebar/list.svg";
import BookClosedIcon from "@/public/assets/images/classmates/sidebar/book-closed.svg";
import MailIcon from "@/public/assets/images/classmates/sidebar/mail.svg";
import TargetIcon from "@/public/assets/images/classmates/sidebar/target-05.svg";
import TargetAltIcon from "@/public/assets/images/classmates/sidebar/target-03.svg";
import UsersIcon from "@/public/assets/images/classmates/sidebar/users.svg";
import BarChartAltIcon from "@/public/assets/images/classmates/sidebar/bar-chart-10.svg";
import AlertTriangleIcon from "@/public/assets/images/classmates/sidebar/alert-triangle.svg";
import DotYellow from "@/public/assets/images/classmates/sidebar/dot-yellow.svg";
import DotPink from "@/public/assets/images/classmates/sidebar/dot-pink.svg";
import DotPurple from "@/public/assets/images/classmates/sidebar/dot-purple.svg";
import UserPlusIcon from "@/public/assets/images/classmates/sidebar/user-plus.svg";
import MessageQuestionIcon from "@/public/assets/images/classmates/sidebar/message-question.svg";
import WalletIcon from "@/public/assets/images/classmates/sidebar/wallet.svg";

const BASE_COMPANY_COUNT = 223;

export default function SidebarContent() {
  const classmateCount = useClassmatesStore((state) => state.classmates.length);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-sidebar-border bg-sidebar-accent flex shrink-0 items-center gap-2 border-b p-3">
        <Logo aria-hidden className="size-8 shrink-0 overflow-visible" />
        <div className="flex min-w-0 flex-col gap-1">
          <span className="lead-style block truncate font-medium tracking-[-0.01em]">
            Contribution Tracker
          </span>
          <span className="caption-style text-subtle block truncate">
            Class contribution workspace
          </span>
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <nav aria-label="Primary">
          <SidebarSection className="border-sidebar-border border-b">
            <SidebarNavItem
              icon={BuildingIcon}
              label="Classmates"
              count={BASE_COMPANY_COUNT + classmateCount}
              active
            />
            <SidebarNavItem icon={ClipboardIcon} label="Contribution Events" />
            <SidebarNavItem icon={BarChartIcon} label="Participation" count={9} />
            <SidebarNavItem icon={ListIcon} label="Activity" />
            <SidebarNavItem icon={BookClosedIcon} label="Class Roster" count={38} />
            <SidebarNavItem icon={MailIcon} label="Imports" />
          </SidebarSection>

          <SidebarSection
            title="Team"
            className="border-sidebar-border border-b"
          >
            <SidebarNavItem icon={TargetIcon} label="Active Events" />
            <SidebarNavItem icon={TargetAltIcon} label="Classmates" />
            <SidebarNavItem icon={UsersIcon} label="Administrators" />
          </SidebarSection>

          <SidebarSection
            title="Reporting"
            className="border-sidebar-border border-b"
          >
            <SidebarNavItem icon={BarChartAltIcon} label="Q1 Participation" />
            <SidebarNavItem icon={AlertTriangleIcon} label="Missed Contributions" />
          </SidebarSection>

          <SidebarSection title="Events">
            <SidebarNavItem icon={DotYellow} label="Current Event" />
            <SidebarNavItem icon={DotPink} label="Past Events" />
            <SidebarNavItem icon={DotPurple} label="Archived Events" />
          </SidebarSection>
        </nav>
      </ScrollArea>

      <SidebarSection className="border-sidebar-border shrink-0 border-t border-b">
        <SidebarNavItem
          icon={UserPlusIcon}
          label="Invite teammates"
          tone="quiet"
        />
        <SidebarNavItem icon={MessageQuestionIcon} label="Help" tone="quiet" />
      </SidebarSection>

      <div className="border-sidebar-border bg-sidebar-accent flex shrink-0 items-center justify-between gap-2 border-b p-4">
        <div className="flex flex-col gap-2">
          <span className="lead-style block font-medium tracking-[-0.01em]">
            14 Days
          </span>
          <span className="caption-style text-subtle block">
            Left on trials
          </span>
        </div>
        <Button variant="muted" size="md">
          <WalletIcon aria-hidden className="size-3.5" />
          Add Billings
        </Button>
      </div>
    </div>
  );
}
