"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { themeColors, ThemeEnum } from "@/lib/theme";
import { Check, X } from "lucide-react";
import { useState } from "react";

interface ThemeCardProps {
  theme: ThemeEnum;
  activeTheme?: string;
  onTheme: (theme: string) => void;
  size?: "small" | "large";
}

export const ThemeCard = ({
  theme,
  activeTheme,
  onTheme,
  size = "large",
}: ThemeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = activeTheme === theme;

  const handleCardClick = () => {
    if (size === "large") {
      onTheme(theme);
    } else if (size === "small") {
      if (isActive) {
        onTheme("");
      } else if (!activeTheme) {
        onTheme(theme);
      }
    }
  };

  const getTextColorClass = (theme: ThemeEnum) =>
    theme === ThemeEnum.LIGHT ? "text-zinc-600" : "text-white";
  const sizeClasses =
    size === "large" ? "w-36 h-36 text-lg" : "w-14 h-14 text-xs";
  const blurClasses =
    size === "small" && activeTheme && !isActive
      ? "opacity-50 blur-sm pointer-events-none"
      : "opacity-100 pointer-events-auto";

  return (
    <Card
      tabIndex={1}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleCardClick();
        }
      }}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${
        isActive ? "border-primary/50" : ""
      } ${sizeClasses} ${blurClasses} rounded-full flex justify-center items-center hover:opacity-85 transition duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background`}
      style={theme ? { backgroundColor: themeColors[theme] } : undefined}
    >
      <CardHeader className="flex flex-col items-center justify-between">
        <div className="flex items-center relative">
          {size === "small" && (
            <div
              className={`absolute -inset-6 flex justify-center items-center transition-opacity duration-300 ${
                isActive || isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              {isActive ? (
                <X className={`h-4 w-4 ${getTextColorClass(theme)}`} />
              ) : (
                <Check className={`h-4 w-4 ${getTextColorClass(theme)}`} />
              )}
            </div>
          )}
          <CardTitle
            className={`transition-opacity duration-300 ${
              size === "large"
                ? "text-lg opacity-100"
                : isActive || isHovered
                ? "opacity-0 hidden"
                : "opacity-100 block"
            }`}
            style={
              theme === ThemeEnum.LIGHT
                ? { color: "#18181b" }
                : { color: "#ffffff" }
            }
          >
            {theme[0].toUpperCase() + theme.slice(1)}
          </CardTitle>
        </div>
        {size === "large" && (
          <Badge
            variant="default"
            className={`transition-opacity duration-500 ease-in-out ${
              isActive
                ? "opacity-100 scale-100 block"
                : "opacity-0 scale-90 hidden"
            }`}
          >
            Active
          </Badge>
        )}
      </CardHeader>
    </Card>
  );
};
