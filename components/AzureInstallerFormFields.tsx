import React, { type FC } from "react";

export const AzureInstallerFormFields: FC = () => {
  return (
    <>
      <label className="flex flex-col flex-auto gap-2">
        <span className="text-sm font-semibold">Azure location</span>
        <input
          className="border bg-inherit rounded px-4 py-1.5 shadow-inner"
          name="location"
          type="text"
          required
        />
      </label>

      <label className="flex flex-col flex-auto gap-2">
        <span className="text-sm font-semibold">Azure service principal app ID</span>
        <input
          className="border bg-inherit rounded px-4 py-1.5 shadow-inner"
          name="service_principal_app_id"
          type="text"
          required
        />
      </label>

       <label className="flex flex-col flex-auto gap-2">
        <span className="text-sm font-semibold">Azure service principal password</span>
        <input
          className="border bg-inherit rounded px-4 py-1.5 shadow-inner"
          name="service_principal_password"
          type="password"
          required
        />
       </label>

        <label className="flex flex-col flex-auto gap-2">
        <span className="text-sm font-semibold">Azure subscription ID</span>
        <input
          className="border bg-inherit rounded px-4 py-1.5 shadow-inner"
          name="subscription_id"
          type="text"
          required
        />
        </label>

         <label className="flex flex-col flex-auto gap-2">
        <span className="text-sm font-semibold">Azure subscription tenant ID</span>
        <input
          className="border bg-inherit rounded px-4 py-1.5 shadow-inner"
          name="subscription_tenant_id"
          type="text"
          required
        />
      </label>
    </>
  );
};
