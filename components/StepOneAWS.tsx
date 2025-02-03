import React, { type FC } from "react";
import { Link, Card } from "@/components";

export const StepOneAWS: FC<{ app: Record<string, any> }> = ({ app }) => {
  return (
    <div className="flex flex-col gap-4">
      <p>
        In order to connect your AWS account, please create an IAM role with
        permissions to provision your install.
      </p>

      <p>
        This IAM role is only used when first provisioning your install, or when
        deprovisioning and can be removed after setup. Read more about{" "}
        <Link
          href="https://docs.nuon.co/guides/install-access-permissions"
          target="_blank"
          rel="noreferrer"
        >
          install access using AWS IAM
        </Link>{" "}
        in our documentation.
      </p>

      <Card className="p-4">
        <h3 className="text-md font-semibold">
          Create IAM policies with CloudFormation
        </h3>
        <p className="text-sm">
          You can create a 1-click IAM role with the correct policies attached
          to provision + deprovision your application using the following link.
          This will create an IAM role granting access to install{" "}
          {app?.metadata?.name}. Please use the stack output called{" "}
          <code className="bg-gray-800 text-orange-400 font-monospaced px-2 py-1 rounded-sm h-[22px] inline-flex text-[11px] tracking-wide">
            RoleARN
          </code>{" "}
          as an input in step 2.
        </p>

        <Link
          className="text-sm mt-4"
          href={`https://us-west-2.console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateUrl=${app?.sandbox_config?.artifacts?.cloudformation_stack_template}&stackName=nuon-${app?.sandbox_config?.public_git_vcs_config?.directory}-permissions`}
          target="_blank"
          rel="noreferrer"
        >
          Create IAM Role
        </Link>
      </Card>
    </div>
  );
};
