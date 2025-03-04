
import { NavigateOptions } from "react-router-dom";

export const pageTransitions = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

// For transition between pages with react-router
export const getNavigateOptions = (): NavigateOptions => {
  return {
    state: {
      animation: true,
    },
  };
};

// Page transition CSS classes
export const pageTransitionClasses = {
  enter: "page-transition-enter",
  exit: "page-transition-exit",
};
