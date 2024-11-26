"use client";

import { signOut, useSession } from "next-auth/react";
import HomePage from "../page";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/switchers/ThemeSwitcher/ThemeSwitcher";

const Home = () => {
  const session = useSession();

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
