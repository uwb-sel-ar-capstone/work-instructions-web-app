import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';


const StepCard = ({ workInstructionID, positions }) => {
  return (
    <>
      <div style = {{margin : "auto" , display :"flex", 'justify-content' : "center"  }}> 

      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title style = {{color : "black", "textAlign" : "center"}}
        >Card Title, "Step Name"

        </Card.Title>
        <Card.Text style = {{color : "black", "textAlign" : "center"}}>
          Work Instruction Step Text
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>postions1</ListGroup.Item>
        <ListGroup.Item>postions2</ListGroup.Item>
        <ListGroup.Item>postions3</ListGroup.Item>
      </ListGroup>
      <Card.Body style = {{margin : "auto" , display :"flex", 'justify-content' : "center"  }}>
      <Button variant="outline-primary">Add New Postion</Button>{' '}
      </Card.Body>
    </Card>

      </div>
    </>
  );
};
export default StepCard;


