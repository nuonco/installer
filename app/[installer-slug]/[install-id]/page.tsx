import Link from "next/link";
import showdown from "showdown";
import { NUON_API_URL } from "@/common";
import { Install } from "@/components";

const markdown = new showdown.Converter();

async function getInstallerInstall(
  slug: string,
  id: string,
): Promise<Record<string, any>> {
  const res = await fetch(
    `${NUON_API_URL}/v1/installer/${slug}/install/${id}/render`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process?.env?.NUON_API_TOKEN}`,
        "X-Nuon-Org-ID": process.env?.NUON_ORG_ID || "",
      },
    },
  );

  if (!res.ok) {
    throw new Error("Can't fetch install");
  }

  return res.json();
}

export default async function InstallerInstall({ params }) {
  const slug = params?.["installer-slug"];
  const installId = params?.["install-id"];

  const { install, installer, installer_content } = await getInstallerInstall(
    slug,
    installId,
  );

  return (
    <>
      <header className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <div className="flex flex-col gap-2">
          <Install install={install} installerSlug={slug} />
        </div>

        <div className="flex flex-col gap-2">
          <h1>
            <Link href={installer?.metadata?.homepage_url}>
              <img
                src={installer?.metadata?.logo_url}
                alt={installer?.metadata?.name}
              />
            </Link>
          </h1>
          <p>{installer?.metadata?.description}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: markdown.makeHtml(installer_content),
            }}
          />
        </div>
      </header>
    </>
  );
}
