import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

<<<<<<< HEAD
<<<<<<< HEAD
const StepCard = ({ step }) => {
  const { _id, text, item, positions } = step || {};

  return (
    <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Text style={{ color: 'black', textAlign: 'center' }}>
            Componet: {item ? item.name : 'Work Instruction Step Text'}
          </Card.Text>
        </Card.Body>
        
        <ListGroup className='list-group-flush'>
          {positions && positions.map((position, index) => (
            <ListGroup.Item key={index}>
              Start postion: ({position.xStart}, {position.zStart})
              <br/>
              End postion: ({position.xEnd}, {position.zEnd})

            </ListGroup.Item>
          ))}
        </ListGroup>
        <Card.Body style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
          <Button variant='outline-primary'>Add New Position</Button>
        </Card.Body>
      </Card>
    </div>
=======
=======
const StepCard = ({ step }) => {
  const { _id, text, item, positions } = step || {};
>>>>>>> Added Connection to API

  return (
<<<<<<< HEAD
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
>>>>>>> Added Basic Step Card
  );
};

export default StepCard;

<<<<<<< HEAD
=======
=======
    <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title style={{ color: 'black', textAlign: 'center' }}>
            Step ID: {_id || 'Step Name'}
            <br />
            Step Text: {text || 'Step Name'}
          </Card.Title>
          <Card.Text style={{ color: 'black', textAlign: 'center' }}>
            Componet: {item ? item.name : 'Work Instruction Step Text'}
          </Card.Text>
        </Card.Body>
        
        <ListGroup className='list-group-flush'>
          {positions && positions.map((position, index) => (
            <ListGroup.Item key={index}>
              Start postion: ({position.xStart}, {position.zStart})
              <br/>
              End postion: ({position.xEnd}, {position.zEnd})
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Card.Body style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
          <Button variant='outline-primary'>Add New Position</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

<<<<<<< HEAD
export default StepCard;
>>>>>>> Added Connection to API

>>>>>>> Added Basic Step Card
=======
export default StepCard;
>>>>>>> Attemp Integration between StepCard and StepList
