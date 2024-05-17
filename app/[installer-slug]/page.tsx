import { createInstall } from "@/app/[installer-slug]/actions";
import { getAppBySlug, getInstaller } from "@/common";
import {
  AWSInstallerFormFields,
  AppInputFields,
  AzureInstallerFormFields,
  Link,
  ScrollToButton,
  StepOneAWS,
  StepOneAzure,
} from "@/components";

export default async function Installer({ params, searchParams }) {
  const slug = params?.["installer-slug"];
  const [app, installer] = await Promise.all([
    getAppBySlug(slug),
    getInstaller(),
  ]);

  return (
    <>
      <header className="flex flex-auto flex-col gap-12 md:gap-24">
        <div className="flex flex-col gap-4">
          <h1>
            <Link href={installer?.metadata?.homepage_url}>
              <img
                src={installer?.metadata?.logo_url}
                alt={installer?.metadata?.name}
              />
            </Link>
          </h1>
        </div>

        <p className="text-4xl text-center leading-relaxed">
          {app?.description}
        </p>

        <div className="flex flex-wrap gap-6 w-fit m-auto justify-center items-center">
          <Link className="w-fit" href="/">
            {"< Other installation options"}
          </Link>

          <ScrollToButton elementId="steps">Install {app?.name}</ScrollToButton>
        </div>
      </header>
      <main
        className="flex-auto grid grid-cols-1 md:grid-cols-2 gap-12 pt-12"
        id="steps"
      >
        <div>
          {app?.cloud_platform === "azure" ? (
            <StepOneAzure />
          ) : (
            <StepOneAWS app={app} />
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Step 2: configure your install
          </h2>
          <form
            className="flex flex-col gap-4"
            action={createInstall.bind(null, app)}
          >
            <label className="flex flex-col flex-auto gap-2">
              <span className="font-semibold">Company name</span>
              <input
                className="border bg-inherit rounded px-4 py-1.5 shadow-inner"
                defaultValue={
                  Object.hasOwn(searchParams, "name") ? searchParams?.name : ""
                }
                name="name"
                type="text"
                required
              />
            </label>
            {app?.cloud_platform === "aws" && (
              <AWSInstallerFormFields searchParams={searchParams} />
            )}

            {app?.cloud_platform === "azure" && (
              <AzureInstallerFormFields searchParams={searchParams} />
            )}

            {app?.input_config?.app_inputs && (
              <AppInputFields
                inputs={app?.input_config?.app_inputs}
                searchParams={searchParams}
              />
            )}

            <button className="rounded text-sm text-gray-50 bg-fuchsia-600 hover:bg-fuchsia-700 focus:bg-fuchsia-700 active:bg-fuchsia-800 px-4 py-1.5 w-fit">
              Submit
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
