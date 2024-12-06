"use client";

import { FC } from "react";
import { useToggleSidebar } from "@/context/ToggleSidebar";
import { Button } from "@/components/ui/button";
import { PanelLeftOpen } from "lucide-react";

export const OpenSidebar: FC = () => {
  const { setIsOpen } = useToggleSidebar();

  return (
    <Button
      onClick={() => {
        setIsOpen(true);
      }}
      className="text-muted-foreground lg:hidden"
      variant={"ghost"}
      size={"icon"}
    >
      <PanelLeftOpen />
    </Button>
  );
};
