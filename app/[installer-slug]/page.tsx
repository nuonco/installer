import {createInstall} from "@/app/[installer-slug]/actions";
import {NUON_API_URL} from "@/common";
import {
  AWSInstallerFormFields,
  AppInputFields,
  AzureInstallerFormFields,
  Link,
  ScrollToButton,
  StepOneAWS,
  StepOneAzure,
} from "@/components";

async function getInstallerBySlug(slug: string): Promise<Record<string, any>> {
  const res = await fetch(`${NUON_API_URL}/v1/installer/${slug}/render`, {
    headers: {
      Authorization: `Bearer ${process?.env?.NUON_API_TOKEN}`,
      "X-Nuon-Org-ID": process.env?.NUON_ORG_ID || "",
    },
  });

  if (!res.ok) {
    console.debug(await res.json());
    throw new Error("Can't fetch installer");
  }

  return res.json();
}

export default async function Installer({params, searchParams}) {
  const slug = params?.["installer-slug"];
  const installer = await getInstallerBySlug(slug);

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
          {installer?.metadata?.description}
        </p>

        <div className="flex flex-wrap gap-6 w-fit m-auto justify-center items-center">
          <Link className="w-fit" href="/">
            {'< Other installation options'}
          </Link>

          <ScrollToButton elementId="steps">
            Install {installer?.metadata?.name}
          </ScrollToButton>
        </div>
      </header>
      <main
        className="flex-auto grid grid-cols-1 md:grid-cols-2 gap-12 pt-12"
        id="steps"
      >
        <div>
          {installer?.app?.cloud_platform === "azure" ? (
            <StepOneAzure />
          ) : (
            <StepOneAWS installer={installer} />
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Step 2: configure your install</h2>
          <form
            className="flex flex-col gap-4"
            action={createInstall.bind(null, slug)}
          >
            <input
              name="platform"
              value={installer?.app_sandbox?.cloud_platform}
              type="hidden"
            />
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
            {installer?.app_sandbox?.cloud_platform === "aws" && (
              <AWSInstallerFormFields searchParams={searchParams} />
            )}

            {installer?.app_sandbox?.cloud_platform === "azure" && (
              <AzureInstallerFormFields searchParams={searchParams} />
            )}

            {installer?.app_inputs?.app_inputs && (
              <AppInputFields
                inputs={installer?.app_inputs?.app_inputs}
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
