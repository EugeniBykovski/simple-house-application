export interface AdvertisementCardProps {
  id: number;
  title: string;
  description: string;
  best: boolean;
  phone: string;
  hourOpen: string;
  hourClose: string;
  setIsPaused: (isPaused: boolean) => void;
}
