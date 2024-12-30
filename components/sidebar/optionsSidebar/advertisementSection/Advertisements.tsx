import { FC } from "react";
import { useTranslations } from "next-intl";
import { Film, SquareArrowOutUpRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { BestAdvertisements } from "./BestAdvertisements";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Advertisements: FC = () => {
  const t = useTranslations("advertisement");

  return (
    <div className="border-t border-dashed border-zinc-300">
      <Accordion type="single" collapsible asChild>
        <AccordionItem value="bestAdvertisements">
          <p className="text-xs sm:text-sm uppercase text-muted-foreground flex justify-center items-center mt-4">
            {t("title")}
            <Dialog>
              <DialogTrigger>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <SquareArrowOutUpRight className="w-4 h-4 ml-2 cursor-pointer hover:text-green-400 transition" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>See more advertisements</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DialogTrigger>
              <DialogContent className="flex flex-col items-center w-[70vw] max-w-[70vw] h-[80vh]">
                <DialogHeader className="flex flex-col items-center">
                  <DialogTitle className="text-3xl text-zinc-700 font-bold flex items-center gap-2">
                    Advertisements
                    <Film className="w-6 h-6" />
                  </DialogTitle>
                  <DialogDescription>
                    Advertisements Block Select:
                  </DialogDescription>
                </DialogHeader>
                <Separator />
              </DialogContent>
            </Dialog>
          </p>
          <AccordionTrigger className="text-xs text-zinc-400 px-0 pb-2 pt-0">
            View all:
          </AccordionTrigger>
          <AccordionContent>
            <BestAdvertisements />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
