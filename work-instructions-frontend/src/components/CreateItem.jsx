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
        <Form.Label style={{fontSize: "25px"}}>Item Name:</Form.Label>
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} style={{ width: "25%" }} />
        <Button type="submit" style={{height: "30px", lineHeight: "15px", fontSize: "15px"}}>Create Item</Button>
      </Form.Group>
    </Form>
  );
};

export default CreateItem;
