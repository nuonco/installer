import React, { type FC } from "react";

export const AppInputFields: FC<{
  inputs: Array<Record<string, any>>;
  searchParams?: Record<string, string>;
}> = ({ inputs, searchParams = {} }) => {
  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="text-lg font-semibold mb-2">App inputs</legend>

      {inputs?.map((input) => (
        <label className="flex flex-col flex-auto gap-2" key={input?.id}>
          <span className="text-sm font-semibold">
            {input?.display_name || input?.name}
          </span>
          <input
            className="border bg-inherit rounded px-4 py-1.5 shadow-inner"
            defaultValue={
              Object.hasOwn(searchParams, `input:${input.name}`)
                ? searchParams?.[`input:${input.name}`]
                : input?.default
            }
            name={`input:${input.name}`}
            required={input.required}
            type={input?.sensitive ? "password" : "text"}
          />
          {input?.description && (
            <span className="text-xs">{input?.description}</span>
          )}
        </label>
      ))}
    </fieldset>
  );
};
