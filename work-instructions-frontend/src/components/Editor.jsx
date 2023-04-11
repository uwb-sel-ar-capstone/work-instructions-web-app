import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "./Image";
import { useGlobalContext } from "../context";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/editor.css";

const Editor = () => {
  const [wiProblems, setWiProblems] = useState([]);
  const { baseAPIUrl } = useGlobalContext();
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const workInstructionID = searchParams.get("workInstructionID") || "";

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
  const [imageID, setImageID] = useState("");
  const [image, setImage] = useState({}); // image is stored here as this is a large file and we don't want to repeatedly call for in child components
  const [isValidWorkInstruction, setIsValidWorkInstruction] = useState(false);

  const getWorkInstruction = async (url) => {
    try {
      const { data } = await axios(url);
      if (data.wi) {
        setWorkInstruction(data.wi);
        setImage(data.wi.image);
        setImageID(data.wi.image._id); // only works if imageData=false
      } else {
        setWorkInstruction({});
        setImage({});
        setImageID("");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  // Download existing WI if there is an ID
  useEffect(() => {
    // If its a new work instruction, then we don't need to fetch anything
    if (workInstructionID === "") {
      return;
    }
    getWorkInstruction(
      `${baseAPIUrl}/workinstructions/${workInstructionID}?imageData=true&populate=false`
    );
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

  return (
    <>
      <Container gap={3} className="col-md-5 mx-auto">
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Image
              workInstruction={workInstruction}
              workInstructionID={workInstructionID}
              image={image}
              imageID={imageID}
              setImage={setImage}
              setImageID={setImageID}
            />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs="auto" md="auto">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="save-container"
            >
              <Button
                type="submit"
                variant="primary"
                disabled={!isValidWorkInstruction}
                className="save-button"
              >
                Save
              </Button>
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
