import React, { createContext, useState, useEffect, useCallback } from "react";

export const Dictionary = createContext({
  confirmWord: (german, guess) => false,
  getWordCount: (german) => 0,
});

const dictionary = {
  'hier': { en: 'here', wrong: ['there', 'herd', 'near', 'kitchen'] },
}

export const DictionaryContainer = ({ children }) => {
  const [wordCounts, setWordCounts] = useState(() => {
    const data = localStorage.getItem('wordCounts');
    if (data)
      return JSON.parse(data)
    else
      return {}
  });
  console.log(wordCounts)

  const save = useCallback(() => {
    console.log('SAVAVEVE')
    localStorage.setItem('wordCounts', JSON.stringify(wordCounts))
  }, [wordCounts])

  useEffect(() => {
    window.addEventListener('beforeunload', save)
    return () => window.removeEventListener('beforeunload', save)
  }, [save])

  return (
    <Dictionary.Provider
      value={{
        confirmWord: (german, guess) => {
          if (dictionary[german].en === guess) {
            setWordCounts(c => ({ ...c, [german]: (c[german] ?? 0) + 1 }));
            return true;
          } else {
            return false;
          }
        },
        getWordCount: (german) => wordCounts[german] ?? 0,
      }}
    >
      {children}
    </Dictionary.Provider >
  );
};
