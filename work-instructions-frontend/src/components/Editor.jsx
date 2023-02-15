import StepList from "./StepList";
import { useSearchParams } from "react-router-dom";
const Editor = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const workInstructionID = searchParams.get("workInstructionID") || "";
  return (
    <>
      <h1>Hello World</h1>
      <StepList workInstructionID={workInstructionID} />
    </>
  );
};
export default Editor;
