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
      className="text-black dark:text-white hover:!text-gray-500"
      onClick={() => setActiveStep(idx + 2)}
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
