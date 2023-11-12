import React, { createContext, useState } from 'react';

import data from "../data.json"

export const GenderAgeContext = createContext();

export const GenderAgeProvider = ({ children }) => {

    const [gender, setGender] = useState(false);
    const [age, setAge] = useState(false);
    const [countData, setCountData] = useState(data);
  
    return (
      <GenderAgeContext.Provider value={{ gender, age, countData, setGender, setAge, setCountData}}>
        {children}
      </GenderAgeContext.Provider>
    );
  };

export default GenderAgeContext;