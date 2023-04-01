import { useState } from "react";
import { useGlobalContext } from "../context";
import ItemList from "./ItemList";

const CreateItem = () => {
  const { baseAPIUrl } = useGlobalContext();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [v, setV] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${baseAPIUrl}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, __v: v }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>
        ID:
        <input type="text" value={id} onChange={(event) => setId(event.target.value)} />
      </label>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        __v:
        <input type="text" value={v} onChange={(event) => setV(event.target.value)} />
      </label>
      <button type="submit">Create Item</button>
    </form>
    <h2>Item List</h2>
    <ItemList />
  </div>


  );
};

export default CreateItem;
