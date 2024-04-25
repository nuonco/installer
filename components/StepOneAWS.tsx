import Link from "next/link";
import React, { type FC } from "react";

export const StepOneAWS: FC<{ installer: Record<string, any> }> = ({
  installer,
}) => {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Step 1: create your IAM role</h2>
        <p className="text-base">
          In order to connect your AWS account, please create an IAM role with
          permissions to provision your install. You can create your IAM role
          however works for your team, using one of the following mechanisms.
          <br /> <br />
          This IAM role is only used when first provisioning your install, or
          when deprovisioning and can be removed after setup. Read more about{" "}
          <Link
            className="text-fuchsia-600 hover:text-fuchsia-900 focus:text-fuchsia-900"
            href="https://docs.nuon.co/guides/install-access-permissions"
            target="_blank"
            rel="noreferrer"
          >
            install access using AWS IAM
          </Link>{" "}
          in our documentation.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2 rounded border p-6">
          <h3 className="text-md font-semibold">
            Create IAM policies with CloudFormation
          </h3>
          <p className="text-sm">
            You can create a 1-click IAM role with the correct policies attached
            to provision + deprovision your application using the following
            link. This will create an IAM role granting access for{" "}
            {installer?.metadata?.name} to install Sourcegraph. Please use the
            stack output called{" "}
            <code className="bg-gray-600 text-yellow-400 font-monospaced px-2 py-1 text-xs rounded-sm h-[22px] inline-flex">
              RoleARN
            </code>{" "}
            as an input in step 2.
          </p>

          <Link
            className="text-sm text-fuchsia-600 hover:text-fuchsia-900 focus:text-fuchsia-900 mt-4"
            href={`https://us-west-2.console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateUrl=${installer?.app_sandbox?.artifacts?.cloudformation_stack_template}&stackName=nuon-${installer?.app_sandbox?.public_git_vcs_config?.directory}-permissions`}
            target="_blank"
            rel="noreferrer"
          >
            Create IAM Role
          </Link>
        </div>

        <div className="flex flex-col gap-2 rounded border p-6">
          <h3 className="text-md font-semibold">
            Create IAM policies with Terraform
          </h3>
          <p className="text-sm">
            You can use our sandbox IAM role Terraform module to automatically
            create an IAM for a sandbox type using Terraform. Please set the IAM
            role ARN as an output, and use it for step 2.
          </p>

          <Link
            className="text-sm text-fuchsia-600 hover:text-fuchsia-900 focus:text-fuchsia-900 mt-4"
            href="https://github.com/nuonco/sandboxes/tree/main/iam-role"
            target="_blank"
            rel="noreferrer"
          >
            Terraform Module
          </Link>
        </div>

        <div className="flex flex-col gap-2 rounded border p-6">
          <h3 className="text-md font-semibold">
            Create IAM policies manually
          </h3>
          <p className="text-sm">
            You can use the following policies to manually create an IAM role
            using the permissions noted below. Please note, the `deprovision`
            permissions are only needed if you would like to deprovision the
            install, and can be added later if desired.
          </p>

          <div className="flex gap-2 mt-4">
            <Link
              className="text-sm text-fuchsia-600 hover:text-fuchsia-900 focus:text-fuchsia-900"
              href={installer?.app_sandbox?.artifacts?.trust_policy}
              target="_blank"
              rel="noreferrer"
            >
              Trust policy
            </Link>
            <Link
              className="text-sm text-fuchsia-600 hover:text-fuchsia-900 focus:text-fuchsia-900"
              href={installer?.app_sandbox?.artifacts?.provision_policy}
              target="_blank"
              rel="noreferrer"
            >
              Provision policy
            </Link>
            <Link
              className="text-sm text-fuchsia-600 hover:text-fuchsia-900 focus:text-fuchsia-900"
              href={installer?.app_sandbox?.artifacts?.deprovision_policy}
              target="_blank"
              rel="noreferrer"
            >
              Deprovision policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
