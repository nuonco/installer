import Link from "next/link";
import { createInstall } from "@/app/[installer-slug]/actions";
import { NUON_API_URL } from "@/common";
import {
  AWSInstallerFormFields,
  AppInputFields,
  AzureInstallerFormFields,
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
    throw new Error("Can't fetch installer");
  }

  return res.json();
}

export default async function Installer({ params }) {
  const slug = params?.["installer-slug"];
  const installer = await getInstallerBySlug(slug);
  const isDemoUrlValid = /^((http|https):\/\/)/.test(
    installer?.metadata?.demo_url,
  );

  return (
    <>
      <header className="flex flex-auto flex-col gap-12 md:gap-24">
        <Link
          className="text-fuchsia-600 hover:text-fuchsia-900 focus:text-fuchsia-900"
          href="/"
        >
          View all installation options
        </Link>
        <div className="flex flex-col gap-4">
          <h1>
            <Link href={installer?.metadata?.homepage_url}>
              <img
                src={installer?.metadata?.logo_url}
                alt={installer?.metadata?.name}
              />
            </Link>
          </h1>
          <p>{installer?.metadata?.description}</p>
        </div>

        <p className="text-4xl text-center leading-relaxed">
          Install a fully managed version of {installer?.metadata?.name} in your
          own{" "}
          {installer?.app?.cloud_platform === "azure" ? (
            <img
              className="inline-flex align-middle"
              src="/azure-logo.svg"
              width="40px"
            />
          ) : (
            <img
              className="inline-flex align-middle"
              src="/aws-logo.svg"
              width="80px"
            />
          )}{" "}
          account.
        </p>

        <div className="flex flex-wrap gap-6 w-fit m-auto justify-center items-center">
          <ScrollToButton elementId="steps">
            Install into my{" "}
            {installer?.app?.cloud_platform === "azure" ? "Azure" : "AWS"}
          </ScrollToButton>

          <Link
            className="border border-current text-sm px-4 py-1.5 rounded hover:text-fuchsia-600 focus:text-fuchsia-600"
            href={installer?.metadata?.documentation_url}
            target="_blank"
            rel="noreferrer"
          >
            View {installer?.metadata?.name} Documentation
          </Link>
        </div>

        {installer?.metadata?.formatted_demo_url ? (
          <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={installer?.metadata?.formatted_demo_url}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ) : installer?.metadata?.demo_url && isDemoUrlValid ? (
          <div className="relative pb-[56.25%] h-[0px] overflow-hidden max-w-full">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={installer?.metadata?.demo_url}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ) : null}
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
                name="name"
                type="text"
                required
              />
            </label>
            {installer?.app_sandbox?.cloud_platform === "aws" && (
              <AWSInstallerFormFields />
            )}

            {installer?.app_sandbox?.cloud_platform === "azure" && (
              <AzureInstallerFormFields />
            )}

            {installer?.app_inputs?.app_inputs && (
              <AppInputFields inputs={installer?.app_inputs?.app_inputs} />
            )}

            <button className="rounded text-sm text-gray-50 bg-fuchsia-600 hover:bg-fuchsia-900 focus:bg-fuchsia-900 active:bg-fuchsia-800 px-4 py-1.5 w-fit">
              Submit
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
