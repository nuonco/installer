import { IconButton } from "@material-tailwind/react";

export const NavArrows = ({
  handlePrev = () => {},
  isFirstStep = false,
  handleNext = () => {},
  isLastStep = false,
}) => (
  <div className="absolute -left-8 -right-8 top-1/2 flex justify-between">
    <IconButton
      className="rounded-full bg-black dark:bg-white text-white dark:text-black"
      onClick={handlePrev}
      disabled={isFirstStep}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </IconButton>
    <IconButton
      className="rounded-full bg-black dark:bg-white text-white dark:text-black"
      onClick={handleNext}
      disabled={isLastStep}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </IconButton>
  </div>
);
