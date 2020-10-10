import React, { createContext, useState } from "react";

export const Dictionary = createContext({
  confirmWord: (german) => true,
  getWord: (german) => 0,
});

export const DictionaryContainer = ({ children }) => {
  const [correct, setCorrect] = useState(0);

  return (
    <Dictionary.Provider
      value={{
        confirmWord: (german) => setCorrect((c) => c + 1),
        getWord: (german) => correct,
      }}
    >
      {children}
    </Dictionary.Provider>
  );
};
