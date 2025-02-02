"use client";

import { FC } from "react";
import { DraggablePanel } from "@/components/dashboard/DraggablePanel/DraggablePanel";
import MeetingsPanel from "@/components/dashboard/MeetingsPanel/MeetingsPanel";
import { HelperDesk } from "@/components/helperdesk/HelperDesk";
import { AdvertsTextSlider } from "@/components/ui/adverts-text-slider";

export const CommonTools: FC = () => (
  <>
    <div className="flex flex-col justify-center relative">
      <AdvertsTextSlider className="absolute bottom-10 z-0" />
      <DraggablePanel />
    </div>
    <MeetingsPanel />
    <HelperDesk />
  </>
);
