import { useGlobalContext } from "../contexts/AllWorkInstructions";
import { useEffect, useState } from "react";
import axios from "axios";

/**
 * The backend will be populated with example data when this component is rendered.
 */
const Populate = () => {
  const [status, setStatus] = useState("Loading...");
  const { apiURL } = useGlobalContext();
  //console.log(apiURL);

  const [items, setItems] = useState([]);
  const [steps, setSteps] = useState([]);
  const [wis, setWis] = useState([]);

  const getExistingData = async (endpoint, arrayName, setFunc) => {
    try {
      const { data } = await axios(`${apiURL}${endpoint}`);
      if (data[arrayName]) {
        setFunc(data[arrayName]);
      } else {
        setFunc([]);
      }
    } catch (error) {
      console.log(error.response);
    }
    return null;
  };

  useEffect(() => {
    getExistingData("items", "items", setItems);
    getExistingData("steps", "steps", setSteps);
    getExistingData("workInstructions", "wis", setWis);
  }, []);
  // If there is already any data in the mongo instance, dont populate with dummy data.
  if (items.length !== 0 || steps.length !== 0 || wis.length !== 0) {
    useEffect(() => {
      setStatus("Data already in database.");
    }, []);
  }
  return <p>test</p>;
};
export default Populate;
