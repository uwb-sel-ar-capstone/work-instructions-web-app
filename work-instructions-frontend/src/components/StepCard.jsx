import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const StepCard = ({ step }) => {
  const { _id, text, item, positions } = step || {};

  return (
    <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Text style={{ color: 'black', textAlign: 'center' }}>
            Component: {item ? item.name : 'Work Instruction Step Text'}
          </Card.Text>
        </Card.Body>

        <ListGroup className='list-group-flush'>
          {positions && positions.map((position) => (
            <ListGroup.Item key={position._id}>
              Start position: ({position.xStart}, {position.zStart})
              <br/>
              End position: ({position.xEnd}, {position.zEnd})
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
};

export default StepCard;