"use client";

import ActiveLink from "@/components/ui/active-link";
import { Workspace } from "@prisma/client";
import {
  LockKeyhole,
  PencilLine,
  ReceiptText,
  SunMoon,
  User2,
  Wallet,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { SettingsWorkspace } from "./SettingsWorkspace";
import { AnimatePresence, motion } from "framer-motion";

const settingsFields = [
  {
    href: "/dashboard/settings",
    icon: <User2 size={20} />,
    title: "SETTINGS.ACCOUNT",
  },
  {
    href: "/dashboard/settings/security",
    icon: <LockKeyhole size={20} />,
    title: "SETTINGS.SECURITY",
  },
  {
    href: "/dashboard/settings/theme",
    icon: <SunMoon size={20} />,
    title: "SETTINGS.THEME",
  },
  {
    href: "/dashboard/settings/billing",
    icon: <Wallet size={20} />,
    title: "SETTINGS.BILLING",
  },
  {
    href: "/dashboard/settings/adverts",
    icon: <PencilLine size={20} />,
    title: "SETTINGS.ADVERTS",
  },
  {
    href: "/dashboard/settings/paymentDetails",
    icon: <ReceiptText size={20} />,
    title: "SETTINGS.PAYMENT_DETAILS",
  },
];

interface Props {
  userAdminWorkspaces?: Workspace[];
}

export const Settings = ({ userAdminWorkspaces }: Props) => {
  const t = useTranslations("sidebar");

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <p className="text-xs sm:text-sm uppercase text-muted-foreground">
          {t("SETTINGS.GENERAL")}
        </p>
        <div className="flex flex-col gap-2 w-full mt-2">
          <AnimatePresence mode="wait">
            {settingsFields.map((settingField, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={linkVariants}
              >
                <ActiveLink
                  href={settingField.href}
                  variant={"ghost"}
                  size={"sm"}
                  className="flex justify-start w-full items-center gap-2"
                >
                  {settingField.icon}
                  {t(settingField.title)}
                </ActiveLink>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div>
        <p className="text-xs sm:text-sm uppercase text-muted-foreground">
          {t("SETTINGS.WORKSPACE")}
        </p>
        <div className="flex flex-col gap-2 w-full mt-2">
          <AnimatePresence mode="wait">
            {userAdminWorkspaces?.map((workspace, i) => (
              <motion.div
                key={workspace.id}
                custom={i}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={linkVariants}
              >
                <SettingsWorkspace
                  href="/dashboard/settings/workspace"
                  workspace={workspace}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
