import React, { type FC } from "react";
import { Stepper as MTStepper, Step as MTStep } from "@material-tailwind/react";

export const Stepper = ({ children, ...props }) => {
  return (
    <MTStepper
      lineClassName="bg-black dark:bg-white"
      activeLineClassName="!bg-primary-500"
      {...props}
    >
      {children}
    </MTStepper>
  );
};

export const Step = ({ children, ...props }) => {
  return (
    <MTStep
      className="bg-black text-white dark:bg-white dark:text-black"
      activeClassName="!bg-primary-500"
      completedClassName="!bg-primary-500"
      {...props}
    >
      {children}
    </MTStep>
  );
};
