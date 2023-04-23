import { Card } from "react-bootstrap";
import "../styles/Card.css";
// import StepCard from "./StepCard";

const ImageCard = ({ baseImage }) => {
  let imageData = null;
  if (baseImage) {
    imageData = `data:${baseImage.mimeType};charset=utf-8;${baseImage.encoding},${baseImage.imageData}`;
  }

  return (
    <>
      {" "}
      {baseImage ? (
        <Card.Img variant="top" src={imageData} alt={baseImage._id} />
      ) : (
        <Card.Text>No Image</Card.Text>
      )}
    </>
  );
};

export default ImageCard;
