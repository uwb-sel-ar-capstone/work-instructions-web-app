import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const StepCard = ({ step }) => {
  const { _id, text, item, positions } = step || {};

  return (
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

export default StepCard;

