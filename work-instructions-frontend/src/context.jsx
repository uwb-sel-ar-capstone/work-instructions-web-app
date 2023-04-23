import React, { useContext } from "react";

const AppContext = React.createContext();

const baseAPIUrl = "http://localhost:5000/api/v1";

const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{ baseAPIUrl }}>{children}</AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
