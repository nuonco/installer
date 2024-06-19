"use client";

import React from "react";

import Card from "./Card";
import StatusIcon from "./StatusIcon";

export const InstallStatus: FC<{ install: Record<string, any> }> = ({
  install,
}) => {
  let sandboxStatus = "pending";
  let sandboxStatusDescription = "Sandbox has not deployed yet.";
  if (install.install_sandbox_runs && install.install_sandbox_runs.length > 0) {
    const lastRun = install.install_sandbox_runs[0];
    sandboxStatus = lastRun.status;
    sandboxStatusDescription = lastRun.status_description;
  }

  const components = install.install_components.map((component, idx) => {
    let status = "pending";
    let status_description = "Component has not deployed yet.";
    if (component.install_deploys.length > 0) {
      const lastDeploy = component.install_deploys[0];
      status = lastDeploy.status;
      status_description = lastDeploy.status_description;
    }
    return (
      <div key={idx}>
        <span className="font-medium">
          <StatusIcon status={sandboxStatus} /> {component.component.name}:
        </span>{" "}
        <span>{status_description}</span>
      </div>
    );
  });

  return (
    <div>
      <Card className="grid p-4 divide-y mb-4">
        <div className="font-bold">
          <StatusIcon status={sandboxStatus} /> Sandbox
        </div>
        <div>{sandboxStatusDescription}</div>
      </Card>
      <Card className="grid p-4 divide-y">
        <div className="font-bold">Components</div>
        {components}
      </Card>
    </div>
  );
};
