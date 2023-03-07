import StepCard from "./StepCard";
<<<<<<< HEAD
import "./styles.css"

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

=======
>>>>>>> Added Connection to API
import { useState, useEffect } from 'react';

const StepList = ({ workInstructionID }) => {
  const [steps, setSteps] = useState([]);
<<<<<<< HEAD
=======
  const [currentStep, setCurrentStep] = useState(0);
>>>>>>> Added Connection to API

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/steps?workInstructionID=${workInstructionID}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setSteps(data.steps);
      })
      .catch(err => console.log(err));
  }, [workInstructionID]);

<<<<<<< HEAD
  
  return (
    <div className="stepList">
      <h5 className="heading">Title: <b>Step List</b></h5>
      <div className="stepDisplayBox">
      <div className = "buttonStyle">
      {steps.map((step) => {
                return  <div className = "buttonStyle">
                  <Accordion>
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      expandIcon={<ExpandMoreIcon/>}
                    >
                      <Typography>{step.text}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <StepCard step={step} />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              })}
          </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default StepList;
=======
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  }

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  }

  const step = steps[currentStep] || {};

  return (
    <>
      <StepCard step={step} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {currentStep > 0 && (
          <button onClick={handlePreviousStep}>Previous Step</button>
        )}
        {currentStep < steps.length - 1 && (
          <button onClick={handleNextStep}>Next Step</button>
        )}
      </div>
    </>
  );
};

export default StepList;
>>>>>>> Added Connection to API
=======
export default StepList;
>>>>>>> Attemp Integration between StepCard and StepList
