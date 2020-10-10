import React, { createContext, useState, useEffect, useCallback } from "react";

export const Dictionary = createContext({
  confirmWord: (german, guess) => false,
  getWordCount: (german) => 0,
  usedWord: (german) => false,
});

const dictionary = {
  'hier': { en: 'here', wrong: ['there', 'herd', 'near', 'kitchen'] },
  'Apfel': { en: 'apple', wrong: ['pear', 'cherry', 'blueberry', 'strawberry'] },
  'Eier': { en: 'eggs', wrong: ['milk', 'apples', 'eggplants', 'chickens'] },
  'Salz': { en: 'salt', wrong: ['sugar', 'flour', 'soy sauce', 'peanuts'] },
  'Kreis': { en: 'circle', wrong: ['rectangle', 'triangle', 'round', 'shape'] },
  'nach': { en: 'after', wrong: ['before', 'during', 'less', 'while'] },
  'braun': { en: 'brown', wrong: ['red', 'black', 'dark', 'light'] },
  'falls': { en: 'if', wrong: ['when', 'since', 'after', 'before'] },
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
        usedWord: (german) => {
          if (dictionary[german]) {
            setWordCounts(c => ({ ...c, [german]: (c[german] ?? 0) + 1 }));
            return true;
          }
          return false;
        }
      }}
    >
      {children}
    </Dictionary.Provider >
  );
};
