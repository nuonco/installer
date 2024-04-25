import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nuon installers",
  description:
    "Let your customers install your app in their cloud account with only a few clicks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="bg-gray-50 text-gray-950 dark:bg-gray-950 dark:text-gray-50" lang="en">
      <body className={`${inter.className} w-full h-dvh`}>
        <div className="flex flex-col w-full max-w-5xl mx-auto p-6 py-12 md:py-24 gap-12 md:gap-24">
          {children}
        </div>
      </body>
    </html>
  );
}
