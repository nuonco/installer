import { Accordion, AccordionHeader, AccordionBody } from "../../Accordion";
import { InstallStatus } from "./InstallStatus";
import { InstallButton } from "./InstallButton";
import { Markdown } from "@/components/Markdown";

function flattenSandboxOutputs(obj: object, suffix: string, ans: object) {
  for (var x in obj) {
    var key: string;
    if (suffix != "") key = suffix + "." + x;
    else key = x;
    if (typeof obj[x] === "object") {
      flattenSandboxOutputs(obj[x], key, ans);
    } else {
      ans[key] = obj[x];
    }
  }
}

const interpolateInputsAndInstallId = (
  install_id: string,
  inputs: {},
  sandbox_outputs: {},
  text: string,
) => {
  let interpolated = text;
  Object.keys(inputs).forEach((key) => {
    let value = inputs[key];
    let regex = new RegExp(
      String.raw`\{\{[ ]{0,1}\.nuon\.install\.inputs\.${key}[ ]{0,1}\}\}`,
      "g",
    ); // https://regex101.com/r/U5iEei/1
    interpolated = interpolated.replaceAll(regex, value);
  });

  if (install_id) {
    // interpolate install.id
    let regex = new RegExp(
      String.raw`\{\{[ ]{0,1}\.nuon\.install\.id[ ]{0,1}\}\}`,
      "g",
    ); // https://regex101.com/r/U5iEei/1
    interpolated = interpolated.replaceAll(regex, install_id);
  }

  // flatten the sandbox_output keys so we can use this simple regex matching
  let flatSandboxOutputs = {};
  flattenSandboxOutputs(sandbox_outputs, "", flatSandboxOutputs);
  Object.keys(flatSandboxOutputs).forEach((key) => {
    let value = flatSandboxOutputs[key];
    let regex = new RegExp(
      String.raw`\{\{[ ]{0,1}\.nuon\.install\.sandbox\.outputs\.${key}[ ]{0,1}\}\}`,
      "g",
    ); // https://regex101.com/r/U5iEei/1
    interpolated = interpolated.replaceAll(regex, value);
  });

  return interpolated;
};

export const InstallStatusContent = ({
  open = false,
  onClick = () => {},
  install = {
    id: null,
    status: "",
    status_description: "",
    install_inputs: [],
    sandbox: { outputs: {} },
  },
  post_install_markdown = "",
}) => {
  let install_input_values = {};
  if (install.install_inputs && install.install_inputs.length > 0) {
    install_input_values =
      install.install_inputs[install.install_inputs.length - 1].values;
  }
  const post_install_markdown_with_inputs = interpolateInputsAndInstallId(
    install.id,
    install_input_values,
    install.sandbox.outputs,
    post_install_markdown,
  );
  return (
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
        <span>Install Status</span>
      </AccordionHeader>
      <AccordionBody>
        <div className="grid grid-cols-1 gap-4 lg:gap-8 lg:grid-cols-2">
          <div>
            <Markdown content={post_install_markdown_with_inputs} />
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
};
