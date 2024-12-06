import { Session } from "next-auth";

export interface AccountInfoProps {
  session: Session;
}

export const languages = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Russian",
    value: "ru",
  },
] as const;
