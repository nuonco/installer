import React from "react";

export default function Card({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-2 rounded bg-white dark:bg-white p-6 items-start rounded-[1rem] border-black border-2 border-b-8">
      {children}
    </div>
  );
};
