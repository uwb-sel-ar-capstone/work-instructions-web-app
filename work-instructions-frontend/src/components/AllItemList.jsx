import { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";

const AllItemList = ({ selection }) => {
  const { baseAPIUrl } = useGlobalContext();
  const [items, setItems] = useState([]);
  const url = `${baseAPIUrl}/items`;

  const getItems = async (url) => {
    try {
      const { data } = await axios.get(url);
      if (data.items) {
        setItems(data.items);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getItems(url);
  }, [url]);

  return (
    <ListGroup>
      {items.map((item) => {
        return (
          <ListGroup.Item
            action
            max-height={"200px"}
            key={item._id}
            onClick={() => {
              selection(item);
            }}
          >
            {item.name}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default AllItemList;
