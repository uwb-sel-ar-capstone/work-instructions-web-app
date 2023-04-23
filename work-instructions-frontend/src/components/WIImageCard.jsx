import { Card } from "react-bootstrap";
import "../styles/Card.css";
import { Button } from "react-bootstrap";
import AllImageList from "./AllImageList";
import { useState } from "react";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import StepCard from "./StepCard";

const WIStepsCard = ({ baseImage, setImageID }) => {
  let imageData = null;
  if (baseImage) {
    imageData = `data:${baseImage.mimeType};charset=utf-8;${baseImage.encoding},${baseImage.imageData}`;
  }
  const [showSelectImagePopover, setSelectImagePopover] = useState(false);
  const imageSelection = (image) => {
    setImageID(image._id);
    setSelectImagePopover(false);
  };

  const selectImagePopover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Image Selector</Popover.Header>
      <Popover.Body>
        <AllImageList selection={imageSelection} />
        <Button
          variant="secondary"
          // need to set stepID to create to force the StepCard to create a new step (creation mode by default)
          onClick={() => {
            // potentially set the image id here?
            setSelectImagePopover(false); // close it so it "redirects" the user's attention (hopefully)
          }}
        >
          Upload New Image
        </Button>
      </Popover.Body>
    </Popover>
  );
  return (
    <Card className={"card my-2"}>
      <Card.Header as="h3">Base Image</Card.Header>
      <Card.Body>
        <Card.Img variant="top" src={imageData} alt={baseImage._id} />
        <OverlayTrigger
          show={showSelectImagePopover}
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={selectImagePopover}
        >
          <Button
            variant="secondary"
            onClick={() => {
              setSelectImagePopover(!showSelectImagePopover);
              //   if (!showStepPopover) {
              //     setShowCreateStepPopover(false);
              //   }
            }}
          >
            Change Base Image
          </Button>
        </OverlayTrigger>
      </Card.Body>
    </Card>
  );
};

export default WIStepsCard;
