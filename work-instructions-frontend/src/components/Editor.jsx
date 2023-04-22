import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import Image from "./Image";
import { useGlobalContext } from "../context";
import LoadingButton from "./LoadingButton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/Card.css";
import "../styles/editor.css";
import createNavigateToEditor from "../helpers/NavigateToEditor";
import { useNavigate } from "react-router-dom";
import ImageUploader from "./ImageUploader";
import WIStepList from "./WIStepList";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import StepCard from "../components/StepCard";

const Editor = () => {
  const [wiProblems, setWiProblems] = useState([]);
  const { baseAPIUrl } = useGlobalContext();
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const workInstructionID = searchParams.get("workInstructionID") || "";
  const [currentStepID, setCurrentStepID] = useState("");

  const [workInstruction, setWorkInstruction] = useState({
    dimensions: {
      xLengthCM: 0,
      zLengthCM: 0,
    },
    _id: "",
    name: "",
    steps: [],
    image: {
      _id: "",
      imageData: "",
      mimeType: "",
      encoding: "",
    },
  });

  const [stepIDs, setStepIDs] = useState(workInstruction.steps);
  const [imageID, setImageID] = useState("");
  // const [image, setImage] = useState({}); // image is stored here as this is a large file and we don't want to repeatedly call for in child components
  const [isValidWorkInstruction, setIsValidWorkInstruction] = useState(false);

  const getWorkInstruction = async (url) => {
    try {
      const { data } = await axios(url);
      if (data.wi) {
        setWorkInstruction(data.wi);
        setStepIDs(data.wi.steps);
        // setImage(data.wi.image);
        setImageID(data.wi.image._id); // only works if imageData=false
      } else {
        setWorkInstruction({});
        // setImage({});
        setImageID("");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  // Listen to changes in the stepIDs array and update the work instruction
  useEffect(() => {
    setWorkInstruction((prev) => {
      return { ...prev, steps: stepIDs };
    });
  }, [stepIDs]);

  // Download existing WI if there is an ID
  useEffect(() => {
    // If its a new work instruction, then we don't need to fetch anything
    if (workInstructionID === "") {
      return;
    }
    getWorkInstruction(
      `${baseAPIUrl}/workinstructions/${workInstructionID}?imageData=true&populate=false`
    );
    // // Set the current step ID to be the first work instruction step. May be annoying behavior if we save the work instruction, because this would then re-set the current step to be the first step.
    // if (workInstruction.steps.length > 0) {
    //   setCurrentStepID(workInstruction.steps[0]);
    // }
  }, [baseAPIUrl, workInstructionID]);

  // Check if the work instruction is valid
  useEffect(() => {
    let isValid = true;
    // Code is clean if we keep resetting array on this check. Efficiency is not big a concern here.
    let problems = [];
    if (
      workInstruction.dimensions.xLengthCM === 0 ||
      workInstruction.dimensions.xLengthCM === null
    ) {
      isValid = false;
      problems.push("X length is 0");
    }

    if (
      workInstruction.dimensions.zLengthCM === 0 ||
      workInstruction.dimensions.zLengthCM === null
    ) {
      isValid = false;
      problems.push("Y length is 0");
    }

    if (workInstruction.name === "") {
      isValid = false;
      problems.push("Name is empty");
    }

    if (workInstruction.steps.length === 0) {
      isValid = false;
      problems.push("No steps");
    }

    if (workInstruction.image._id === "") {
      isValid = false;
      problems.push("No image");
    }

    setWiProblems(problems);
    setIsValidWorkInstruction(isValid);
  }, [workInstruction]);

  // Error Hovering
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleSave = async (url, data, axiosFcn) => {
    try {
      const response = await axiosFcn(url, data);
      if (response.data.wi) {
        return response;
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const navigateToEditor = createNavigateToEditor(
    useNavigate(),
    workInstruction._id
  );
  // Button Click Handler

  const navigate = useNavigate();

  // isLoading, setLoading defined by LoadingButton
  const saveButtonFunction = (isLoading, setLoading) => {
    if (isLoading) {
      // if we don't have a work instruction ID, then we need to use the create new work instruction endpoint
      if (workInstructionID === "") {
        handleSave(
          `${baseAPIUrl}/workinstructions`,
          {
            name: workInstruction.name,
            dimensions: workInstruction.dimensions,
            steps: workInstruction.steps,
            image: imageID,
          },
          axios.post
        ).then((response) => {
          setLoading(false);
          navigateToEditor(response.data.wi._id);
        });
      }
      // otherwise we can use the update work instruction endpoint
      else {
        handleSave(
          `${baseAPIUrl}/workinstructions/${workInstructionID}`,
          {
            name: workInstruction.name,
            dimensions: workInstruction.dimensions,
            steps: workInstruction.steps,
            image: imageID,
          },
          axios.patch
        ).then((response) => {
          setLoading(false);

          navigateToEditor(response.data.wi._id);
          // Refreshing page just to be sure that everything is up to date. This may be a redundant step.
          navigate(0);
        });
      }
    }
  };

  return (
    <>
      <Container gap={3} className="col-md-9 mx-auto">
        <Row className="justify-content-md-center">
          <Col>
            <Card className={"card my-2"}>
              <Card.Body>
                <Card.Title>Work Instruction Title:</Card.Title>
                <Form>
                  <Form.Group controlId="formBasicText">
                    <Form.Control
                      type="text"
                      placeholder="Enter Title"
                      value={workInstruction.name}
                      onChange={(e) => {
                        e.preventDefault();
                        setWorkInstruction((prev) => {
                          return { ...prev, name: e.target.value };
                        });
                      }}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>

            <Card className={"card my-2"}>
              <Card.Body>
                <Card.Title>Base Dimensions:</Card.Title>
                <Form>
                  <Form.Group controlId="formBasicText">
                    <Form.Label>X Length (cm):</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter X Length"
                      value={workInstruction.dimensions.xLengthCM}
                      onChange={(e) => {
                        if (e.target.value < 0) {
                          e.target.value = 0;
                        }
                        setWorkInstruction((prev) => {
                          return {
                            ...prev,
                            dimensions: {
                              ...prev.dimensions,
                              xLengthCM: e.target.value,
                            },
                          };
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicText">
                    <Form.Label>Y Length (cm):</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Y Length"
                      value={workInstruction.dimensions.zLengthCM}
                      onChange={(e) => {
                        if (e.target.value < 0) {
                          e.target.value = 0;
                        }
                        setWorkInstruction((prev) => {
                          return {
                            ...prev,
                            dimensions: {
                              ...prev.dimensions,
                              zLengthCM: e.target.value,
                            },
                          };
                        });
                      }}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Steps:</Card.Title>
                <WIStepList
                  stepIDs={stepIDs}
                  setStepIDs={setStepIDs}
                  setCurrentStepID={setCurrentStepID}
                />
              </Card.Body>
            </Card>
            <ImageUploader />
          </Col>
          <Col>
            {currentStepID !== "" ? (
              <StepCard
                stepID={currentStepID}
                baseImage={workInstruction.image}
              />
            ) : (
              <Card className={"card my-2"}>
                <Card.Body>
                  <Card.Title>Step:</Card.Title>
                  <Card.Text>No Step Selected</Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="save-container"
            >
              <LoadingButton
                saveButtonFunction={saveButtonFunction}
                isValid={isValidWorkInstruction}
              />
              {isHover && wiProblems.length > 0 && (
                <div className="hover-div">
                  <h1 className="error title">Error:</h1>
                  <ul>
                    {wiProblems.map((problem, idx) => {
                      return (
                        <li className="error" key={idx}>
                          {problem}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Editor;
