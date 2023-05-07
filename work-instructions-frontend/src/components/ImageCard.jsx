import { Card } from "react-bootstrap";
import "../styles/Card.css";
import { Button } from "react-bootstrap";
import AllImageList from "./AllImageList";
import { useState } from "react";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import ImageUploader from "./ImageUploader";
import PopoverHeader from "./PopoverHeader";
// import StepCard from "./StepCard";

const ImageCard = ({ baseImage, setImageID, title, button }) => {
  let imageData = null;
  if (baseImage) {
    imageData = `data:${baseImage.mimeType};charset=utf-8;${baseImage.encoding},${baseImage.imageData}`;
  }
  const [showSelectImagePopover, setSelectImagePopover] = useState(false);
  const [showUploadImagePopover, setUploadImagePopover] = useState(false);
  const imageSelection = (image) => {
    setImageID(image._id);
    setSelectImagePopover(false);
  };

  const uploadImagePopover = (
    <Popover id="popover-basic" style={{ minWidth: "25rem" }}>
      <Popover.Header>
        <PopoverHeader
          title="Upload Image"
          onClose={() => setUploadImagePopover(false)}
        />
      </Popover.Header>
      <Popover.Body>
        <ImageUploader
          setFalse={[setUploadImagePopover, setSelectImagePopover]}
        />
      </Popover.Body>
    </Popover>
  );

  const selectImagePopover = (
    <Popover id="popover-basic">
      <Popover.Header>
        <PopoverHeader
          title="Image Selector"
          onClose={() => setSelectImagePopover(false)}
        />
      </Popover.Header>
      <Popover.Body>
        <AllImageList selection={imageSelection} />
        <OverlayTrigger
          show={showUploadImagePopover}
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={uploadImagePopover}
        >
          <Button
            variant="secondary"
            // need to set stepID to create to force the StepCard to create a new step (creation mode by default)
            onClick={() => {
              // potentially set the image id here?
              setUploadImagePopover(true);
            }}
          >
            Upload New Image
          </Button>
        </OverlayTrigger>
      </Popover.Body>
    </Popover>
  );
  return (
    <Card className={"card my-2"}>
      <Card.Header as="h3">{title}</Card.Header>
      <Card.Body>
        {baseImage ? (
          <Card.Img variant="top" src={imageData} alt={baseImage._id} />
        ) : (
          <>{console.log(baseImage)}</>
        )}

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
            Change {button}
          </Button>
        </OverlayTrigger>
      </Card.Body>
    </Card>
  );
};

export default ImageCard;
