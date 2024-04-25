import Link from "next/link";
import { NUON_API_URL } from "@/common";

async function getInstallers(): Promise<Array<Record<string, any>>> {
  const res = await fetch(`${NUON_API_URL}/v1/installers`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process?.env?.NUON_API_TOKEN}`,
      "X-Nuon-Org-ID": process.env?.NUON_ORG_ID || "",
    },
  });

  if (!res.ok) {
    throw new Error("Can't fetch installers");
  }

  return res.json();
}

export default async function Home() {
  const installers = await getInstallers();

  return (
    <>
      <header>
        <h1 className="text-4xl font-bold">Nuon installers</h1>
      </header>
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {installers.length &&
            installers.map((installer) => (
              <div
                className="p-6 border flex flex-col gap-4 rounded justify-between items-start"
                key={installer?.id}
              >
                <span>
                  <h2 className="text-xl font-semibold mb-2">
                    {installer?.app_installer_metadata?.name}
                  </h2>
                  <p className="text-xs leading-relaxed">
                    {installer?.app_installer_metadata?.description}
                  </p>
                </span>

                <Link
                  className="text-fuchsia-500 hover:text-fuchsia-700 focus:text-fuchsia-700"
                  href={`/${installer?.slug}`}
                >
                  Install now
                </Link>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
