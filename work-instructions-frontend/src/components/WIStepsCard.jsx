import WIStepList from "./WIStepList";
import { Card } from "react-bootstrap";
import "../styles/Card.css";
import { Button } from "react-bootstrap";
import AllStepList from "./AllStepList";
import { useState } from "react";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const WIStepsCard = ({
  stepIDs,
  setStepIDs,
  currentStepID,
  setCurrentStepID,
}) => {
  const stepSelection = (step) => {
    setStepIDs([...stepIDs, step._id]);
    setShowStepPopover(false);
  };

  const [showStepPopover, setShowStepPopover] = useState(false);

  const stepPopover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Step Selector</Popover.Header>
      <Popover.Body>
        <AllStepList selection={stepSelection} />
      </Popover.Body>
    </Popover>
  );
  return (
    <Card className={"card my-2"}>
      <Card.Header as="h3">Steps</Card.Header>
      <Card.Body>
        <WIStepList
          stepIDs={stepIDs}
          setStepIDs={setStepIDs}
          currentStepID={currentStepID}
          setCurrentStepID={setCurrentStepID}
        />

        <OverlayTrigger
          show={showStepPopover}
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={stepPopover}
        >
          <Button
            variant="secondary"
            onClick={() => {
              setShowStepPopover(!showStepPopover);
            }}
          >
            Add Step
          </Button>
        </OverlayTrigger>
      </Card.Body>
    </Card>
  );
};

export default WIStepsCard;
