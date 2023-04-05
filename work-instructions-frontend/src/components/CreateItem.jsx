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
        body: JSON.stringify({name}),
      });
      const data = await response.json();
      console.log(data);
      // fetch the updated list of items and update the state
      const updatedResponse = await fetch(`${baseAPIUrl}/items`);
      const updatedData = await updatedResponse.json();
      setItems(updatedData);
      window.location.reload(); // reload the page, temp fix to show the data instantly
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

