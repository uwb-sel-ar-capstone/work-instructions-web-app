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

const StepCard = ({ stepID, baseImage }) => {
  const { baseAPIUrl } = useGlobalContext();
  const url = `${baseAPIUrl}/steps/${stepID}?populate=true?imageData=true`;
  const [step, setStep] = useState({
    _id: "",
    text: "",
    item: "",
    positions: [],
    image: "",
  });

  const [positions, setPositions] = useState({
    xStart: 0,
    zStart: 0,
    xEnd: 0,
    zEnd: 0,
  });
  const [isPositionsSaved, setIsPositionsSaved] = useState(false);

  const [isEditing, setIsEditing] = useState(stepID === undefined); // If there is no stepID, then we are automatically in Editing mode
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

  // This function gets the item name from the item ID, and sets the itemName state to the name of the item.

  useEffect(() => {
    const getItemNameFromID = (itemID) => {
      try {
        const itemUrl = `${baseAPIUrl}/items/${itemID}`;
        const { data } = axios.get(itemUrl);
        if (data.item) {
          setItemName(data.item.name);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    if (stepID !== undefined) {
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
      if (stepID !== undefined) {
        const existingUrl = `${baseAPIUrl}/steps/${stepID}?populate=false&imageData=true`;
        const { data } = await axios.patch(existingUrl, step);
        if (data.step) {
          setStep(data.step);
          setIsEditing(false);
        }
      } else {
        const newUrl = `${baseAPIUrl}/steps?populate=false&imageData=true`;
        const { data } = await axios.post(newUrl, step);
        if (data.step) {
          setStep(data.step);
          setIsEditing(false);
        }
      }
    } catch (error) {
      console.log(
        "todo: display error message in the UI, not just in the console log"
      );
      console.log(error.response);
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
    if (stepID !== undefined) {
      setIsEditing(false);
      getStep(url);
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
