import type { Metadata } from "next";
import Head from "next/head";
import { DM_Sans } from "next/font/google";
import clsx from "clsx";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider/ThemeProvider";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { AuthProvider } from "@/providers/AuthProvider/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { QueryProvider } from "@/providers/QueryProvider/QueryProvider";

const dmSans = DM_Sans({ subsets: ["latin"] });
const locales = ["en", "ru"];

export const metadata: Metadata = {
  title: "Simple House",
  description: "Innovative Solutions for Your Home",
  icons: {
    icon: "/public/img/Simple.png",
    shortcut: "/public/img/Simple.png",
  },
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { params } = props;
  const { locale } = params;

  if (!locales.includes(locale)) notFound();

  // @ts-ignore
  const messages = await getMessages(locale).catch(() => getMessages("en"));
  const defaultTheme = "light";

  return (
    <html lang={locale}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <body className={clsx(dmSans.className, "antialiased")}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <QueryProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme={defaultTheme}
                enableSystem
                disableTransitionOnChange
              >
                <Toaster />
                <main className="w-full min-h-[calc(100vh-3.5rem-1px)] text-center">
                  {props.children}
                </main>
              </ThemeProvider>
            </QueryProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
