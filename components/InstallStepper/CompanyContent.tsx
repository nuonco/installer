import { Accordion, AccordionHeader, AccordionBody } from "../Accordion";
import { Card } from "@/components";

export const CompanyContent = ({
  open = false,
  onClick = () => {},
  searchParams = { name: "" },
}) => (
  <Accordion open={open}>
    <AccordionHeader
      onClick={onClick}
      className={
        open
          ? "px-4 bg-accordion-header-active-background text-accordion-header-active-color"
          : "px-4"
      }
    >
      Company Info
    </AccordionHeader>
    <AccordionBody className="text-black dark:text-white">
      <Card>
        <fieldset className="p-4 w-full">
          <label className="flex flex-col flex-auto gap-2">
            <span className="text-sm font-medium">Name</span>
            <input
              className="border bg-inherit rounded px-4 py-1.5 shadow-inner"
              defaultValue={
                Object.hasOwn(searchParams, "name") ? searchParams.name : ""
              }
              name="name"
              type="text"
              required
            />
          </label>
        </fieldset>
      </Card>
    </AccordionBody>
  </Accordion>
);
