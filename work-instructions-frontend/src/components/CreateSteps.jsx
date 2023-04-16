import { useState } from "react";
import { useGlobalContext } from "../context";
import { Form, Button } from "react-bootstrap";

const defaultPositions = [
  {
    xStart: 0.14,
    zStart: 0.16,
    xEnd: 0.27,
    zEnd: 0.35,
  },
  {
    xStart: 0.24,
    zStart: 0.13,
    xEnd: 0.28,
    zEnd: 0.27,
  },
];

const CreateSteps = ({ setSteps, items }) => {
  const { baseAPIUrl } = useGlobalContext(); // get the baseAPIUrl from the global context
  const [text, setText] = useState("");
  const [itemId, setItemId] = useState("");
  const [positions, setPositions] = useState([{ xStart: 0, zStart: 0, xEnd: 10, zEnd: 10 }]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${baseAPIUrl}/steps`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, positions: defaultPositions, item: itemId }),
      });
      const data = await response.json();
      console.log(data); // handle the response as needed
      setSteps((prevSteps) => [...prevSteps, data.step]);
      setText("");
      setItemId("");
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  
  const handleItemIdChange = (event) => {
    setItemId(event.target.value);
  };

  const handlePositionChange = (event, index) => {
    const { name, value } = event.target;
    setPositions(prevPositions => {
      const updatedPositions = [...prevPositions];
      updatedPositions[index][name] = parseFloat(value);
      return updatedPositions;
    });
  };
  
  return (
    
  <Form onSubmit={handleSubmit}>
    <h3>Create Step:</h3>
    <Form.Group controlId="text">
      <Form.Label>Text:</Form.Label>
      <Form.Control type="text" value={text} onChange={handleTextChange} />
    </Form.Group>

    <Form.Group controlId="itemId">
      <Form.Label>Item id (Choose id from list below):</Form.Label>
      <Form.Control
        type="text"
        value={itemId}
        onChange={handleItemIdChange}
      />
    </Form.Group>

    {positions.map((position, index) => (
      <div key={index}>
        <Form.Group controlId={`xStart-${index}`}>
        <Form.Label>Position X Start Temp:</Form.Label>
          <Form.Control
          type="number"
          name="xStart"
          defaultValue={defaultPositions[0].xStart}
          onChange={(event) => handlePositionChange(event, 0)}
      />
          
        </Form.Group>
        <Form.Group controlId={`zStart-${index}`}>
          <Form.Label>Position Z Start Temp:</Form.Label>
          <Form.Control
            type="number"
            name="zStart"
            defaultValue={defaultPositions[0].zStart}
            onChange={(event) => handlePositionChange(event, index)}
          />

        </Form.Group>
        <Form.Group controlId={`xEnd-${index}`}>
          <Form.Label>Position X End Temp:</Form.Label>
          <Form.Control
            type="number"
            name="xEnd"
            defaultValue={defaultPositions[0].xEnd}
            onChange={(event) => handlePositionChange(event, index)}
          />
        </Form.Group>

        <Form.Group controlId={`zEnd-${index}`}>
          <Form.Label>Position Z End Temp :</Form.Label>
          <Form.Control
            type="number"         
            name="zEnd"
            defaultValue={defaultPositions[0].zEnd}
            onChange={(event) => handlePositionChange(event, index)}
          />
        </Form.Group>

        <br/ >
        <Button variant="primary" type="submit">
          Create Step
        </Button>

        <hr />
      </div>
    ))}
    
    
  </Form>
);
  
};

export default CreateSteps;