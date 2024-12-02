import { useToggleSidebar } from "@/context/ToggleSidebar";
import { PanelLeftClose } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CloseSidebar = () => {
  const { isOpen, setIsOpen } = useToggleSidebar();

  return (
    <Button
      onClick={() => {
        setIsOpen(false);
      }}
      className={`absolute right-[-2.5rem] top-10 z-10 rounded-tl-none lg:hidden ${
        !isOpen ? "hidden" : ""
      }`}
      size={"icon"}
      variant={"secondary"}
    >
      <PanelLeftClose />
    </Button>
  );
};
