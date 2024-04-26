import React, { type FC } from "react";

export const AWSInstallerFormFields: FC<{
  searchParams?: Record<string, string>;
}> = ({ searchParams = {} }) => {
  return (
    <>
      <label className="flex flex-col flex-auto gap-2">
        <span className="text-sm font-semibold">AWS IAM role ARN</span>
        <input
          className="border bg-inherit rounded px-4 py-1.5 shadow-inner"
          defaultValue={
            Object.hasOwn(searchParams, "iam_role_arn")
              ? searchParams?.iam_role_arn
              : ""
          }
          name="iam_role_arn"
          type="text"
          required
        />
      </label>

      <label className="flex flex-col flex-auto gap-2">
        <span className="text-sm font-semibold">AWS Region</span>
        <input
          className="border bg-inherit rounded px-4 py-1.5 shadow-inner"
          defaultValue={
            Object.hasOwn(searchParams, "region") ? searchParams?.region : ""
          }
          name="region"
          type="text"
          required
        />
      </label>
    </>
  );
};
