import {
  createInstall,
  getInstall,
  redeployInstall,
} from "@/app/[installer-slug]/actions";
import { getAppBySlug, getInstaller } from "@/common";
import { Link } from "@/components";
import InstallStepper from "@/components/InstallStepper";
import { getCloudPlatformRegions } from "@/common";

export default async function Installer({ params, searchParams }) {
  const slug = params?.["installer-slug"];
  const [app, installer] = await Promise.all([
    getAppBySlug(slug),
    getInstaller(),
  ]);
  const regions = await getCloudPlatformRegions(app.cloud_platform);

  return (
    <>
      <header className="flex flex-col gap-4">
        <div className="flex justify-between items-center pt-4">
          <Link className="w-fit" href="/">
            {"< Other installation options"}
          </Link>
          <Link href={installer?.metadata?.homepage_url}>
            <img
              className="inline-block"
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
    </>
  );
}
