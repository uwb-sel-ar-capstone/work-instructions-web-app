import { useState } from "react";
import { useGlobalContext } from "../context";

const CreateSteps = ({ setSteps, items }) => {
  const { baseAPIUrl } = useGlobalContext(); // get the baseAPIUrl from the global context
  const [text, setText] = useState("");
  const [position, setPosition] = useState({ x: "", y: "" });
  const [itemId, setItemId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${baseAPIUrl}/steps`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, position, itemId }),
      });
      const data = await response.json();
      console.log(data); // handle the response as needed
      setSteps((prevSteps) => [...prevSteps, data.step]);
      setText("");
      setPosition({ x: "", y: "" });
      setItemId("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handlePositionChange = (event) => {
    const { name, value } = event.target;
    setPosition((prevPosition) => ({
      ...prevPosition,
      [name]: Number(value),
    }));
  };

  const handleItemIdChange = (event) => {
    setItemId(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
  <label>
    Text:
    <input type="text" value={text} onChange={handleTextChange} />
  </label>
  <br />
  <label>
    Position X:
    <input
      type="number"
      name="x"
      value={position.x}
      onChange={handlePositionChange}
    />
  </label>
  <br />
  <label>
    Position Y:
    <input
      type="number"
      name="y"
      value={position.y}
      onChange={handlePositionChange}
    />
  </label>
  <br />
  <label>
    Item:
    <select value={itemId} onChange={handleItemIdChange}>
      <option value="">Select an item</option>
      {items && items.map((item) => (
        <option key={item._id} value={item._id}>
          {item.name}
        </option>
      ))}
    </select>
  </label>
  <br />
  <button type="submit">Create Step</button>
</form>
  );
};

export default CreateSteps;
