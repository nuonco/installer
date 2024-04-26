import React, { type FC } from "react";

export const AzureInstallerFormFields: FC<{
  searchParams?: Record<string, string>;
}> = ({ searchParams = {} }) => {
  return (
    <>
      <label className="flex flex-col flex-auto gap-2">
        <span className="text-sm font-semibold">Azure location</span>
        <input
          className="border bg-inherit rounded px-4 py-1.5 shadow-inner"
          defaultValue={
            Object.hasOwn(searchParams, "location")
              ? searchParams?.location
              : ""
          }
          name="location"
          type="text"
          required
        />
      </label>

      <label className="flex flex-col flex-auto gap-2">
        <span className="text-sm font-semibold">
          Azure service principal app ID
        </span>
        <input
          className="border bg-inherit rounded px-4 py-1.5 shadow-inner"
          defaultValue={
            Object.hasOwn(searchParams, "service_principal_app_id")
              ? searchParams?.service_principal_app_id
              : ""
          }
          name="service_principal_app_id"
          type="text"
          required
        />
      </label>

      <label className="flex flex-col flex-auto gap-2">
        <span className="text-sm font-semibold">
          Azure service principal password
        </span>
        <input
          className="border bg-inherit rounded px-4 py-1.5 shadow-inner"
          defaultValue={
            Object.hasOwn(searchParams, "service_principal_password")
              ? searchParams?.service_principal_password
              : ""
          }
          name="service_principal_password"
          type="password"
          required
        />
      </label>

      <label className="flex flex-col flex-auto gap-2">
        <span className="text-sm font-semibold">Azure subscription ID</span>
        <input
          className="border bg-inherit rounded px-4 py-1.5 shadow-inner"
          defaultValue={
            Object.hasOwn(searchParams, "subscription_id")
              ? searchParams?.subscription_id
              : ""
          }
          name="subscription_id"
          type="text"
          required
        />
      </label>

      <label className="flex flex-col flex-auto gap-2">
        <span className="text-sm font-semibold">
          Azure subscription tenant ID
        </span>
        <input
          className="border bg-inherit rounded px-4 py-1.5 shadow-inner"
          defaultValue={
            Object.hasOwn(searchParams, "subscription_tenant_id")
              ? searchParams?.subscription_tenant_id
              : ""
          }
          name="subscription_tenant_id"
          type="text"
          required
        />
      </label>
    </>
  );
};
