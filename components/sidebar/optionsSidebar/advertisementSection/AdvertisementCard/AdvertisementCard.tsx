import { FC } from "react";
import { AdvertisementCardProps } from "./types";
import { CheckCheck, Clock, PhoneCall } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

export const AdvertisementCard: FC<AdvertisementCardProps> = ({
  id,
  title,
  description,
  best,
  phone,
  hourOpen,
  hourClose,
  setIsPaused,
}) => {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          key={id}
          className="relative p-4 rounded-md flex flex-col shadow-md cursor-pointer hover:shadow-lg hover:opacity-85 transition-all duration-500 items-center justify-center bg-gray-50"
        >
          {best && (
            <div className="absolute text-orange-400 uppercase text-xs font-bold right-0 top-2 rotate-45">
              Best
            </div>
          )}
          <h3 className="text-md font-bold text-green-600">{title}</h3>
          <p className="text-xs text-zinc-600">{description}</p>
          <div className="flex justify-between items-center w-full pt-2">
            <p className="text-xs text-zinc-500 flex items-center">
              <PhoneCall className="w-3 h-3 text-orange-500 mr-1" />
              {phone}
            </p>
            <p className="text-xs text-zinc-500 flex items-center">
              <Clock className="w-3 h-3 text-orange-500 mr-1" />
              <div>
                {hourOpen} - {hourClose}
              </div>
            </p>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        className="ml-5 w-[25rem] text-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <h3 className="text-lg font-bold text-green-600 mb-2">{title}</h3>
        <Separator />
        <p className="text-md text-zinc-600 mb-3 mt-2">{description}</p>
        <Separator />
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center text-sm text-zinc-500">
            <PhoneCall className="w-4 h-4 text-orange-500 mr-2" />
            {phone}
          </div>
          <div className="flex items-center text-sm text-zinc-500">
            <Clock className="w-4 h-4 text-orange-500 mr-2" />
            <div>
              {hourOpen} - {hourClose}
            </div>
          </div>
        </div>
        {best && (
          <div className="text-orange-500 mt-4 uppercase text-xs font-bold text-center border-dashed p-2 rounded-md border-zinc-200 border flex items-center justify-center">
            <CheckCheck className="w-5 h-5 text-green-500 mr-2" />
            Best choice according to users
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
