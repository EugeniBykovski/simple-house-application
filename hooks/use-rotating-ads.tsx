import { useState, useEffect } from "react";

export const useRotatingAds = (
  ads: Array<any>,
  visibleCount: number,
  intervalMs: number
) => {
  const bestAds = ads.filter((ad) => ad.best);

  const [currentAds, setCurrentAds] = useState(bestAds.slice(0, visibleCount));
  const [_, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (bestAds.length <= visibleCount) {
      setCurrentAds(bestAds);
      return;
    }

    if (isPaused) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % bestAds.length;
        const nextAds = [];

        for (let i = 0; i < visibleCount; i++) {
          nextAds.push(bestAds[(nextIndex + i) % bestAds.length]);
        }

        setCurrentAds(nextAds);
        return nextIndex;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [ads, visibleCount, intervalMs, bestAds, isPaused]);

  return {
    currentAds,
    setIsPaused,
  };
};
