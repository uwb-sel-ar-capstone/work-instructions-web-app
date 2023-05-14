import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "../styles/Card.css";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import RectImage from "./RectImage";

/**
 * positions should be object with {xStart:, zStart:, xEnd:, zEnd:}
 */

const PositionEditor = ({
  image,
  externalPositions,
  setExternalPositions,
  setIsPositionsSaved,
  setShowPositionPopover,
  otherPositionsInStep, // array of positions in the step that are for the current position
}) => {
  let imageData = null;
  if (image) {
    imageData = `data:${image.mimeType};charset=utf-8;${image.encoding},${image.imageData}`;
    let imageObj = new Image();
    imageObj.onload = () => {
      setXDimension(imageObj.naturalWidth);
      setYDimension(imageObj.naturalHeight);
    };
    imageObj.src = imageData;
  }

  const [showingTextPositionSelector, setShowingTextPositionSelector] =
    useState(true);
  // Stateful variables for position data
  const [isStartPosition, setIsStartPosition] = useState(true); // will alternate between start and end positions
  const [xDimension, setXDimension] = useState(1);
  const [yDimension, setYDimension] = useState(1);
  const [positions, setPositions] = useState({
    xStart: 0,
    zStart: 0,
    xEnd: 0,
    zEnd: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setExternalPositions(positions);
    setIsPositionsSaved(true);
    setShowPositionPopover(false);
  };

  const getPositions = (event) => {
    if (showingTextPositionSelector) return;
    const target = event.target;
    // dimension = DOMRect object relevant to the clicked image
    const dimension = target.getBoundingClientRect();

    // gets the 0-1 scaled coords of the user click
    let x = (event.clientX - dimension.left) / dimension.width;
    let y = (event.clientY - dimension.top) / dimension.height;
    // Alternates between setting start and end positions
    if (isStartPosition) {
      setPositions({ xStart: x, zStart: y, xEnd: 0, zEnd: 0 }); // Zero out to match the behavior of the rectangle highlights.
      setIsStartPosition(false);
    } else {
      setPositions({ ...positions, xEnd: x, zEnd: y });
      setIsStartPosition(true);
    }
  };

  return (
    <div id="bootstrap-overrides">
      <Card className="card my-2">
        {image ? (
          <RectImage
            src={imageData}
            alt={image.name}
            xStart={positions.xStart}
            yStart={positions.zStart}
            xEnd={positions.xEnd}
            yEnd={positions.zEnd}
            xDimension={xDimension}
            yDimension={yDimension}
            getPositions={getPositions}
            isStartPosition={isStartPosition}
            otherPositionsInStep={otherPositionsInStep}
          />
        ) : (
          <></>
        )}
        <ToggleButtonGroup
          name="positionSelectorType"
          type="radio"
          defaultValue={1}
          onChange={(val) => {
            setShowingTextPositionSelector(val === 1);
          }}
        >
          <ToggleButton id="tbg-btn-text" value={1}>
            Text
          </ToggleButton>
          <ToggleButton id="tbg-btn-image" value={2}>
            Image
          </ToggleButton>
        </ToggleButtonGroup>

        <Card.Body>
          <Card.Title>{`Image ID: ${image ? image._id : "no id"}`}</Card.Title>
          <Card.Text className="position text">Current Position Data</Card.Text>
          {showingTextPositionSelector ? (
            <Card.Body className="position card-body">
              <Form>
                <Form.Group className="mb-3" controlId="formXStart">
                  <Form.Label>X Start</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter X Start"
                    value={positions.xStart}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        e.target.value = 0;
                      } else if (e.target.value > 1) {
                        e.target.value = 1;
                      }
                      setPositions({
                        ...positions,
                        xStart: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formZStart">
                  <Form.Label>Z Start</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Z Start"
                    value={positions.zStart}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        e.target.value = 0;
                      } else if (e.target.value > 1) {
                        e.target.value = 1;
                      }
                      setPositions({
                        ...positions,
                        zStart: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formXEnd">
                  <Form.Label>X End</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter X End"
                    value={positions.xEnd}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        e.target.value = 0;
                      } else if (e.target.value > 1) {
                        e.target.value = 1;
                      }
                      setPositions({
                        ...positions,
                        xEnd: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formZEnd">
                  <Form.Label>Z End</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Z End"
                    value={positions.zEnd}
                    min="0"
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        e.target.value = 0;
                      } else if (e.target.value > 1) {
                        e.target.value = 1;
                      }
                      setPositions({
                        ...positions,
                        zEnd: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          ) : (
            <Card.Body>
              <Card.Text>{`X Start: ${positions.xStart}`}</Card.Text>
              <Card.Text>{`Z Start: ${positions.zStart}`}</Card.Text>
              <Card.Text>{`X End: ${positions.xEnd}`}</Card.Text>
              <Card.Text>{`Z End: ${positions.zEnd}`}</Card.Text>
            </Card.Body>
          )}
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
export default PositionEditor;
