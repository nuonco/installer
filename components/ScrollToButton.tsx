"use client";

import React, { type FC } from "react";

interface IScrollToButton extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  elementId: string;
}

export const ScrollToButton: FC<IScrollToButton> = ({
  className = "",
  children,
  elementId,
  ...props
}) => {
  "use client";

  return (
    <button
      className={`rounded text-sm text-gray-50 bg-fuchsia-600 hover:bg-fuchsia-900 focus:bg-fuchsia-900 active:bg-fuchsia-800 px-4 py-1.5 ${className}`}
      onClick={() => {
        "use client";
        document?.getElementById(elementId)?.scrollIntoView({
          behavior: "smooth",
        });
      }}
      {...props}
    >
      {children}
    </button>
  );
};
