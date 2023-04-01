import React, { useState, useEffect } from "react";
import { baseAPIUrl } from "../constants";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${baseAPIUrl}/items`);
        const data = await response.json();
        setItems(data.items);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Item List</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <p>{item.name}</p>
            <p>ID: {item._id}</p>
            <p>V: {item.__v}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
