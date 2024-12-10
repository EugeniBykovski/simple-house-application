"use client";

import { FC } from "react";
import { DraggablePanel } from "@/components/dashboard/DraggablePanel/DraggablePanel";
import MeetingsPanel from "@/components/dashboard/MeetingsPanel/MeetingsPanel";
import { HelperDesk } from "@/components/helperdesk/HelperDesk";

export const CommonTools: FC = () => {
  return (
    <>
      <DraggablePanel />
      <MeetingsPanel />
      <HelperDesk />
    </>
  );
};
