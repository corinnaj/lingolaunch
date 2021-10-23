import React, { useContext, useState, useEffect } from "react";

import { T } from "../PartialTranslationParagraph";
import { Container, Typography } from "@material-ui/core";
import { Dictionary } from "../Dictionary";
import { reverse } from "lodash";

export const Difficulty = React.createContext({ useSuggestions: false });


export const Article = ({ title, children, image }) => {
  const { dictionary, progress } = useContext(Dictionary);
  const myProgress = progress();
  const [percentage, setPercentage] = useState(myProgress[0] / myProgress[1]);

  //useEffect(() => {
  //const interval = setInterval(() => {
  //setPercentage(percentage => percentage + 0.01);
  //}, 60);
  //return () => clearInterval(interval);
  //}, []);

  const reverseMap = Object.fromEntries(
    Object.entries(dictionary).map(([german, { en }]) => [
      en.toLowerCase(),
      german,
    ])
  );

  const wordCount =
    Math.max(parseInt(Object.keys(dictionary).length * percentage), 1) + 5;
  const englishWords = new RegExp(
    "\\b(" +
      Object.values(dictionary)
        .slice(0, wordCount)
        .map((d) => d.en)
        .join("|") +
      ")",
    "i"
  );
  const reactStringReplace = require('react-string-replace');
  console.log(dictionary)
  console.log(englishWords)
  return (
    <Difficulty.Provider value={{ useSuggestions: wordCount < 13 }}>
      <Container>
        <img className="coverImage" src={image} />
        <div style={{ padding: "2rem" }}>
          <Typography variant="h3">{title}</Typography>
          <div style={{ fontSize: "1.1rem", lineHeight: "1.7rem" }}>
            {
              reactStringReplace(children, englishWords, (match, i) =>
                  React.createElement(T, { w: reverseMap[match.toLowerCase()], i })
              )
            }
          </div>
          <div style={{ height: "1.5rem" }}></div>
        </div>
      </Container>
    </Difficulty.Provider>
  );
};
