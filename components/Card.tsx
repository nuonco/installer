import React from "react";

export default function Card({
  children,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  className: string;
}>) {
  return (
    <div
      className={`flex flex-col gap-2 rounded bg-card-background dark:bg-white items-start rounded border-card-border border-2 ${className}`}
    >
      {children}
    </div>
  );
}
