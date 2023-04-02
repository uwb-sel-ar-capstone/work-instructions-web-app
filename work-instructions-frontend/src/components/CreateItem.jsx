import { useState } from "react";

const CreateItem = ({ setItems }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/v1/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name}),
      });
      const data = await response.json();
      console.log(data);
      // fetch the updated list of items and update the state
      const updatedResponse = await fetch("http://localhost:5000/api/v1/items");
      const updatedData = await updatedResponse.json();
      setItems(updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <button type="submit">Create Item</button>
    </form>
  );
};

export default CreateItem;
