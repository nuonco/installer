import { NUON_API_URL } from "@/common";
import { Link } from "@/components";

async function getInstallers(): Promise<Array<Record<string, any>>> {
  const res = await fetch(`${NUON_API_URL}/v1/installers`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process?.env?.NUON_API_TOKEN}`,
      "X-Nuon-Org-ID": process.env?.NUON_ORG_ID || "",
    },
  });

  if (!res.ok) {
    console.debug(await res.json());
    throw new Error("Can't fetch installers");
  }

  return res.json();
}

export default async function Home() {
  const installers = await getInstallers();

  return (
    <>
      <header>
        <h1>
          <Link href="/">
            <span className="sr-only">Nuon</span>
            <img
              className="w-auto h-7 relative block dark:hidden"
              src="https://mintlify.s3-us-west-1.amazonaws.com/nuoninc/logo/light.svg"
              alt="light logo"
            />
            <img
              className="w-auto h-7 relative hidden dark:block"
              src="https://mintlify.s3-us-west-1.amazonaws.com/nuoninc/logo/dark.svg"
              alt="dark logo"
            />
          </Link>
        </h1>
      </header>
      <main className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {installers.length &&
            installers.map((installer) => (
              <div
                className="p-6 bg-gray-100 dark:bg-gray-900 flex flex-col gap-4 rounded justify-between items-start"
                key={installer?.id}
              >
                <span>
                  <h2 className="text-lg font-semibold mb-2">
                    {installer?.app_installer_metadata?.name}
                  </h2>
                  <p className="text-xs leading-relaxed">
                    {installer?.app_installer_metadata?.description}
                  </p>
                </span>

                <Link className="text-sm" href={`/${installer?.slug}`}>
                  Install now
                </Link>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
