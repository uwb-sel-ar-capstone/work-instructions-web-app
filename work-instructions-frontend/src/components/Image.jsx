import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useGlobalContext } from "../context";
import axios from "axios";

const Image = ({
  workInstruction,
  workInstructionID,
  image,
  imageID,
  setImage,
  setImageID,
}) => {
  const { baseAPIUrl } = useGlobalContext();
  const imageData = `data:${image.mimeType};charset=utf-8;${image.encoding},${image.imageData}`;
  const doAlert = () => {
    return console.log("hi");
  };
  // This is only for the new image file, we dont want to display this on the site
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    // const key = e.target.name;
    // const value = e.target.value;
    const files = Array.from(e.target.files);
    setImageFile(files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imageFile) {
      return;
    }
    uploadImage(imageFile).then((response) => {
      setImage(response.data.image);
      //Id isnt changing, but its good practice to update it anyways.
      setImageID(response.data.image._id);
    });
  };

  const uploadImage = (image) => {
    const url = `${baseAPIUrl}/images/${imageID}`;
    const formData = new FormData();
    formData.append("image", image);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.patch(url, formData, config);
  };

  return (
    <Card
      key={imageID}
      className="my-2"
      style={{ width: "24rem", backgroundColor: "rgba(17, 11, 17, 1)" }}
    >
      <Card.Img variant="top" src={imageData} alt={workInstruction.name} />
      <Card.Body>
        <Card.Title>{`Image ID: ${imageID}`}</Card.Title>
        <Form onSubmit={handleSubmit} id="imageForm">
          <Form.Group className="mb-3" controlId="formBasicImage">
            <Form.Label>New Image Upload</Form.Label>
            <Form.Control
              type="file"
              accept=".jpg,.jpeg,.png"
              name="image"
              onChange={handleChange}
            />
            <Form.Text className="text-muted">Supported: JPG, PNG</Form.Text>
          </Form.Group>
          <Button type="submit" variant="light" form="imageForm">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default Image;
