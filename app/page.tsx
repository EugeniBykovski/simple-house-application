import { FC, memo } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";

const Home: FC = memo(() => {
  return (
    <>
      PortalLayout
      <LanguageSwitcher />
    </>
  );
});

Home.displayName = "Home";

export default Home;
