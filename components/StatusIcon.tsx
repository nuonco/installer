import React from "react";

export const StatusIcon: FC<{ status: string; status_description: string }> = ({
  status,
  className,
}) => {
  let clr = "yellow-500";
  if (status === "active") {
    clr = "green-600";
  } else if (status === "error") {
    clr = "red-500";
  }

  return <span className={`text-${clr} ${className}`}>⏺</span>;
};
