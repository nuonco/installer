import React, { type FC } from "react";

export const AWSInstallerFormFields: FC = () => {
  return (
    <>
      <label className="flex flex-col flex-auto gap-2">
        <span className="text-sm font-semibold">AWS IAM role ARN</span>
        <input
          className="border bg-inherit rounded px-4 py-1.5 shadow-inner"
          name="iam_role_arn"
          type="text"
          required
        />
      </label>

      <label className="flex flex-col flex-auto gap-2">
        <span className="text-sm font-semibold">AWS Region</span>
        <input
          className="border bg-inherit rounded px-4 py-1.5 shadow-inner"
          name="region"
          type="text"
          required
        />
      </label>
    </>
  );
};
