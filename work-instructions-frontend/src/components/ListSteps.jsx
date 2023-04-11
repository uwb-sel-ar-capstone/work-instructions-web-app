import { Button } from '@mui/material';
import { useState, useEffect } from 'react';

const ListSteps = ({}) => {
    const [steps, setSteps] = useState([]);

    useEffect(() => {
    fetch(`http://localhost:5000/api/v1/steps`)
      .then(res => res.json())
      .then(data => {
        setSteps(data.steps);
      })
      .catch(err => console.log(err));
    });

    return (
        <div className="List">
          <h5 className="heading">Title: <b> List of Steps</b></h5>
          <div className="itemDisplayBox">
            <div className = "buttonStyle">
                {steps.map((step) => {
                    return  <div className = "buttonStyle">
                      <Button variant="contained"
                        onClick={() => {
                            console.log("clicked");
                        }}
                      >{step.text}</Button>
                    </div>
                })}
            </div>
          </div>
        </div>
      );
};

export default ListSteps;