"use client";

import React, { useEffect, useRef } from "react";
import {
  Stepper,
  Step,
  Button,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";
import {
  AWSInstallerFormFields,
  InputFields,
  AzureInstallerFormFields,
  StepOneAWS,
  StepOneAzure,
  Link,
} from "../components";
import { InstallStatus } from "./InstallStatus";
import StatusIcon from "./StatusIcon";
import showdown from "showdown";

const markdown = new showdown.Converter();

const InstallStepper = ({
  app,
  installer,
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
  const [install, setInstall] = React.useState({
    id: "",
    status: "not created",
    status_description: "No install has been created yet.",
    install_components: [],
  });
  const [error, setError] = React.useState({
    description: "",
    error: "",
    user_error: false,
  });

  // create or update install when form is submitted
  const formAction = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    let installID = "";
    if (install.id === "") {
      // if we haven't created the install yet, create it
      const res = await createInstall(app, formData);
      if (res.error) {
        setError(res);
        return;
      }
      installID = res.id;
    } else {
      // if we've already created the install, update it and reprovision
      const updateRes = updateInstall(formData);
      if (updateRes.error) {
        setError(updateRes);
        return;
      }

      const reproRes = reprovisionInstall(install.id);
      if (reproRes.error) {
        setError(reproRes);
        return;
      }
    }

    // by this point we should have an install ID
    // fetch the install so we can render the status
    const res = await getInstall(installID);
    if (res.error) {
      setError(res);
      return;
    }

    setInstall(res);
    setError({
      description: "",
      error: "",
      user_error: false,
    });
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
  }, 1000 * 5);

  console.log("install: ", install);
  console.log("error: ", error);

  const stepContent = app.input_config.input_groups.map((group, idx) => (
    <Accordion open={activeStep === idx + 2}>
      <AccordionHeader>{group.display_name}</AccordionHeader>
      <AccordionBody>
        <InputFields group={group} searchParams={searchParams} />
      </AccordionBody>
    </Accordion>
  ));

  const errorAlert =
    error.error !== "" ? (
      <div className="fixed w-full right-0 bottom-0 left-0 p-4">
        <Alert color="red">{error.description}</Alert>
      </div>
    ) : null;

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
          <AccordionHeader>
            <span>
              Install Status <StatusIcon status={install.status} />
            </span>
          </AccordionHeader>
          <AccordionBody>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: markdown.makeHtml(
                      installer?.metadata?.post_install_markdown,
                    ),
                  }}
                />
              </div>

              <div>
                <InstallStatus install={install} />
                <Button
                  type="submit"
                  className="block mr-0 ml-auto rounded text-sm text-gray-50 bg-primary-600 hover:bg-primary-700 focus:bg-primary-700 active:bg-primary-800 px-4 py-1.5 w-fit mt-4"
                >
                  {install.id === "" ? "Create Install" : "Update Install"}
                </Button>
              </div>
            </div>
          </AccordionBody>
        </Accordion>
      </form>
      {errorAlert}
    </div>
  );
};

export default InstallStepper;
