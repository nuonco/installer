import React, { type FC } from "react";
import { Select } from "@/components";
import { getCloudPlatformRegions, getFlagEmoji } from "@/common";

export const AWSRegionSelect: FC<{ defaultValue?: string }> = async ({
  defaultValue = "",
}) => {
  const regions = await getCloudPlatformRegions("aws");
  const options = regions.map((o) => ({
    value: o.value,
    label: `${getFlagEmoji(o.icon.substring(5))} ${o.display_name}`,
  }));

  return (
    <Select
      defaultValue={defaultValue}
      name="region"
      options={options}
      required
    />
  );
};

export const AWSInstallerFormFields: FC<{
  searchParams?: Record<string, string>;
}> = ({ searchParams = {} }) => {
  return (
    <fieldset>
      <legend>AWS Account</legend>
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
        <AWSRegionSelect
          defaultValue={
            Object.hasOwn(searchParams, "region") ? searchParams?.region : ""
          }
        />
      </label>
    </fieldset>
  );
};
