import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import StepCard from "./StepCard";
import "../styles/ListGroup.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const WIStepList = ({ selection, stepIDs, setStepIDs, baseImage }) => {
  // 24 characters in UUID by default

  const origLength = stepIDs.length > 0 ? stepIDs[0].length : 24;
  const [uniqueStepIDs, setUniqueStepIDs] = useState([]);
  // set the uniqueStepIDs to the stepIDs array with the index appended to the end
  useEffect(() => {
    setUniqueStepIDs(
      // append the index to the end of the stepID to make it unique
      stepIDs.map((stepID, index) => {
        return stepID + index;
      })
    );
  }, [stepIDs]);
  return (
    <DragDropContext
      onDragEnd={(result) => {
        const { destination, source, draggableId } = result;
        if (!destination) {
          return;
        }
        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return;
        }

        // Reorder the uniqueStepIDs array to match the new order
        const newUniqueStepOrder = Array.from(uniqueStepIDs);
        newUniqueStepOrder.splice(source.index, 1);
        newUniqueStepOrder.splice(destination.index, 0, draggableId);
        // for every item in the unique step ids array, remove the index from the end of the string. Store each result in a new array
        const newStepOrder = newUniqueStepOrder.map((stepID) => {
          // Keep the first origLength characters of the string
          return stepID.slice(0, origLength);
        });
        setStepIDs(newStepOrder);
      }}
    >
      <div>
        <Droppable droppableId={"droppable"}>
          {(provided, snapshot) => (
            <Accordion ref={provided.innerRef} {...provided.droppableProps}>
              {stepIDs.map((stepID, index) => {
                return (
                  <Draggable key={stepID} draggableId={stepID} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Accordion.Item eventKey={index}>
                          <Accordion.Header>{stepID}</Accordion.Header>
                          <Accordion.Body>
                            <StepCard stepID={stepID} baseImage={baseImage} />
                          </Accordion.Body>
                        </Accordion.Item>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </Accordion>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default WIStepList;
