import {getInstaller} from "@/common";
import {Link, Video} from "@/components";
import Card from "@/components/Card";

export default async function Home({searchParams}) {
  const {
    metadata,
    apps,
  } = await getInstaller();
  const queryString = new URLSearchParams(searchParams).toString();
  const demoUrl =
    metadata.formated_demo_url || metadata.demo_url;
  const isDemoUrlValid = /^((http|https):\/\/)/.test(demoUrl);

  return (
    <>
      <header className="flex flex-auto flex-col gap-12 md:gap-24">
        <div className="flex flex-col gap-4">
          <h1>
            <Link href={metadata.homepage_url}>
              <img
                src={metadata.logo_url}
                alt={metadata.name}
              />
            </Link>
          </h1>
        </div>

        <p className="text-4xl text-center leading-relaxed">
          {metadata.description}
        </p>

        {demoUrl && isDemoUrlValid ? <Video src={demoUrl} /> : null}
      </header>
      <main className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
          {apps.length &&
            apps.map((app) => (
              <Card key={app.id}>
                <span>
                  <h2 className="text-lg font-semibold mb-2">{app.name}</h2>
                  <p className="text-xs leading-relaxed">{app.description}</p>
                </span>

                <Link className="text-sm" href={`/${app.name}?${queryString}`}>
                  Install now
                </Link>
              </Card>
            ))}
        </div>
      </main>
    </>
  );
}
