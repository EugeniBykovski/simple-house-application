"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeCard } from "./ThemeCard";
import { LoadingState } from "@/components/ui/loadingState";
import { ThemeEnum } from "@/lib/theme";

interface ThemeProps {
  size?: "small" | "large";
}

export const Theme = ({ size = "large" }: ThemeProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div>
        <LoadingState className="w-12 h-12" />
      </div>
    );
  }

  return (
    <Card className="bg-background border-none shadow-none">
      {size === "large" && (
        <CardHeader>
          <CardTitle className="text-xl">Change your theme:</CardTitle>
          <CardDescription className="text-base">
            Select how you would like your interface to look. Select theme from
            dark, light or other themes.
          </CardDescription>
        </CardHeader>
      )}
      <CardContent
        className={`${
          size === "large"
            ? "lg:w-[50%] md:w-[80%] m-auto grid md:grid-cols-3 sm:grid-cols-1 grid-rows-3"
            : "grid grid-cols-2"
        } place-items-center gap-6`}
      >
        {Object.values(ThemeEnum).map((themeKey) => (
          <ThemeCard
            key={themeKey}
            onTheme={setTheme}
            theme={themeKey}
            activeTheme={theme}
            size={size}
          />
        ))}
      </CardContent>
    </Card>
  );
};
