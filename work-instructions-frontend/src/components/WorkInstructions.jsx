import { useGlobalContext } from "../context";
import WorkInstructionCard from "./WorkInstructionCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useEffect, useState } from "react";

const WorkInstructions = () => {
  const { baseAPIUrl } = useGlobalContext();
  const [workInstructions, setWorkInstructions] = useState([]);
  useEffect(() => {
    const getAllWorkInstructionsURL = `${baseAPIUrl}/workinstructions?imageData=true`;
    const getWorkInstructions = async (url) => {
      try {
        const { data } = await axios(url);
        if (data.wis) {
          setWorkInstructions(data.wis);
        } else {
          setWorkInstructions([]);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    getWorkInstructions(getAllWorkInstructionsURL);
  }, [baseAPIUrl, setWorkInstructions, workInstructions]);

  return (
    <Container>
      <h4 className="mt-3 mb-0">
        Work Instruction Count: {workInstructions.length}
      </h4>
      <Row className="d-flex justify-content-between">
        {workInstructions.map((workInstruction) => {
          const deleteWI = async () => {
            // when called, delete the workInstruction with workInstruction._id from the database, and then update the workInstructions state
            const deleteUrl = `${baseAPIUrl}/workinstructions/${workInstruction._id}`;
            try {
              const { data } = await axios.delete(deleteUrl);
              if (data.workInstruction) {
                setWorkInstructions(
                  workInstructions.filter(
                    (wi) => wi._id !== data.workInstruction._id
                  )
                );
              }
            } catch (error) {
              console.log(error.response);
            }
          };
          return (
            <Col md="auto" key={workInstruction._id}>
              <WorkInstructionCard
                workInstruction={workInstruction}
                deleteWI={deleteWI}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default WorkInstructions;
