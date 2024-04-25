"use client";
import React, { type FC, useEffect, useState } from "react";

export const Install: FC<{
  install: Record<string, any>;
  installerSlug: string;
}> = ({ install, installerSlug }) => {
  const [data, setData] = useState<Record<string, any>>(install);
  const [isLoading, setLoading] = useState(true);

  const fetchInstall = () => {
    fetch(`/api/installers/${installerSlug}/${install?.id}/`)
      .then((res) => res.json())
      .then((d) => {
        setData(d?.install);
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
      <h1 className="text-5xl leading-relaxed">{data?.name}</h1>
      <Status
        status={data?.status}
        status_description={data?.status_description}
      />
    </>
  );
};

const Status: FC<{ status: string; status_description: string }> = ({
  status,
  status_description,
}) => {
  const clr =
    status === "provisioning"
      ? "yellow-500"
      : status === "active"
        ? "green-500"
        : "red-500";

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
