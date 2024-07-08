import { Accordion, AccordionHeader, AccordionBody } from "../Accordion";
import { InputFields, Card } from "@/components";

export const GroupContent = ({
  group = { display_name: "" },
  idx = 0,
  activeStep = 0,
  setActiveStep = (idx = 0) => {},
  searchParams = {},
}) => (
  <Accordion key={idx} open={activeStep === idx + 2}>
    <AccordionHeader
      onClick={() => setActiveStep(idx + 2)}
      className={
        activeStep === idx + 2
          ? `px-4
              text-accordion-header-active-color
              dark:text-accordion-header-active-color-dark
              hover:!text-gray-500
              bg-accordion-header-active-background
              dark:bg-accordion-header-active-background-dark
          `
          : "px-4"
      }
    >
      {group.display_name}
    </AccordionHeader>
    <AccordionBody>
      <Card>
        <InputFields group={group} searchParams={searchParams} />
      </Card>
    </AccordionBody>
  </Accordion>
);
