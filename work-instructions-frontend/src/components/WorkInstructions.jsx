import { useGlobalContext } from "../contexts/AllWorkInstructions";
import WorkInstructionCard from "./WorkInstructionCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const WorkInstructions = () => {
  const { workInstructions } = useGlobalContext();
  return (
    <Container>
      <h4 className="mt-3 mb-0">
        Work Instruction Count: {workInstructions.length}
      </h4>
      <Row className="d-flex justify-content-between">
        {workInstructions.map((workInstruction) => {
          return (
            <Col md="auto" key={workInstruction._id}>
              <WorkInstructionCard workInstruction={workInstruction} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default WorkInstructions;
