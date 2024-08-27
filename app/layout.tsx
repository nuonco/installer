import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import theme from "@/theme";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${theme.forceDarkMode ? "dark" : ""} bg-white dark:bg-black text-black dark:text-white`}
      lang="en"
    >
      <body className={`${inter.className} w-full h-dvh`}>
        <div
          className="flex flex-col w-full max-w-5xl mx-auto p-6 py-12 gap-6 md:gap-12"
          id="content-wapper
        "
        >
          {children}
        </div>
      </body>
    </html>
  );
}
