"use client";

import React, { type FC, useEffect, useState } from "react";

// install status helpers
type TStatus = { status: string; status_description: string };

export function getSandboxStatus(runs: Record<string, any>[]): TStatus {
  return {
    status: runs?.[0]?.status || "error",
    status_description:
      runs?.[0]?.status_description || "Sandbox isn't provisioned",
  };
}

export function getInstallComponentStatus(
  components: Record<string, any>[],
): TStatus {
  let status = {
    status: "waiting",
    status_description: "Waiting on components to deploy",
  };

  if (
    components.some(
      (c) =>
        c?.install_deploys?.[0]?.status === "failed" ||
        c?.install_deploys?.[0]?.status === "error",
    )
  ) {
    status = {
      status: "failed",
      status_description: "Some components have failed to deploy",
    };
  }

  if (components.every((c) => c?.install_deploys?.[0]?.status === "active")) {
    status = {
      status: "active",
      status_description: "All components are active",
    };
  }

  if (components?.every((c) => c?.install_deploys?.length === 0)) {
    status = {
      status: "waiting",
      status_description: "Components are not deployed",
    };
  }

  return status;
}

export function getInstallStatus(statuses: TStatus[]): TStatus {
  let status: TStatus = {
    status: "waiting",
    status_description: "Install is waiting for something",
  };

  if (statuses.some((s) => s?.status === "failed" || s?.status === "error")) {
    status = {
      status: "error",
      status_description: "Something has gone wrong",
    };
  }

  if (statuses.every((s) => s?.status === "active")) {
    status = {
      status: "active",
      status_description: "Everything is working",
    };
  }

  return status;
}

export type TFullInstallStatus = Record<
  "componentStatus" | "installStatus" | "sandboxStatus",
  TStatus
>;

export function getFullInstallStatus(
  install: Record<string, any>,
): TFullInstallStatus {
  const sandboxStatus = getSandboxStatus(install?.install_sandbox_runs || []);
  const componentStatus = getInstallComponentStatus(
    install?.install_components || [],
  );

  return {
    componentStatus,
    installStatus: getInstallStatus([sandboxStatus, componentStatus]),
    sandboxStatus,
  };
}

export const InstallStatus: FC<{ install: Record<string, any> }> = ({
  install,
}) => {
  const status = getFullInstallStatus(install);

  return (
    <div className="flex flex-col gap-6">
      <span>
        <span className="text-sm font-bold">Install sandbox</span>
        <Status
          status={status?.sandboxStatus?.status}
          status_description={status?.sandboxStatus?.status_description}
        />
      </span>
      <span>
        <span className="text-sm font-bold">Install application</span>
        <Status
          status={status?.componentStatus?.status}
          status_description={status?.componentStatus?.status_description}
        />
      </span>
    </div>
  );
};

export const Install: FC<{
  install: Record<string, any>;
}> = ({ install }) => {
  const [data, setData] = useState<Record<string, any>>(install);
  const [isLoading, setLoading] = useState(true);

  const fetchInstall = () => {
    fetch(`/api/${install?.id}/`)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchInstall();
  }, []);

  useEffect(() => {
    const pollStatus = setInterval(fetchInstall, 30000);
    return () => clearInterval(pollStatus);
  }, [data]);

  return isLoading ? (
    <>
      <p className="text-base font-semibold">Loading...</p>
    </>
  ) : (
    <>
      <span className="text-xs">{data?.id}</span>
      <h1 className="text-4xl leading-relaxed">{data?.name}</h1>
      <InstallStatus install={install} />
    </>
  );
};

const Status: FC<{ status: string; status_description: string }> = ({
  status,
  status_description,
}) => {
  let clr = "yellow-500";
  if (status === "active") {
    clr = "green-600";
  } else if (status === "error") {
    clr = "red-500";
  }

  return (
    <span className="text-sm">
      <span className={`text-${clr} flex gap-2 items-center justify-start`}>
        <span
          className={`bg-${clr} inline-flex w-[10px] h-[10px] rounded-full`}
        />
        {status.replace(/(^\w{1}|\.\s*\w{1})/gi, (s) => s.toUpperCase())}
      </span>
      {status_description.replace(/(^\w{1}|\.\s*\w{1})/gi, (s) =>
        s.toUpperCase(),
      )}
    </span>
  );
};
