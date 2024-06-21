"use client";

import React, { useEffect, useRef } from "react";
import { Stepper, Step } from "@material-tailwind/react";

import { NavArrows } from "./NavArrows";
import { CompanyContent } from "./CompanyContent";
import { CloudAccountContent } from "./CloudAccountContent";
import { GroupContent } from "./GroupContent";
import { InstallStatusContent } from "./InstallStatusContent";
import { ErrorAlert } from "./ErrorAlert";

const InstallStepper = ({
  app,
  installer,
  searchParams,
  regions,
  createInstall,
  getInstall,
  redeployInstall,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  // track state of install
  const [install, setInstall] = React.useState({
    id: searchParams.install_id || "",
    status: "not created",
    status_description: "install has not been created yet",
    install_components: [],
  });
  const [error, setError] = React.useState({
    description: "",
    error: "",
    user_error: false,
    install_components: [],
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
      // if we've already created the install, redeploy it
      const reproRes = await redeployInstall(install.id, app, formData);
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
        // `savedCallback.current()` works fine in dev, but fails the build.
        // Basically, Typescript can't know if savedCallback.current is defined in the context of this closure,
        // so we need to assert that it's a function in order for Typescript to accept it.
        (savedCallback.current as () => {})();
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
    }
  }, 1000 * 10);

  const input_groups = app.input_config.input_groups || [];
  const stepContent = input_groups.map((group, idx) => (
    <GroupContent group={group} idx={idx} />
  ));

  const steps = input_groups.map((group, idx) => (
    <Step key={idx} onClick={() => setActiveStep(idx + 2)}>
      {idx + 3}
    </Step>
  ));

  const errorAlert =
    error.error !== "" ? <ErrorAlert>{error.description}</ErrorAlert> : null;

  return (
    <div className="relative w-full p-4">
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

      <NavArrows
        handlePrev={handlePrev}
        isFirstStep={isFirstStep}
        handleNext={handleNext}
        isLastStep={isLastStep}
      />

      <form className="mt-4" onSubmit={formAction}>
        <CompanyContent
          open={activeStep === 0}
          onClick={() => setActiveStep(0)}
        />

        <CloudAccountContent
          app={app}
          open={activeStep == 1}
          onClick={() => setActiveStep(1)}
          searchParams={searchParams}
          regions={regions}
        />

        {...stepContent}

        <InstallStatusContent
          open={activeStep === steps.length + 2}
          onClick={() => setActiveStep(steps.length + 2)}
          install={install}
          post_install_markdown={installer.metadata.post_install_markdown}
        />
      </form>

      {errorAlert}
    </div>
  );
};

export default InstallStepper;
