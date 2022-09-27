import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [foods,setFoods] = useState([])
  return (
    <AppContext.Provider
      value={{
        foods,setFoods
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
