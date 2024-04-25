"use server";

import { redirect } from "next/navigation";
import { NUON_API_URL } from "@/common";

export async function createInstall(slug: string, formData: FormData) {
  const { platform, ...data } = Object.fromEntries(formData);
  const inputs = Object.keys(data).reduce((acc: Record<string, unknown>, key) => {
    if (key.includes("input:")) {
      acc[key.replace("input:", "")] = data[key];
    }

    return acc;
  }, {});

  let input: Record<string, unknown> = {
    inputs,
    name: data?.name,
  };

  if (platform === "azure") {
    input = {
      azure_account: {
        location: data?.location,
        service_principal_app_id: data?.service_principal_app_id,
        service_principal_password: data?.service_principal_password,
        subscription_id: data?.subscription_id,
        subscription_tenant_id: data?.subscription_tenant_id,
      },
      ...input,
    };
  }

  if (platform === "aws") {
    input = {
      aws_account: {
        iam_role_arn: data?.iam_role_arn,
        region: data?.region,
      },
      ...input,
    };
  }

  const res = await fetch(`${NUON_API_URL}/v1/installer/${slug}/installs`, {
    body: JSON.stringify(input),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  const install = await res.json();

  redirect(`/${slug}/${install?.id}`);
}
