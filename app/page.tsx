import { getInstaller } from "@/common";
import { Link, Video, Card } from "@/components";
import { Footer } from "@/components/Footer";

import type { Metadata } from "next";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { metadata } = await getInstaller(
    searchParams ? searchParams.installerId : null,
  );

  // TODO(fd): we need to address this.
  if (!!!metadata) {
    return {};
  }

  return {
    title: metadata.name,
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

export default async function Home({ searchParams }) {
  const { metadata, apps } = await getInstaller(searchParams.installerId);
  const queryString = new URLSearchParams(searchParams).toString();
  const demoUrl = metadata.formatted_demo_url || metadata.demo_url;
  const isDemoUrlValid = /^((http|https):\/\/)/.test(demoUrl);

  return (
    <>
      <header className="flex flex-auto flex-col gap-6 md:gap-12">
        <div className="text-center">
          <h1>
            <Link href={metadata.homepage_url}>
              <img
                className="inline-block max-w-xl max-h-xl"
                src={metadata.logo_url}
                alt={metadata.name}
              />
            </Link>
          </h1>
        </div>

        <p className="text-xl md:text-4xl text-center leading-relaxed">
          {metadata.description}
        </p>

        {demoUrl && isDemoUrlValid ? <Video src={demoUrl} /> : null}
      </header>
      <main className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
          {apps.length &&
            apps.map((app) => (
              <Card
                className="p-6 shadow-card-shadow dark:shadow-card-shadow-dark"
                key={app.id}
              >
                <span>
                  <h2 className="text-lg font-semibold mb-2">
                    {app.display_name ? app.display_name : app.name}
                  </h2>
                  <p className="text-xs leading-relaxed">{app.description}</p>
                </span>

                <Link className="text-sm" href={`/${app.name}?${queryString}`}>
                  Install now
                </Link>
              </Card>
            ))}
        </div>
      </main>
      <Footer {...metadata} />
    </>
  );
}
