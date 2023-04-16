import { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/ListGroup.css";

const AllStepList = ({ selection }) => {
  const { baseAPIUrl } = useGlobalContext();
  const [steps, setSteps] = useState([]);
  const url = `${baseAPIUrl}/steps`;

  const getSteps = async (url) => {
    try {
      const { data } = await axios.get(url);
      if (data.steps) {
        setSteps(data.steps);
      } else {
        setSteps([]);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getSteps(url);
  }, [url]);

  return (
    <ListGroup>
      {steps.map((step) => {
        return (
          <ListGroup.Item
            action
            key={step._id}
            onClick={() => {
              selection(step);
            }}
          >
            {step.text}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default AllStepList;
