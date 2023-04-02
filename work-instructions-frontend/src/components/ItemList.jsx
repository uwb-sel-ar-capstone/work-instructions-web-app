import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import { Accordion } from "react-bootstrap";
import CreateItem from "./CreateItem";

const ItemList = () => {
  const { baseAPIUrl } = useGlobalContext(); // get the baseAPIUrl from the global context
  const [items, setItems] = useState([]);

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
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      <CreateItem />
    </div>
  );
};

export default ItemList;

