import { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "../styles/Card.css";
import ListGroup from "react-bootstrap/ListGroup";
import CloseButton from "react-bootstrap/CloseButton";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import PositionEditor from "./PositionEditor";
import AllItemList from "./AllItemList";
import ImageCard from "./ImageCard";
import DisplayImage from "./DisplayImage";

const StepCard = ({ stepID, baseImage, setCurrentStepID }) => {
  const { baseAPIUrl } = useGlobalContext();
  const url = `${baseAPIUrl}/steps/${stepID}?populate=false&imageData=true`;
  const [step, setStep] = useState({
    _id: "",
    text: "",
    item: "",
    positions: [],
    image: {
      _id: null,
      imageData: "",
      mimeType: "",
      encoding: "",
    },
  });

  const [positions, setPositions] = useState({
    xStart: 0,
    zStart: 0,
    xEnd: 0,
    zEnd: 0,
  });
  const [isPositionsSaved, setIsPositionsSaved] = useState(false);

  const [imageID, setImageID] = useState(""); // imageID is stored here as this is a large file and we don't want to repeatedly call for in child components
  const [imageObj, setImageObj] = useState(step.image);

  const setNewImageID = (newImageID) => {
    setImageID(newImageID);
  };

  useEffect(() => {
    const getImage = async (newImageID) => {
      try {
        const { data } = await axios.get(`${baseAPIUrl}/images/${newImageID}`);
        if (data.image) {
          setImageObj(data.image);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    getImage(imageID);
  }, [imageID, baseAPIUrl]);

  //use effect when the imageObj updates, update the workInstruction
  useEffect(() => {
    setStep((prev) => {
      return { ...prev, image: imageObj };
    });
  }, [imageObj]);

  const [isEditing, setIsEditing] = useState(
    stepID === undefined || stepID === "create"
  ); // If there is no stepID, then we are automatically in Editing mode
  const getStep = async (url) => {
    try {
      const { data } = await axios.get(url);
      if (data.step) {
        setStep(data.step);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  // useEffect listens to isPositionsSaved, and if it changes, it will add the current positions object to the step and then reset it to zeros.
  useEffect(() => {
    if (isPositionsSaved) {
      const newStep = { ...step };
      newStep.positions.push(positions);
      setStep(newStep);
      setPositions({
        xStart: 0,
        zStart: 0,
        xEnd: 0,
        zEnd: 0,
      });
      setIsPositionsSaved(false);
    }
  }, [isPositionsSaved, positions, step]);

  const [itemName, setItemName] = useState("");

  // This function gets the item name from the item ID, and sets the itemName state to the name of the item.\

  useEffect(() => {
    const getItemNameFromID = async (itemID) => {
      try {
        const itemUrl = `${baseAPIUrl}/items/${itemID}`;
        const { data } = await axios.get(itemUrl);
        if (data.item) {
          setItemName(data.item.name);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    if (stepID !== undefined && stepID !== "create") {
      getItemNameFromID(step.item);
    }
  }, [baseAPIUrl, step.item, stepID]);

  const itemSelection = (item) => {
    step.item = item._id;
    setItemName(item.name);
    setShowItemPopover(false);
  };

  const handleSubmit = async () => {
    try {
      const existingUrl = `${baseAPIUrl}/steps/${stepID}?populate=false&imageData=true`;
      let body;
      if (step.image._id) {
        body = {
          text: step.text,
          item: step.item,
          positions: step.positions,
          image: step.image._id,
        };
      } else {
        body = {
          text: step.text,
          item: step.item,
          positions: step.positions,
        };
      }
      if (stepID !== undefined && stepID !== "create") {
        const { data } = await axios.patch(existingUrl, body);
        if (data.step) {
          setStep(data.step);
          if (data.step.image) {
            setImageID(data.step.image._id);
          }
          setIsEditing(false);
        }
      } else {
        const newUrl = `${baseAPIUrl}/steps?populate=false&imageData=true`;
        const { data } = await axios.post(newUrl, body);
        if (data.step) {
          setStep(data.step);
          setIsEditing(false);
          setCurrentStepID(data.step._id); // only makes sense in the context of the work instruction editor
          // TODO: If we want to add the step to the work instruction, we can do that here.
          // Just pass in the props for the stepIDs, and then add the step to the array.
          setImageID("");
        }
      }
    } catch (error) {
      console.log(
        "todo: display error message in the UI, not just in the console log"
      );
      console.log(error);
    }
  };

  // If a close is clicked on a position, the position is removed from the object.
  const handlePositionClose = (index) => {
    const newPositions = step.positions.filter((position, i) => {
      return i !== index;
    });
    setStep({ ...step, positions: newPositions });
  };

  useEffect(() => {
    if (stepID !== undefined && stepID !== "create") {
      setIsEditing(false);
      getStep(url);
    }
    // If the ID has changed TO create, then we want to set the step to a blank object, and set isEditing to true. This basically only happens if we already had another step loaded and hte user clicked "create new step".
    else if (stepID === "create") {
      setIsEditing(true);
      setStep({
        _id: "",
        text: "",
        item: "",
        positions: [],
        image: {
          _id: null,
          imageData: "",
          mimeType: "",
          encoding: "",
        },
      });
      setPositions({
        xStart: 0,
        zStart: 0,
        xEnd: 0,
        zEnd: 0,
      });
    }
  }, [url, stepID]);

  const [showItemPopover, setShowItemPopover] = useState(false);

  const itemPopover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Item Selector</Popover.Header>
      <Popover.Body>
        <AllItemList selection={itemSelection} />
      </Popover.Body>
    </Popover>
  );

  const [showPositionPopover, setShowPositionPopover] = useState(false);
  const positionPopover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Position Selector</Popover.Header>
      <Popover.Body>
        <PositionEditor
          image={baseImage}
          positions={positions}
          setExternalPositions={setPositions}
          setIsPositionsSaved={setIsPositionsSaved}
          setShowPositionPopover={setShowPositionPopover}
        />
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      {isEditing ? (
        <Card className={"card my-2"}>
          <Card.Header as="h3">Step Editor</Card.Header>
          <Card.Body>
            <Card.Title>Text</Card.Title>
            <Form>
              <Form.Group controlId="formBasicText">
                <Form.Control
                  type="text"
                  placeholder="Enter text"
                  value={step.text}
                  onChange={(e) => {
                    setStep({ ...step, text: e.target.value });
                  }}
                />
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Body>
            <Card.Title>Item</Card.Title>
            <OverlayTrigger
              show={showItemPopover}
              placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={itemPopover}
            >
              <Button
                variant="secondary"
                onClick={() => {
                  setShowItemPopover(!showItemPopover);
                }}
              >
                {step.item !== "" ? itemName : "Select Item"}
              </Button>
            </OverlayTrigger>
          </Card.Body>
          <Card.Body>
            <Card.Title>Positions</Card.Title>
            <ListGroup className="list-group-flush">
              {step.positions.map((position, index) => {
                return (
                  <ListGroup.Item key={index}>
                    <Card.Text>
                      <strong>xStart:</strong> {position.xStart}{" "}
                      <strong>zStart:</strong> {position.zStart}
                    </Card.Text>
                    <Card.Text>
                      <strong>xEnd:</strong> {position.zEnd}{" "}
                      <strong>zEnd:</strong> {position.zEnd}
                    </Card.Text>
                    <CloseButton onClick={() => handlePositionClose(index)} />
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
            <OverlayTrigger
              show={showPositionPopover}
              trigger="click"
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={positionPopover}
            >
              <Button
                variant="secondary"
                onClick={() => {
                  setShowPositionPopover(!showPositionPopover);
                }}
              >
                Add New Position
              </Button>
            </OverlayTrigger>
          </Card.Body>
          <Card.Body>
            <Card.Title>Image</Card.Title>
            <ImageCard
              baseImage={step.image}
              setImageID={setNewImageID}
              title={""}
              button={"Step Image"}
            />
          </Card.Body>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              handleSubmit();
            }}
          >
            Save
          </Button>
        </Card>
      ) : (
        <Card className={"card my-2"}>
          <Card.Header as="h3">Step</Card.Header>
          <Card.Body>
            <Card.Title>Text</Card.Title>
            <Card.Text>{step.text}</Card.Text>
          </Card.Body>
          <Card.Body>
            <Card.Title>Item</Card.Title>
            <Card.Text>{itemName}</Card.Text>
          </Card.Body>
          <Card.Body>
            <Card.Title>Positions</Card.Title>
            <ListGroup className="list-group-flush">
              {step.positions.map((position, index) => {
                return (
                  <ListGroup.Item key={index}>
                    <Card.Text>
                      <strong>xStart:</strong> {position.xStart}{" "}
                      <strong>zStart:</strong> {position.zStart}
                    </Card.Text>
                    <Card.Text>
                      <strong>xEnd:</strong> {position.zEnd}{" "}
                      <strong>zEnd:</strong> {position.zEnd}
                    </Card.Text>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card.Body>
          <Card.Body>
            <Card.Title>Image</Card.Title>
            <DisplayImage baseImage={step.image} />
          </Card.Body>

          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </Button>
        </Card>
      )}
    </>
  );
};
export default StepCard;
