import StepList from "./StepList";
import { useSearchParams } from "react-router-dom";
import {
  useWorkInstructionContext,
  WorkInstructionContextProvider,
} from "../contexts/WorkInstruction";
const Editor = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const workInstructionID = searchParams.get("workInstructionID") || "";
  const {} = useWorkInstructionContext();
  return (
    <WorkInstructionContextProvider>
      <h1>Hello World</h1>
      <StepList workInstructionID={workInstructionID} />
    </WorkInstructionContextProvider>
  );
};
export default Editor;
