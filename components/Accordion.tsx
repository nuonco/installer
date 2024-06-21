import React, { type FC } from "react";

interface IAccordion extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Accordion: FC<IAccordion> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`w-full overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
};

interface ITab extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  children: React.ReactNode;
}

export const Tab: FC<ITab> = ({
  label = "",
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`${className}`} {...props}>
      <input
        id={label}
        type="checkbox"
        className="peer absolute opacity-0 -z-1"
      ></input>
      <label
        htmlFor={label}
        className="flex cursor-pointer justify-between p-4 font-medium bg-accordion-header-background text-accordion-header-color after:content-['\276F'] after:w-4 after:h-4 after:text-center after:rotate-90 after:transition-all peer-checked:after:rotate-270"
      >
        {label}
      </label>
      <div className="max-h-0 overflow-hidden transition-all peer-checked:max-h-max">
        {children}
      </div>
    </div>
  );
};
