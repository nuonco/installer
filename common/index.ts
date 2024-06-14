export const NUON_API_URL =
  process?.env?.NUON_API_URL || "https://ctl.prod.nuon.co";

export async function getInstaller(): Promise<Record<string, any>> {
  const res = await fetch(
    `${NUON_API_URL}/v1/installers/${process.env?.NUON_INSTALLER_ID}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process?.env?.NUON_API_TOKEN}`,
        "X-Nuon-Org-ID": process.env?.NUON_ORG_ID || "",
      },
    },
  );

  if (!res.ok) {
    console.debug(await res.json());
    throw new Error("Can't fetch installers");
  }

  return res.json();
}

export async function getAppBySlug(slug: string): Promise<Record<string, any>> {
  const res = await fetch(`${NUON_API_URL}/v1/apps/${slug}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process?.env?.NUON_API_TOKEN}`,
      "X-Nuon-Org-ID": process.env?.NUON_ORG_ID || "",
    },
  });

  if (!res.ok) {
    console.debug(await res.json());
    throw new Error("Can't fetch app");
  }

  return res.json();
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

export async function getCloudPlatformRegions(
  platform: string,
): Promise<Array<Record<string, any>>> {
  const res = await fetch(
    `${NUON_API_URL}/v1/general/cloud-platform/${platform}/regions`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process?.env?.NUON_API_TOKEN}`,
        "X-Nuon-Org-ID": process.env?.NUON_ORG_ID || "",
      },
    },
  );

  if (!res.ok) {
    console.debug(await res.json());
    throw new Error("Can't fetch regions");
  }

  return res.json();
}

export function getFlagEmoji(countryCode = "us") {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
