import React, { type FC } from "react";

export const Card: FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col gap-2 rounded bg-card-background dark:bg-white items-start border border-card-border shadow shadow-card-border ${className}`}
    >
      {children}
    </div>
  );
};
