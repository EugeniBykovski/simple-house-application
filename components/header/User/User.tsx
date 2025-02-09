"use client";

import {
  Check,
  CheckCheck,
  Copy,
  Globe,
  LogOut,
  Moon,
  Settings2,
  Sun,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { UserAvatar } from "../../ui/user-avatar";
import { useTheme } from "next-themes";
import { useChangeLocale } from "@/hooks/useChangeLocale";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { UserData, UserProps } from "./types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCopyToClipboard } from "@/hooks/use-copy-clipboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApartment } from "@/context/ApartmentContext";

export const User = ({
  profileImage,
  username,
  email,
  isOnline: initialIsOnline,
}: UserProps) => {
  const t = useTranslations("common");

  const { apartments, selectedApartment, switchApartment } = useApartment();

  const [isOnline, setIsOnline] = useState(initialIsOnline);

  const lang = useLocale();
  const { theme, setTheme } = useTheme();
  const { onSelectChange } = useChangeLocale();

  const { copyToClipboard, copiedField } = useCopyToClipboard();
  const handleCopy = (text: string, field: "username" | "email") => {
    copyToClipboard(text, field);
  };

  const logOutHandler = async () => {
    try {
      await fetch("/api/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isOnline: false }),
      });

      signOut();
    } catch (error) {
      console.error("Failed to update online status during logout:", error);
    }
  };

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const res = await fetch("/api/get-online-users");
        if (!res.ok) {
          throw new Error("Failed to fetch online users");
        }

        const data = await res.json();
        const currentUser = data.onlineUsers.find(
          (user: UserData) => user.username === username
        );

        if (currentUser) {
          setIsOnline(currentUser.isOnline);
        }
      } catch (error) {
        console.error("Error fetching user status:", error);
      }
    };

    fetchUserStatus();

    const interval = setInterval(fetchUserStatus, 60000);
    return () => clearInterval(interval);
  }, [username]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="z-10 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background ml-2">
        {profileImage ? (
          <div className="relative">
            <Image
              src={profileImage}
              alt="profile image"
              className="w-10 h-10 rounded-full object-cover"
              width={300}
              height={300}
            />
            <span
              className={`w-2 h-2 rounded-full absolute -top-1 right-0 ${
                isOnline ? "bg-green-400" : "bg-red-400"
              }`}
            ></span>
          </div>
        ) : (
          <div className="relative">
            <UserAvatar className="w-8 h-8" />
            <span
              className={`w-2 h-2 rounded-full absolute -top-1 right-0 ${
                isOnline ? "bg-green-400" : "bg-red-400"
              }`}
            ></span>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10} className="">
        <div className="px-2">
          {isOnline ? (
            <span className="text-xs text-green-400">Online</span>
          ) : (
            <span className="text-sx text-zinc-300">Offline</span>
          )}
        </div>

        <div className="flex items-center gap-1 px-2">
          {profileImage ? (
            <Image
              src={profileImage}
              alt="profile image"
              className="w-10 h-10 rounded-full object-cover"
              width={300}
              height={300}
            />
          ) : (
            <UserAvatar className="w-8 h-8" />
          )}

          <div className="py-1">
            <div className="flex items-center gap-1">
              <DropdownMenuLabel className="py-0">{username}</DropdownMenuLabel>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      size={"sm"}
                      variant={"link"}
                      className="hover:text-green-400 p-0"
                      onClick={() => handleCopy(username, "username")}
                    >
                      {copiedField === "username" ? (
                        <CheckCheck size={16} className="text-green-400" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-1">
              <DropdownMenuLabel className="py-0">{email}</DropdownMenuLabel>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      size={"sm"}
                      variant={"link"}
                      className="hover:text-green-400 p-0"
                      onClick={() => handleCopy(email, "email")}
                    >
                      {copiedField === "email" ? (
                        <CheckCheck size={16} className="text-green-400" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <Select
          value={selectedApartment?.id || ""}
          onValueChange={switchApartment}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose apartments" />
          </SelectTrigger>
          <SelectContent>
            {apartments.map((apartment) => (
              <SelectItem key={apartment.id} value={apartment.id}>
                {apartment?.entrance?.house?.street || "Unknown Street"},{" "}
                {apartment?.entrance?.house?.houseNumber || "Unknown Number"},{" "}
                {apartment?.apartmentNumber || "Unknown Apartment"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer gap-2">
              <Moon size={16} className="hidden dark:inline-block" />
              <Sun size={16} className="dark:hidden" />
              <span>{t("THEME_HOVER")}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent sideOffset={10}>
                <DropdownMenuItem
                  onClick={() => {
                    setTheme("dark");
                  }}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <span>{t("DARK")}</span>
                  {theme === "dark" && <Check size={14} />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setTheme("light");
                  }}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <span>{t("LIGHT")}</span>
                  {theme === "light" && <Check size={14} />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setTheme("system");
                  }}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <span>{t("SYSTEM")}</span>
                  {theme === "system" && <Check size={14} />}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer gap-2">
              <Globe size={16} />
              <span>{t("LANG_HOVER")}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent sideOffset={10}>
                <DropdownMenuItem
                  onClick={() => {
                    onSelectChange("en");
                  }}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <span>English</span>
                  {lang === "en" && <Check size={14} />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onSelectChange("ru");
                  }}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <span>Russian</span>
                  {lang === "ru" && <Check size={14} />}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem className="cursor-pointer gap-2" asChild>
            <Link href={"/dashboard/settings"}>
              <Settings2 size={16} /> {t("SETTINGS")}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logOutHandler}
          className="cursor-pointer gap-2"
        >
          <LogOut size={16} />
          {t("LOG_OUT")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
