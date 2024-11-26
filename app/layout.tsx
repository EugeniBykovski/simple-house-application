import type { Metadata } from "next";
import Head from "next/head";
import { DM_Sans } from "next/font/google";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import { DynamicIntlProvider } from "@/providers/DynamicIntlProvider/DynamicIntlProvider";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageProvider";
import Header from "@/components/Header/Header";
import { ThemeProvider } from "@/providers/ThemeProvider/ThemeProvider";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Innovative Solutions for Your Business",
  description: "Innovative Solutions for Your Business",
  icons: {
    icon: "/assets/icons/logos/logo.svg",
    shortcut: "/assets/icons/logos/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="relative" suppressHydrationWarning>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <body className={clsx(dmSans.className, "antialiased")}>
        <Suspense fallback={<div>Loading...</div>}>
          <LanguageProvider>
            <DynamicIntlProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <ToastContainer position="bottom-right" />
                <Header />
                <main className="w-[100%] mx-auto gap-x-2 min-h-[calc(100vh-3.5rem-1px)] my-4 container text-center">
                  {children}
                </main>
              </ThemeProvider>
            </DynamicIntlProvider>
          </LanguageProvider>
        </Suspense>
      </body>
    </html>
  );
}
