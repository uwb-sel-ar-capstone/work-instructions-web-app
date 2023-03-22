import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useGlobalContext } from "../context";
import axios from "axios";
import "../styles/Image.css";

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

  // Stateful variables for position data
  const [isStartPosition, setIsStartPosition] = useState(true); // will alternate between start and end positions
  const [positions, setPositions] = useState({
    xStart: null,
    zStart: null,
    xEnd: null,
    zEnd: null,
  });

  const getPositions = (event) => {
    const target = event.target;
    // dimension = DOMRect object relevant to the clicked image
    const dimension = target.getBoundingClientRect();
    // gets the 0-1 scaled coords of the user click
    let x = (event.clientX - dimension.left) / dimension.width;
    let y = (event.clientY - dimension.top) / dimension.height;
    // Alternates between setting start and end positions
    if (isStartPosition) {
      setPositions({ ...positions, xStart: x, zStart: y });
      setIsStartPosition(false);
    } else {
      setPositions({ ...positions, xEnd: x, zEnd: y });
      setIsStartPosition(true);
    }
  };

  return (
    <div id="bootstrap-overrides">
      <Card
        key={imageID}
        className="my-2"
        style={{ width: "24rem", backgroundColor: "rgba(17, 11, 17, 1)" }}
      >
        <Card.Img
          variant="top"
          src={imageData}
          alt={workInstruction.name}
          onClick={getPositions}
        />
        <Card.Body>
          <Card.Title>{`Image ID: ${imageID}`}</Card.Title>
          <Card.Text className="position text">Current Position Data</Card.Text>
          <Card.Body className="position card-body">
            <Card.Text className="text start">
              xStart: {positions.xStart}
            </Card.Text>
            <Card.Text className="text start">
              zStart: {positions.zStart}
            </Card.Text>
            <Card.Text className="text end">xEnd: {positions.xEnd}</Card.Text>
            <Card.Text className="text end">zEnd: {positions.zEnd}</Card.Text>
          </Card.Body>

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
    </div>
  );
};
export default Image;
