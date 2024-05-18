import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import showdown from "showdown";
import { getInstaller } from "@/common";
import { Link, PoweredByNuon } from "@/components";
import "./globals.css";

const markdown = new showdown.Converter();
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nuon installers",
  description:
    "Let your customers install your app in their cloud account with only a few clicks",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const installer = await getInstaller();

  return (
    <html
      className="bg-white text-black dark:bg-black dark:text-white"
      lang="en"
    >
      <body className={`${inter.className} w-full h-dvh`}>
        <div className="flex flex-col w-full max-w-5xl mx-auto p-6 py-12 md:py-24 gap-12 md:gap-24">
          {children}
          <footer className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              {installer?.metadata?.copyright_markdown ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: markdown.makeHtml(
                      installer?.metadata?.copyright_markdown,
                    ),
                  }}
                />
              ) : (
                <>
                  <span className="text-xs">
                    &copy; {new Date().getFullYear()}
                  </span>
                  <Link
                    href="https://nuon.co"
                    className="text-xs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Nuon
                  </Link>
                </>
              )}
            </div>
            <div className="flex gap-6 items-center">
              {installer?.metadata?.footer_markdown ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: markdown.makeHtml(
                      installer?.metadata?.footer_markdown,
                    ),
                  }}
                />
              ) : (
                <PoweredByNuon />
              )}
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
