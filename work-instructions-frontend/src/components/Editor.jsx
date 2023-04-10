import StepList from "./StepList";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "./Image";
import { useGlobalContext } from "../context";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Editor = () => {
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
  const [isCreateNew, setIsCreateNew] = useState(workInstructionID === ""); // If there is no id, then this is a new work instruction

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
  useEffect(() => {
    if (isCreateNew) {
      return;
    }
    getWorkInstruction(
      `${baseAPIUrl}/workinstructions/${workInstructionID}?imageData=true&populate=false`
    );
  }, [baseAPIUrl, workInstructionID]);

  const checkValidWorkInstruction = () => {
    console.log(workInstruction);
    if (workInstruction.dimensions.xLengthCM === 0) {
      return false;
    }
    if (workInstruction.dimensions.zLengthCM === 0) {
      return false;
    }
    if (workInstruction.name === "") {
      return false;
    }
    if (workInstruction.steps.length === 0) {
      return false;
    }
    if (workInstruction.image._id === "") {
      return false;
    }
    return true;
  };

  return (
    <>
      <Container gap={3} classname="col-md-5 mx-auto">
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
            <Button variant="primary" disabled={!checkValidWorkInstruction()}>
              Save
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Editor;
