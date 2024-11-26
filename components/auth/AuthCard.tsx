import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { SignUpCardContent } from "./SignUpCardContent";
import { SignInCardContent } from "./SignInCardContent";

interface Props {
  signInCard?: boolean;
}

export const AuthCard = ({ signInCard }: Props) => {
  const t = useTranslations("auth");

  return (
    <>
      <Card className="w-full sm:min-w-[28rem] sm:w-auto">
        <CardHeader>
          <Image
            alt=""
            className="rounded-full object-cover self-center"
            width={50}
            height={50}
            src={
              "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg"
            }
          />
          <CardTitle className="pt-2">
            {signInCard ? t("SIGN_IN.TITLE") : t("SIGN_UP.TITLE")}
          </CardTitle>
          <CardDescription>
            {signInCard ? t("SIGN_IN.DESC") : t("SIGN_UP.DESC")}
          </CardDescription>
        </CardHeader>
        {signInCard ? <SignInCardContent /> : <SignUpCardContent />}
      </Card>
      <p className="text-sm">
        {signInCard
          ? t("SIGN_IN.DONT_HAVE_ACCOUNT.FIRST")
          : t("SIGN_UP.HAVE_ACCOUNT.FIRST")}{" "}
        <Link
          className="text-primary"
          href={signInCard ? "/sign-up" : "/sign-in"}
        >
          {signInCard
            ? t("SIGN_IN.DONT_HAVE_ACCOUNT.SECOND")
            : t("SIGN_UP.HAVE_ACCOUNT.SECOND")}{" "}
        </Link>
      </p>
    </>
  );
};
