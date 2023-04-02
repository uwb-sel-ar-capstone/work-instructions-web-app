import { createSearchParams } from "react-router-dom";

// This function constructs/returns a function to navigate to the editor with a specific workInstructionID
const createNavigateToEditor = (navigate, workInstructionID) => {
  return function () {
    const params = { workInstructionID: workInstructionID };
    navigate({
      pathname: "/editor",
      search: `?${createSearchParams(params)}`,
    });
  };
};
export default createNavigateToEditor;
