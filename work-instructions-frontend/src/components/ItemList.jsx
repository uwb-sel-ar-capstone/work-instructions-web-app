import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import { Accordion, Button, Modal } from "react-bootstrap";
import CreateItem from "./CreateItem";

const ItemList = () => {
  const { baseAPIUrl } = useGlobalContext(); // get the baseAPIUrl from the global context
  const [items, setItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseAPIUrl}/items`);
        const data = await response.json();
        setItems(data.items); // set only the items array from the response
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [baseAPIUrl]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${baseAPIUrl}/items/${deleteItemId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data); // handle the response as needed

      // Fetch the updated list of items and update the state
      const updatedResponse = await fetch(`${baseAPIUrl}/items`);
      const updatedData = await updatedResponse.json();
      setItems(updatedData.items);

      // Close the delete modal
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteModalShow = (itemId) => {
    setShowDeleteModal(true);
    setDeleteItemId(itemId);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setDeleteItemId(null);
  };

  const handleCreateItem = (newItem) => {
    // Update the state with the newly created item
    setItems(prevItems => [...prevItems, newItem]);
  };

  return (
    <div>
      <h2>Items</h2>
      <Accordion>
        {items.map((item) => (
          <Accordion.Item key={item._id} eventKey={item._id}>
            <Accordion.Header>{item.name}</Accordion.Header>
            <Accordion.Body>
              <p>ID: {item._id}</p>
              <p>V: {item.__v}</p>
              <Button
                variant="danger"
                onClick={() => handleDeleteModalShow(item._id)}
              >
                Delete
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        ))}
        <Accordion.Item eventKey="create">
          <Accordion.Body>
            <CreateItem setItems={handleCreateItem} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ItemList;