import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useGlobalContext } from "../context";

const CreateItem = ({ setItems }) => {
  const [name, setName] = useState("");
  const { baseAPIUrl } = useGlobalContext(); // get the baseAPIUrl from the global context

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${baseAPIUrl}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      console.log(data);
      // Update the state with the newly created item
      setItems(prevItems => [...prevItems, data.item]);
      setName(""); // Clear the input field after successful item creation
      window.location.reload(); // Refresh the page to see the changes, *TEMP FIX*
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
      <h3>Item List</h3>
        <Form.Control
         type="text" 
         value={name} 
         onChange={(event) => setName(event.target.value)}/>
         <br/ >
         <Button variant="primary" type="submit">
          Create Item
        </Button>
        <hr/ >
      </Form.Group>
    </Form>


  );
};

export default CreateItem;
