import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import { Button, Modal } from "react-bootstrap";
import CreateSteps from "./CreateSteps";

const ItemList = () => {
  const { baseAPIUrl } = useGlobalContext(); // get the baseAPIUrl from the global context
  const [steps, setSteps] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteStepId, setDeleteStepId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseAPIUrl}/steps`);
        const data = await response.json();
        setSteps(data.steps); // set only the steps array from the response
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [baseAPIUrl]);

  const handleDelete = async (stepId) => {
    try {
      const response = await fetch(`${baseAPIUrl}/steps/${stepId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data); // handle the response as needed

      // Fetch the updated list of steps and update the state
      const updatedResponse = await fetch(`${baseAPIUrl}/steps`);
      const updatedData = await updatedResponse.json();
      setSteps(updatedData.steps);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = (newStep) => {
    // Update the state with the newly created step
    setSteps((prevSteps) => [...prevSteps, newStep]);
  };

  return (
    <div>
      <h2>Steps</h2>
      <ul>
        {steps.map((step) => (
          <li key={step._id}>
            {step.name}{" "}
            <Button variant="danger" onClick={() => handleDelete(step._id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <Button onClick={() => setShowCreateModal(true)}>Create Step</Button>
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Step</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateSteps onCreate={handleCreate} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ItemList;
