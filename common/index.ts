export const NUON_API_URL =
  process?.env?.NUON_API_URL || "https://ctl.prod.nuon.co";

export async function getInstaller(
  installerId: string[] | string | null | undefined, // man, this is why we use any
): Promise<Record<string, any>> {
  let nuonInstallerId = process.env?.NUON_INSTALLER_ID;
  if (installerId !== null && installerId !== undefined) {
    nuonInstallerId = String(installerId); // cast here to silence the linter
    console.debug(`Using installerId from arg: ${nuonInstallerId}`);
  } else {
    console.debug(`Using installerId from env: ${nuonInstallerId}`);
  }
  let url = `${NUON_API_URL}/v1/installers/${nuonInstallerId}`;
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process?.env?.NUON_API_TOKEN}`,
      "X-Nuon-Org-ID": process.env?.NUON_ORG_ID || "",
    },
  });
  if (res.status > 300) {
    console.error(
      `[${res.status}] Encountered an error while fetching installer. url=${url}`,
    );
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

  return res.json();
}

export function getFlagEmoji(countryCode = "us") {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
