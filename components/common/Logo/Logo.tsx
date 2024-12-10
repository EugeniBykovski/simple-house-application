"use client";

import { FC } from "react";
import { LogoIcon } from "@/public/assets";
import Link from "next/link";

export const Logo: FC = () => (
  <Link href={"/dashboard"}>
    <LogoIcon className="w-6 h-6 hover:opacity-85 transition-all" />
  </Link>
);
