import StepCard from "./StepCard";
import { useState, useEffect } from 'react';

const StepList = ({ workInstructionID }) => {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/steps?workInstructionID=${workInstructionID}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setSteps(data.steps);
      })
      .catch(err => console.log(err));
  }, [workInstructionID]);

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
