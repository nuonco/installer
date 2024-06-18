"use server";

import { NUON_API_URL } from "@/common";
import { installRequestBody } from "./util";

export async function createInstall(
  app: Record<string, any>,
  formData: FormData,
) {
  const input = installRequestBody(app, formData);

  const res = await fetch(`${NUON_API_URL}/v1/apps/${app?.id}/installs`, {
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process?.env?.NUON_API_TOKEN}`,
      "X-Nuon-Org-ID": process.env?.NUON_ORG_ID || "",
    },
    method: "POST",
  });

  return await res.json();
}

export async function getInstall(id: string): Promise<Record<string, any>> {
  const res = await fetch(`${NUON_API_URL}/v1/installs/${id}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process?.env?.NUON_API_TOKEN}`,
      "X-Nuon-Org-ID": process.env?.NUON_ORG_ID || "",
    },
  });

  if (!res.ok) {
    console.debug(await res.json());
    throw new Error("Can't fetch install");
  }

  return res.json();
}

export async function updateInstall(
  id: string,
  app: Record<string, any>,
  formData: FormData,
) {
  const input = installRequestBody(app, formData);

  const res = await fetch(`${NUON_API_URL}/v1/installs/${id}`, {
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process?.env?.NUON_API_TOKEN}`,
      "X-Nuon-Org-ID": process.env?.NUON_ORG_ID || "",
    },
    method: "PATCH",
  });

  return await res.json();
}

export async function reprovisionInstall(
  id: string,
): Promise<Record<string, any>> {
  const res = await fetch(`${NUON_API_URL}/v1/installs/${id}/reprovision`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process?.env?.NUON_API_TOKEN}`,
      "X-Nuon-Org-ID": process.env?.NUON_ORG_ID || "",
    },
    method: "POST",
  });

  if (!res.ok) {
    console.debug(await res.json());
    throw new Error("Can't fetch install");
  }

  return res.json();
}
