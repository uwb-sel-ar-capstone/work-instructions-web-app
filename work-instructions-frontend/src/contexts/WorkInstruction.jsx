import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const WorkInstructionContext = React.createContext();

const workInstructionURL = "http://localhost:5000/api/v1/workinstructions/";

const WorkInstructionContextProvider = ({ children }) => {
  const [workInstruction, setWorkInstruction] = useState({});
  const [wiID, setWiID] = useState({});

  const getWorkInstruction = async (wiID) => {
    const url = `${workInstructionURL}${wiID}/?imageData=true`;
    try {
      const { data } = await axios(url);
      if (data.wi) {
        setWorkInstruction(data.wi);
      } else {
        setWorkInstruction([]);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  // Potentially look into adding the workInstruction object itself as an additional dependency to the dependency array.
  // Could be beneficial if we want to re-do the get request whenever the object is changed.
  useEffect(() => {
    getWorkInstruction(wiID);
  }, [wiID]);

  return (
    <WorkInstructionContext.Provider
      value={{
        setWiID,
        getWorkInstruction,
        workInstruction,
        setWorkInstruction,
      }}
    >
      {children}
    </WorkInstructionContext.Provider>
  );
};

export const useWorkInstructionContext = () => {
  return useContext(WorkInstructionContext);
};

export { WorkInstructionContext, WorkInstructionContextProvider };
