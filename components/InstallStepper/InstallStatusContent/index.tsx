import { Accordion, AccordionHeader, AccordionBody } from "../../Accordion";
import { InstallStatus } from "./InstallStatus";
import { StatusIcon } from "@/components";
import { InstallButton } from "./InstallButton";
import { Markdown } from "@/components/Markdown";

export const InstallStatusContent = ({
  open = false,
  onClick = () => {},
  install = {
    status: "",
    status_description: "",
  },
  post_install_markdown = "",
}) => (
  <Accordion open={open}>
    <AccordionHeader
      className={
        open
          ? `px-4
              text-accordion-header-active-color
              dark:text-accordion-header-active-color-dark
              hover:!text-gray-500
              bg-accordion-header-active-background
              dark:bg-accordion-header-active-background-dark`
          : "px-4"
      }
      onClick={onClick}
    >
      <span>
        Install Status <StatusIcon status={install.status} />{" "}
        <span className="text-sm font-medium">
          {install.status_description}
        </span>
      </span>
    </AccordionHeader>
    <AccordionBody>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Markdown content={post_install_markdown} />
        </div>

        <div>
          <InstallStatus install={install} />
          <div className="mt-4 flex justify-end">
            <InstallButton install={install} />
          </div>
        </div>
      </div>
    </AccordionBody>
  </Accordion>
);
