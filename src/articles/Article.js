import React, { useContext, useState, useEffect } from "react";

import parse from 'html-react-parser';
import { T } from "../PartialTranslationParagraph";
import { Container, Typography } from "@mui/material";
import { Dictionary } from "../Dictionary";
import reactStringReplace from "react-string-replace";

export const Difficulty = React.createContext({ useSuggestions: false });


export const Article = ({ title, children, image, onComplete }) => {
  const { dictionary, progress } = useContext(Dictionary);
  const myProgress = progress();
  const [percentage, setPercentage] = useState(myProgress[0] / myProgress[1]);

  const reverseMap = Object.fromEntries(
    Object.entries(dictionary).map(([german, { en }]) => [
      en.toLowerCase(),
      german,
    ])
  );

  const wordCount = Math.max(parseInt(Object.keys(dictionary).length * percentage), 1) + 5;
  const englishWords = new RegExp(
    "\\b(" +
      Object.values(dictionary)
        .slice(0, wordCount)
        .map((d) => d.en)
        .join("|") +
      ")",
    "ig"
  );
  // keep track of how many matches are left to complete this article
  const [matchLeft, SetmatchLeft] = React.useState(((children).match(englishWords) || []).length)

  const updateMatchLeft = () => {
    if (matchLeft - 1 === 0)
      onComplete();
    SetmatchLeft(matchLeft - 1)
  }

  return (
    <Difficulty.Provider value={{ useSuggestions: wordCount < 13 }}>
      <Container>
        <img className="coverImage" src={image} />
        <div style={{ padding: "2rem" }}>
          <Typography variant="h3">{title}</Typography>
          <div style={{ fontSize: "1.1rem", lineHeight: "1.7rem" }}>
            {
              parse(children, {
                replace: domNode => {
                  if(domNode.data)
                    return(
                        <span>
                          {reactStringReplace(domNode.data, englishWords, (match, i) =>
                              <T w={reverseMap[match.toLowerCase()]} key={i} onComplete={updateMatchLeft}/>)}
                        </span>
                    );
                }
              })
            }
          </div>
          <div style={{ height: "1.5rem" }}></div>
        </div>
      </Container>
    </Difficulty.Provider>
  );
};
