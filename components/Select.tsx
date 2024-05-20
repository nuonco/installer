"use client";

import React, { type FC, useState } from "react";
import ReactSelect from "react-tailwindcss-select";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

export const Select: FC<{
  defaultValue?: string;
  name: string;
  options: Option[];
  required?: boolean;
}> = ({ defaultValue = "", name, options, required = false }) => {
  const [value, setValue] = useState<Option>(
    options.find((o) => o.value === defaultValue) || options[0],
  );

  return (
    <>
      <input
        type="hidden"
        name={name}
        value={value.value}
        required={required}
      />
      <ReactSelect
        value={value}
        onChange={(e) => {
          setValue(e);
        }}
        options={options as any}
        primaryColor={"primary"}
      />
    </>
  );
};
