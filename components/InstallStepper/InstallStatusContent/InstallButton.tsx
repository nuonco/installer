import { Button } from "@material-tailwind/react";

export const InstallButton = ({ install }) => {
  const loading = install.status === "provisioning";

  let label = "Create Install";
  if (install.id.length > 0) label = "Update Install";
  if (loading) label = "Provisioning";

  return (
    <Button
      loading={loading}
      type="submit"
      className="rounded text-sm text-gray-50 bg-primary-500 hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 px-4 py-1.5"
    >
      {label}
    </Button>
  );
};
