import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Card } from "@/components";

export const CompanyContent = ({
  open = false,
  onClick = () => {},
  searchParams = {},
}) => (
  <Accordion open={open}>
    <AccordionHeader onClick={onClick}>Company Info</AccordionHeader>
    <AccordionBody>
      <Card>
        <fieldset className="p-4 w-full">
          <label className="flex flex-col flex-auto gap-2">
            <span className="text-sm font-medium">Name</span>
            <input
              className="border bg-inherit rounded px-4 py-1.5 shadow-inner"
              defaultValue={
                Object.hasOwn(searchParams, "name") ? searchParams?.name : ""
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
