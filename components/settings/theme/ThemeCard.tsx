"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { themeColors, ThemeEnum } from "@/lib/theme";

interface ThemeCardProps {
  theme: ThemeEnum;
  activeTheme?: string;
  onTheme: (theme: string) => void;
}

export const ThemeCard = ({ theme, activeTheme, onTheme }: ThemeCardProps) => {
  return (
    <Card
      tabIndex={1}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onTheme(theme);
        }
      }}
      onClick={() => onTheme(theme)}
      className={`${
        activeTheme === theme ? "border-primary/50" : ""
      } w-36 h-36 rounded-full flex justify-center items-center hover:opacity-85 transition duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background`}
      style={theme ? { backgroundColor: themeColors[theme] } : undefined}
    >
      <CardHeader className="flex flex-col items-center justify-between">
        <div className="flex items-center">
          <CardTitle
            className="text-lg"
            style={
              theme === ThemeEnum.LIGHT
                ? { color: "#18181b" }
                : { color: "#fffffF" }
            }
          >
            {theme[0].toUpperCase() + theme.slice(1)}
          </CardTitle>
        </div>
        <Badge
          variant="default"
          className={`transition-opacity duration-500 ease-in-out ${
            activeTheme === theme
              ? "opacity-100 scale-100 block"
              : "opacity-0 scale-90 hidden"
          }`}
        >
          Active
        </Badge>
      </CardHeader>
    </Card>
  );
};
