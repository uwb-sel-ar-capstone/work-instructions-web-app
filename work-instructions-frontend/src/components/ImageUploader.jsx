import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useGlobalContext } from "../context";
import axios from "axios";
import "../styles/Image.css";

const ImageUploader = () => {
  const { baseAPIUrl } = useGlobalContext();
  const [imageURL, setImageURL] = useState("");
  // This is only for the new image file, we dont want to display this on the site
  const [imageFile, setImageFile] = useState(null);

  const [fileName, setFileName] = useState("No File Selected...");

  const handleChange = (e) => {
    // const key = e.target.name;
    // const value = e.target.value;
    const files = Array.from(e.target.files);
    setImageFile(files[0]);
    setFileName(files[0].name);
    setImageURL(URL.createObjectURL(files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imageFile) {
      return;
    }
    uploadImage(imageFile).then((response) => {
      console.log(response.status);
      if (response.status === 201) {
        alert("Image Uploaded Successfully!");
        // clear state
        setImageFile(null);
        setFileName("No File Selected...");
        setImageURL("");
      } else {
        alert("Image failed to upload");
        console.log(response);
      }
    });
  };

  const uploadImage = (image) => {
    const url = `${baseAPIUrl}/images/`;
    const formData = new FormData();
    formData.append("image", image);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  };

  return (
    <div id="bootstrap-overrides">
      <Card
        className="my-2"
        style={{ width: "24rem", backgroundColor: "rgba(17, 11, 17, 1)" }}
      >
        <Card.Img variant="top" src={imageURL} alt={fileName} />
        <Card.Body>
          <Card.Title>{`File Name: ${fileName}`}</Card.Title>

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
export default ImageUploader;
