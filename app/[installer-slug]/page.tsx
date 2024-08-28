import type { Metadata } from "next";

import {
  createInstall,
  getInstall,
  redeployInstall,
} from "@/app/[installer-slug]/actions";
import { getAppBySlug, getInstaller } from "@/common";
import { Link } from "@/components";
import { Footer } from "@/components/Footer";
import InstallStepper from "@/components/InstallStepper";
import { getCloudPlatformRegions } from "@/common";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { metadata } = await getInstaller(
    searchParams ? searchParams.installerId : null,
  );
  console.debug("[installer] Generating Metdata");

  // TODO(fd): we need to address this.
  if (!!!metadata) {
    console.debug("[installer] No Metdata Found");
    return {};
  }

  return {
    title: `Installer | ${metadata.name}`,
    description: metadata.description,
    icons: {
      icon: metadata.favicon_url,
      shortcut: metadata.favicon_url,
    },
    openGraph: {
      title: metadata.name,
      description: metadata.description,
      type: "website",
      images: [
        {
          url: metadata.og_image_url,
        },
      ],
    },
    twitter: {
      title: metadata.name,
      description: metadata.description,
      images: [
        {
          url: metadata.logo_url,
        },
      ],
    },
  };
}

export default async function Installer({ params, searchParams }) {
  const slug = params?.["installer-slug"];
  const [app, installer] = await Promise.all([
    getAppBySlug(slug),
    getInstaller(searchParams ? searchParams.installerId : null),
  ]);
  const regions = await getCloudPlatformRegions(app.cloud_platform);

  return (
    <>
      <header className="flex flex-col gap-4">
        <div className="flex justify-between items-center pt-4 pb-4">
          <Link className="w-fit" href="/">
            {"< Other installation options"}
          </Link>
          <Link href={installer?.metadata?.homepage_url}>
            <img
              className="inline-block min-h-16 max-w-2xl"
              src={installer?.metadata?.logo_url}
              alt={installer?.metadata?.name}
            />
          </Link>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">
            {app.display_name || app.name}
          </h1>
          <p>{app?.description}</p>
        </div>
      </header>
      <main className="flex-auto" id="steps">
        <InstallStepper
          app={app}
          installer={installer}
          existingInstall={null}
          searchParams={searchParams}
          createInstall={createInstall}
          getInstall={getInstall}
          redeployInstall={redeployInstall}
          regions={regions}
        />
      </main>
      <Footer {...installer.metadata} />
    </>
  );
}
