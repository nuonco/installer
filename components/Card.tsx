import React, { type FC } from "react";

export const Card: FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col gap-2 rounded bg-card-background dark:bg-white items-start [border:_theme(borderWidth.card-border)_solid_theme(colors.card-border)] shadow-card-shadow shadow-card-color ${className}`}
    >
      {children}
    </div>
  );
};
