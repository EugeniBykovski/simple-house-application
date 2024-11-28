"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/switchers/ThemeSwitcher/ThemeSwitcher";

const Home = () => {
  const logoutHandler = () => {
    signOut({
      callbackUrl: `${window.location.origin}/sign-in`,
    });
  };

  return (
    <>
      <Button onClick={logoutHandler}>Logout</Button>
      <ThemeSwitcher />
    </>
  );
};

export default Home;
