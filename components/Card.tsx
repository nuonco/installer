import React, { type FC } from "react";

export const Card: FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col gap-2 bg-card-background dark:bg-white items-start border-card-border-color border-card-border-width rounded-card-radius shadow-card-shadow shadow-card-color ${className}`}
    >
      {children}
    </div>
  );
};
