"use client";

import { FC, memo } from "react";
import { useTranslations } from "next-intl";

const Header: FC = memo(() => {
  const t = useTranslations("home");

  return <>{t("home")}</>;
});

export default Header;
