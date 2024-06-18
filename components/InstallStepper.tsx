"use client";

import React, { useEffect, useRef } from "react";
import {
  Stepper,
  Step,
  Button,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  AWSInstallerFormFields,
  InputFields,
  AzureInstallerFormFields,
  StepOneAWS,
  StepOneAzure,
} from "../components";

const InstallStepper = ({
  app,
  searchParams,
  regions,
  createInstall,
  updateInstall,
  getInstall,
  reprovisionInstall,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const steps = app.input_config.input_groups.map((group, idx) => (
    <Step onClick={() => setActiveStep(idx + 2)}>{idx + 3}</Step>
  ));

  // track state of install
  const [install, setInstall] = React.useState({ id: "" });

  // create install when form is submitted
  const formAction = async (event) => {
    event.preventDefault();
    if (install.id === "") {
      const formData = new FormData(event.target);
      const res = await createInstall(app, formData);
    } else {
      updateInstall(install);
      reprovisionInstall(install.id);
    }
    setInstall(res);
  };

  // poll for install status once we have an ID
  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };
  useInterval(async () => {
    if (install.id !== "") {
      const res = await getInstall(install.id);
      setInstall(res);
    }
  }, 1000 * 3);

  const stepContent = app.input_config.input_groups.map((group, idx) => (
    <Accordion open={activeStep === idx + 2}>
      <AccordionHeader>{group.display_name}</AccordionHeader>
      <AccordionBody>
        <InputFields group={group} searchParams={searchParams} />
      </AccordionBody>
    </Accordion>
  ));

  return (
    <div className="w-full p-4">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>1</Step>
        <Step onClick={() => setActiveStep(1)}>2</Step>
        {...steps}
        <Step onClick={() => setActiveStep(steps.length + 2)}>
          {steps.length + 3}
        </Step>
      </Stepper>

      <div className="mt-4 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>

      <form className="mt-4" onSubmit={formAction}>
        <Accordion open={activeStep === 0}>
          <AccordionHeader>Company</AccordionHeader>
          <AccordionBody>
            <fieldset className="p-4">
              <label className="flex flex-col flex-auto gap-2">
                <span className="text-sm font-medium">Name</span>
                <input
                  className="border bg-inherit rounded px-4 py-1.5 shadow-inner"
                  defaultValue={
                    Object.hasOwn(searchParams, "name")
                      ? searchParams?.name
                      : ""
                  }
                  name="name"
                  type="text"
                  required
                />
              </label>
            </fieldset>
          </AccordionBody>
        </Accordion>

        <Accordion open={activeStep == 1}>
          {app?.cloud_platform === "aws" && (
            <>
              <AccordionHeader>AWS Account</AccordionHeader>
              <AccordionBody>
                <AWSInstallerFormFields
                  searchParams={searchParams}
                  regions={regions}
                />
              </AccordionBody>
            </>
          )}

          {app?.cloud_platform === "azure" && (
            <>
              <AccordionHeader>Azure Account</AccordionHeader>
              <AccordionBody>
                <AzureInstallerFormFields
                  searchParams={searchParams}
                  regions={regions}
                />
              </AccordionBody>
            </>
          )}
        </Accordion>

        {...stepContent}

        <Accordion open={activeStep === steps.length + 2}>
          <AccordionHeader>Install Status</AccordionHeader>
          <AccordionBody>
            <Button
              type="submit"
              className="rounded text-sm text-gray-50 bg-primary-600 hover:bg-primary-700 focus:bg-primary-700 active:bg-primary-800 px-4 py-1.5 w-fit m-4"
            >
              Submit
            </Button>
            {JSON.stringify(install)}
          </AccordionBody>
        </Accordion>
      </form>
    </div>
  );
};

export default InstallStepper;
