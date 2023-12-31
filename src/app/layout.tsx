import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastProvider } from "@/providers/ToastProvider";
import Provider from "@/providers/SessionProvider";
import ThemeProviders from "@/providers/ThemeProvider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TypoType",
  description:
    " This is an introduction to TypoType technology shop, we always bring and help customers with model technology items!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Provider>
          <ThemeProviders attribute="class" defaultTheme="dark" enableSystem>
            <ToastProvider />
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            {children}
          </ThemeProviders>
        </Provider>
      </body>
    </html>
  );
}
