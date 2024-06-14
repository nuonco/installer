import { createInstall, getInstall } from "@/app/[installer-slug]/actions";
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
      <header className="grid grid-cols-3 gap-4">
        <div className="col-span-1 items-center pt-4">
          <Link className="w-fit" href="/">
            {"< Other installation options"}
          </Link>
        </div>

        <div className="col-span-1">
          <Link href={installer?.metadata?.homepage_url}>
            <img
              className="m-auto"
              src={installer?.metadata?.logo_url}
              alt={installer?.metadata?.name}
            />
          </Link>
        </div>

        <p className="col-span-3 text-4xl text-center leading-relaxed">
          {app?.description}
        </p>
      </header>

      <main className="flex-auto" id="steps">
        <InstallStepper
          app={app}
          searchParams={searchParams}
          createInstall={createInstall}
          getInstall={getInstall}
          regions={regions}
        />
      </main>
    </>
  );
}
