import { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/ListGroup.css";
import Card from "react-bootstrap/Card";

const AllImageList = ({ selection }) => {
  const { baseAPIUrl } = useGlobalContext();
  const [images, setImages] = useState([]);
  const url = `${baseAPIUrl}/images`;

  const getImages = async (url) => {
    try {
      const { data } = await axios.get(url);
      if (data.images) {
        setImages(data.images);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getImages(url);
  }, [url]);

  return (
    <ListGroup>
      {images.map((image) => {
        let imageData = `data:${image.mimeType};charset=utf-8;${image.encoding},${image.imageData}`;
        return (
          <ListGroup.Item
            action
            key={image._id}
            onClick={() => {
              selection(image);
            }}
          >
            <Card>
              <Card.Img variant="top" src={imageData} alt={image._id} />{" "}
            </Card>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default AllImageList;
