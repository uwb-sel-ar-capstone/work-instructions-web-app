import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/ListGroup.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import CloseButton from "react-bootstrap/CloseButton";

const WIStepList = ({
  stepIDs,
  setStepIDs,
  currentStepID,
  setCurrentStepID,
}) => {
  // 24 characters in UUID by default. Will break if UUIDs are not 24 characters in length.

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

  const TextWrapper = ({ text, onClick }) => {
    return (
      <div onClick={onClick} className="text-wrapper">
        {text}
      </div>
    );
  };

  const handleDelete = (uniqueStepID, index) => {
    // splice the step at index from the stepIDs array
    const newStepIDs = [...stepIDs];
    newStepIDs.splice(index, 1);
    setStepIDs(newStepIDs);

    // if there are no more steps, set the currentStepID to an empty string
    if (newStepIDs.length === 0) {
      setCurrentStepID("");
      return;
    }
    let newIndex = index - 1;
    if (newIndex < 0) {
      newIndex = 0;
    }
    const newID = newStepIDs[newIndex];
    setCurrentStepID(newID);
  };

  const getOrigStepID = (uniqueStepID) => {
    return uniqueStepID.slice(0, origLength);
  };

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
        const newStepOrder = newUniqueStepOrder.map((uniqueID) => {
          // Keep the first origLength characters of the string
          return getOrigStepID(uniqueID);
        });
        setStepIDs(newStepOrder);
      }}
    >
      <div>
        <Droppable droppableId={"droppable"}>
          {(provided, snapshot) => (
            <ListGroup ref={provided.innerRef} {...provided.droppableProps}>
              {uniqueStepIDs.map((stepID, index) => {
                const active = {
                  active: getOrigStepID(stepID) === currentStepID,
                };
                return (
                  <Draggable key={stepID} draggableId={stepID} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ListGroup.Item
                          as="li"
                          eventKey={index}
                          style={{ display: "flex" }}
                          {...active}
                        >
                          <TextWrapper
                            text={stepID}
                            onClick={() => {
                              const origStepID = getOrigStepID(stepID);
                              setCurrentStepID(origStepID);
                            }}
                          />
                          <CloseButton
                            onClick={() => {
                              handleDelete(stepID, index);
                            }}
                          />
                        </ListGroup.Item>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ListGroup>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default WIStepList;
