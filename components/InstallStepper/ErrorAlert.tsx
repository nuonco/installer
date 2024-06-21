import { Alert } from "@material-tailwind/react";

export const ErrorAlert = ({ children }) => (
  <div className="fixed w-full right-0 bottom-0 left-0 p-4">
    <Alert color="red">{children}</Alert>
  </div>
);
