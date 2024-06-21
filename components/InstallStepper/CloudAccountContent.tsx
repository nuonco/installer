import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  AWSInstallerFormFields,
  AzureInstallerFormFields,
  StepOneAWS,
  StepOneAzure,
  Card,
} from "@/components";

export const CloudAccountContent = ({
  app = { cloud_platform: "aws" },
  open = false,
  onClick = () => {},
  searchParams = {},
  regions = [],
}) => (
  <Accordion open={open}>
    {app.cloud_platform === "aws" && (
      <>
        <AccordionHeader onClick={onClick}>AWS IAM Role</AccordionHeader>
        <AccordionBody className="grid grid-cols-2 gap-4">
          <StepOneAWS app={app} />
          <Card>
            <AWSInstallerFormFields
              searchParams={searchParams}
              regions={regions}
            />
          </Card>
        </AccordionBody>
      </>
    )}

    {app?.cloud_platform === "azure" && (
      <>
        <AccordionHeader onClick={onClick}>Azure Account</AccordionHeader>
        <AccordionBody className="grid grid-cols-2 gap-4">
          <StepOneAzure />
          <Card>
            <AzureInstallerFormFields
              searchParams={searchParams}
              regions={regions}
            />
          </Card>
        </AccordionBody>
      </>
    )}
  </Accordion>
);
