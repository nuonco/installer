import { Link, PoweredByNuon } from "@/components";
import { Markdown } from "@/components/Markdown";

const missingData = {
  orgName: "Nuon",
};

export const Footer = (metadata: any) => (
  <footer className="flex items-center justify-between">
    <div className="flex gap-2 items-center">
      {metadata.copyright_markdown ? (
        <Markdown content={metadata.copyright_markdown} />
      ) : (
        <>
          <span className="text-xs">&copy; {new Date().getFullYear()}</span>
          <Link
            href={metadata.homepage_url}
            className="text-xs"
            target="_blank"
            rel="noreferrer"
          >
            {missingData.orgName}
          </Link>
        </>
      )}
    </div>
    <div className="flex gap-6 items-center">
      {metadata.footer_markdown ? (
        <Markdown content={metadata.footer_markdown} />
      ) : (
        <PoweredByNuon />
      )}
    </div>
  </footer>
);
