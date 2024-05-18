import type {Metadata} from "next";
import {Inter} from "next/font/google";
import React from "react";
import showdown from "showdown";
import {getInstaller} from "@/common";
import {Link, PoweredByNuon} from "@/components";
import "./globals.css";

const markdown = new showdown.Converter();
const inter = Inter({subsets: ["latin"]});

export async function generateMetadata(
): Promise<Metadata> {
  const {metadata} = await getInstaller();

  return {
    title: metadata.name,
    description: metadata.description,
    icons: {
      icon: metadata.favicon_url,
      shortcut: metadata.favicon_url,
    },
  }
}

const missingData = {
  orgName: 'Nuon',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {metadata} = await getInstaller();

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
              {metadata.copyright_markdown ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: markdown.makeHtml(
                      metadata.copyright_markdown,
                    ),
                  }}
                />
              ) : (
                <>
                  <span className="text-xs">
                    &copy; {new Date().getFullYear()}
                  </span>
                  <Link
                    href={metadata.homepage_url}
                    className="text-xs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {missingData.orgName}
                  </Link>
                </>
              )}
            </div>
            <div className="flex gap-6 items-center">
              {metadata.footer_markdown ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: markdown.makeHtml(
                      metadata.footer_markdown,
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
