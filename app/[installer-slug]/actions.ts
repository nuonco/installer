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

  // work-around for API bug
  let json = await res.json();
  if (Array.isArray(json)) {
    json = json[0];
  }

  return json;
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

  return res.json();
}

export async function deployComponents(
  id: string,
): Promise<Record<string, any>> {
  const res = await fetch(
    `${NUON_API_URL}/v1/installs/${id}/components/deploy-all`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process?.env?.NUON_API_TOKEN}`,
        "X-Nuon-Org-ID": process.env?.NUON_ORG_ID || "",
      },
      method: "POST",
    },
  );

  return res.json();
}

export async function updateInputs(
  id: string,
  app: Record<string, any>,
  formData: FormData,
): Promise<Record<string, any>> {
  const input = installRequestBody(app, formData);

  const res = await fetch(`${NUON_API_URL}/v1/installs/${id}/inputs`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process?.env?.NUON_API_TOKEN}`,
      "X-Nuon-Org-ID": process.env?.NUON_ORG_ID || "",
    },
    method: "POST",
    body: JSON.stringify({ inputs: input.inputs }),
  });

  return res.json();
}

export async function redeployInstall(
  id: string,
  app: Record<string, any>,
  formData: FormData,
) {
  const reqBody = installRequestBody(app, formData);

  const updateRes = await updateInstall(id, app, formData);
  if (updateRes.error) {
    return updateRes;
  }

  if (Object.keys(reqBody.inputs).length > 0) {
    const inputsRes = await updateInputs(id, app, formData);
    if (inputsRes.error) {
      return inputsRes;
    }
  }

  const reproRes = await reprovisionInstall(id);
  if (reproRes.error) {
    return reproRes;
  }

  return await deployComponents(id);
}
