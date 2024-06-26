import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
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
    <AccordionHeader onClick={onClick}>
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
