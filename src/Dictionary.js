import React, { createContext, useState, useEffect, useCallback } from "react";

export const translate = (text, targetLanguageCode) =>
  window
    .fetch("http://localhost:8000/translate", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, targetLanguageCode }),
    })
    .then((res) => res.json())
    .then((json) => json.translated);

export const Dictionary = createContext({
  confirmWord: (german, guess) => false,
  getWordCount: (german) => 0,
  usedWord: (german) => false,
  progress: () => [0, 0],
  hasWord: (german) => false,
  addWord: (german, english) => null,
  dictionary: {},
  getKnownWords: () => { },
});

const newWordsDictionary = JSON.parse(localStorage.getItem("newWordDictionary")) || {};

const defaultDictionary = {
  hier: { en: "here", wrong: ["there", "herd", "near", "kitchen"] },
  Apfel: { en: "apple", wrong: ["pear", "cherry", "blueberry", "strawberry"] },
  Eier: { en: "eggs", wrong: ["milk", "apples", "eggplants", "chickens"] },
  Salz: { en: "salt", wrong: ["sugar", "flour", "soy sauce", "peanuts"] },
  Kreis: { en: "circle", wrong: ["rectangle", "triangle", "round", "shape"] },
  nach: { en: "after", wrong: ["before", "during", "less", "while"] },
  braun: { en: "brown", wrong: ["red", "black", "dark", "light"] },
  falls: { en: "if", wrong: ["when", "since", "after", "before"] },
  klein: { en: "small", wrong: ["big", "blue", "red", "wet"] },
  Himmel: { en: "sky", wrong: ["hell", "sea", "land", "island"] },
  nicht: { en: "not", wrong: ["but", "only", "after", "never"] },
  du: { en: "you", wrong: ["I", "we", "he", "she"] },
  Tür: { en: "door", wrong: [] },
  weil: { en: "because", wrong: [] },
  Straße: { en: "street", wrong: [] },
  nur: { en: "only", wrong: ["but", "before", "also", "start"] },
  Küche: { en: "kitchen", wrong: [] },
  Kopf: { en: "head", wrong: [] },
  wahr: { en: "true", wrong: [] },
  Züge: { en: "trains", wrong: [] },
  Regeln: { en: "rules", wrong: [] },
  Privatsphäre: { en: "privacy", wrong: [] },
  Löffel: { en: "spoon", wrong: [] },
  Zwiebel: { en: "onion", wrong: [] },
  gesalzen: { en: "salted", wrong: [] },
  fertig: { en: "done", wrong: [] },
  geschmolzen: { en: "melted", wrong: [] },
  ...newWordsDictionary,
};


export const DictionaryContainer = ({ children }) => {
  const [wordCounts, setWordCounts] = useState(() => {
    const data = localStorage.getItem("wordCounts");
    if (data) return JSON.parse(data);
    else return {};
  });

  const [dictionary, setDictionary] = useState(defaultDictionary);

  const save = useCallback(() => {
    localStorage.setItem("wordCounts", JSON.stringify(wordCounts));
  }, [wordCounts]);

  useEffect(() => {
    window.addEventListener("beforeunload", save);
    return () => window.removeEventListener("beforeunload", save);
  }, [save]);

  return (
    <Dictionary.Provider
      value={{
        dictionary,
        confirmWord: (german, guess) => {
          if (dictionary[german].en === guess) {
            setWordCounts((c) => ({ ...c, [german]: (c[german] ?? 0) + 1 }));
            return true;
          } else {
            return false;
          }
        },
        getWordCount: (german) => wordCounts[german] ?? 0,
        usedWord: (german) => {
          if (
            dictionary[german] ||
            dictionary[german[0].toUpperCase() + german.substring(1)]
          ) {
            setWordCounts((c) => ({ ...c, [german]: (c[german] ?? 0) + 1 }));
            return true;
          }
          return false;
        },
        hasWord: (german) => {
          return (
            dictionary[german] ||
            dictionary[german[0].toUpperCase() + german.substring(1)]
          );
        },
        progress: () => {
          return [
            Object.values(wordCounts).filter((count) => count > 3).length,
            Object.keys(dictionary).length,
          ];
        },
        addWord: (german, english) => {
          if (dictionary[german]) return;
          setWordCounts({ ...wordCounts, [german]: 0 });
          setDictionary(d => ({ ...d, [german]: { en: english, wrong: [] } }))
          newWordsDictionary[german] = { en: english };
        },
        getKnownWords: () => {
          return wordCounts;
        },
        reverseMap: () => {
          return Object.fromEntries(
            Object.entries(dictionary).map(([german, { en }]) => [en, german]))
        },
      }}
    >
      {children}
    </Dictionary.Provider >
  );
};
