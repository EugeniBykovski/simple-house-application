import { GoogleLogo } from "../svg/Google";
import { ProviderSignInBtn } from "./ProviderSignInBtn";
import { useTranslations } from "next-intl";

export const ProviderSignInBtns = ({
  signInCard,
  disabled,
  onLoading,
}: {
  signInCard?: boolean;
  disabled?: boolean;
  onLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const t = useTranslations("auth");

  return (
    <div className="flex flex-col gap-2">
      <ProviderSignInBtn
        disabled={disabled}
        onLoading={onLoading}
        providerName="google"
        className="w-full rounded-[1.9rem] border text-sm h-12 sm:h-10 sm:text-base"
      >
        <GoogleLogo className="mr-2" width={20} height={20} />
        {signInCard
          ? t("SIGN_IN.PROVIDERS.GOOGLE")
          : t("SIGN_UP.PROVIDERS.GOOGLE")}
      </ProviderSignInBtn>
    </div>
  );
};
