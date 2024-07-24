import { Accordion, AccordionHeader, AccordionBody } from "../Accordion";
import {
  AWSInstallerFormFields,
  AzureInstallerFormFields,
  StepOneAWS,
  StepOneAzure,
  Card,
} from "@/components";

interface AWSDelegationConfig {
  iam_role_arn: string | null;
}
interface SandboxConfig {
  aws_delegation_config: AWSDelegationConfig;
}

export const CloudAccountContent = ({
  app = {
    cloud_platform: "aws",
    sandbox_config: { aws_delegation_config: { iam_role_arn: null } },
  },
  aws_account = null,
  azure_account = null,
  open = false,
  onClick = () => {},
  searchParams = {},
  regions = [],
}) => (
  <Accordion open={open}>
    {app.cloud_platform === "aws" && (
      <>
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
          AWS IAM Role
        </AccordionHeader>
        <AccordionBody className="grid grid-cols-2 gap-4">
          <StepOneAWS app={app} />
          <Card>
            <AWSInstallerFormFields
              aws_delegation_config={app?.sandbox_config?.aws_delegation_config}
              searchParams={searchParams}
              regions={regions}
              aws_account={aws_account}
            />
          </Card>
        </AccordionBody>
      </>
    )}

    {app?.cloud_platform === "azure" && (
      <>
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
          Azure Account
        </AccordionHeader>
        <AccordionBody className="grid grid-cols-2 gap-4">
          <StepOneAzure />
          <Card>
            <AzureInstallerFormFields
              searchParams={searchParams}
              regions={regions}
              azure_account={azure_account}
            />
          </Card>
        </AccordionBody>
      </>
    )}
  </Accordion>
);
