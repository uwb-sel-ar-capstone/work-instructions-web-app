import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import createNavigateToEditor from "../helpers/NavigateToEditor";
import { useNavigate } from "react-router-dom";

const WorkInstructionCard = ({ workInstruction, deleteWI }) => {
  const imageData = `data:${workInstruction.image.mimeType};charset=utf-8;${workInstruction.image.encoding},${workInstruction.image.imageData}`;
  const navigateToEditor = createNavigateToEditor(
    useNavigate(),
    workInstruction._id
  );
  return (
    <Card
      style={{ width: "24rem", backgroundColor: "rgba(17, 11, 17, 1)" }}
      key={workInstruction._id}
      className="my-2"
    >
      <Card.Img
        className="main-card-list "
        variant="top"
        src={imageData}
        alt={workInstruction._id}
      />
      <Card.Body>
        <Card.Title>{workInstruction.name}</Card.Title>
        <Card.Text>{workInstruction._id}</Card.Text>
        <div className="d-flex justify-content-between">
          <Button onClick={navigateToEditor} variant="light">
            Edit WI
          </Button>
          <Button onClick={deleteWI} variant="danger">
            Delete WI
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
export default WorkInstructionCard;
