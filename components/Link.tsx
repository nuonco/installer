import React, { type FC } from "react";
import NextLink from "next/link";

export const Link: FC<React.ComponentProps<typeof NextLink>> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <NextLink
      className={`text-fuchsia-600 dark:text-fuchsia-500 hover:text-fuchsia-700 focus:text-fuchsia-700 ${className}`}
      {...props}
    >
      {children}
    </NextLink>
  );
};
