import { FC } from "react";
import { advertisements } from "@/data/mock-data";
import { useRotatingAds } from "@/hooks/use-rotating-ads";
import { AdvertisementCard } from "./AdvertisementCard/AdvertisementCard";

export const BestAdvertisements: FC = () => {
  const { currentAds, setIsPaused } = useRotatingAds(advertisements, 3, 7000);

  return (
    <div className="space-y-4">
      {currentAds.map(
        ({ id, title, best, description, phone, hourOpen, hourClose }) => (
          <AdvertisementCard
            key={id}
            id={id}
            title={title}
            description={description}
            best={best}
            phone={phone}
            hourOpen={hourOpen}
            hourClose={hourClose}
            setIsPaused={setIsPaused}
          />
        )
      )}
    </div>
  );
};
