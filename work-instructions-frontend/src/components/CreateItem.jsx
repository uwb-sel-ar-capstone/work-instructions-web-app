import { useState } from "react";
import { useGlobalContext } from "../context";

const CreateItem = () => {
  const { baseAPIUrl } = useGlobalContext();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [__v, set__v] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${baseAPIUrl}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, __v }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Item ID:
        <input type="text" value={id} onChange={(event) => setId(event.target.value)} />
      </label>
      <label>
        Item name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        Item __v:
        <input type="number" value={__v} onChange={(event) => set__v(event.target.value)} />
      </label>
      <button type="submit">Create Item</button>
    </form>
  );
};

export default CreateItem;
