import React, { type FC } from "react";

interface IButton extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: FC<IButton> = ({ className = "", children, ...props }) => {
  return (
    <button
      className={`rounded text-sm text-gray-50 bg-primary-600 hover:bg-primary-700 focus:bg-primary-700 active:bg-primary-800 px-4 py-1.5 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
