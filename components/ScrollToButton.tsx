"use client";

import React, { type FC } from "react";
import {Button} from "./Button";

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
    <Button
      onClick={() => {
        "use client";
        document?.getElementById(elementId)?.scrollIntoView({
          behavior: "smooth",
        });
      }}
    >
      {children}
    </Button>
  );
};
