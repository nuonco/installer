import showdown from "showdown";
import { getInstall, getInstaller } from "@/common";
import { Install, Link } from "@/components";

const markdown = new showdown.Converter();

export default async function InstallerInstall({ params }) {
  const installId = params?.["install-id"];

  const [install, installer] = await Promise.all([
    getInstall(installId),
    getInstaller(),
  ]);

  return (
    <>
      <header className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <div className="flex flex-col gap-2">
          <Install install={install} />
        </div>

        <div className="flex flex-col gap-2">
          <h1>
            <Link href={installer?.metadata?.homepage_url}>
              <img
                src={installer?.metadata?.logo_url}
                alt={installer?.metadata?.name}
              />
            </Link>
          </h1>
          <p>{installer?.metadata?.description}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: markdown.makeHtml(
                installer?.metadata?.post_install_markdown,
              ),
            }}
          />
        </div>
      </header>
    </>
  );
}
