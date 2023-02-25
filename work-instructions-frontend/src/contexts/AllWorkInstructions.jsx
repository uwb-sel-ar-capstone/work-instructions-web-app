import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const getAllWorkInstructionsURL =
  "http://localhost:5000/api/v1/workinstructions?imageData=true";

const AppProvider = ({ children }) => {
  const [workInstructions, setWorkInstructions] = useState([]);
  const [apiURL, setApiURL] = useState("http://localhost:5000/api/v1/");

  const getWorkInstructions = async (url) => {
    try {
      const { data } = await axios(url);
      if (data.wis) {
        setWorkInstructions(data.wis);
      } else {
        setWorkInstructions([]);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getWorkInstructions(getAllWorkInstructionsURL);
  }, []);

  return (
    <AppContext.Provider
      value={{ workInstructions, apiURL, setApiURL, setWorkInstructions }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
