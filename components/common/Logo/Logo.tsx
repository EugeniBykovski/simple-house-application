"use client";

import { FC } from "react";
import { LogoIcon } from "@/public/assets";
import Link from "next/link";
import clsx from "clsx";
import { LogoProps } from "./types";

export const Logo: FC<LogoProps> = ({ className }) => (
  <Link href={"/dashboard"}>
    <LogoIcon
      className={clsx("w-6 h-6 hover:opacity-85 transition-all", className)}
    />
  </Link>
);
