import { FC, memo } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher";

const Home: FC = memo(() => {
  return (
    <>
      Portal Layout
      <ThemeSwitcher />
      <LanguageSwitcher />
    </>
  );
});

Home.displayName = "Home";

export default Home;
