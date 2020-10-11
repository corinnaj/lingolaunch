import React, { useContext, useState, useEffect } from "react";

import { T } from "../PartialTranslationParagraph";
import { Container, Typography } from "@material-ui/core";
import { Dictionary } from "../Dictionary";
import { reverse } from "lodash";

export const Difficulty = React.createContext({ useSuggestions: false });

const processChildString = (string, dictionary, englishWords, reverseMap) => {
  const output = [];

  // adapted from https://github.com/artem-solovev/regexify-string/blob/master/src/index.ts
  let key = 0;
  let processedInput = string;
  let result = englishWords.exec(processedInput);
  while (result !== null) {
    const matchStartAt = result.index;
    const match = result[1];
    const contentBeforeMatch = processedInput.substring(0, matchStartAt);

    output.push(contentBeforeMatch);
    output.push(
      React.createElement(T, { w: reverseMap[match.toLowerCase()], key })
    );

    processedInput = processedInput.substring(
      matchStartAt + match.length,
      processedInput.length + 1
    );
    englishWords.lastIndex = 0;
    result = englishWords.exec(processedInput);
    key++;
  }
  if (processedInput) {
    output.push(processedInput);
  }
  return output;
};

const tagChildList = (children, dictionary, englishWords, reverseMap) => {
  if (typeof children === "string") {
    return processChildString(children, dictionary, englishWords, reverseMap);
  }

  // is a single element
  if (children.length === undefined && children.props.children) {
    return tagChildList(
      children.props.children,
      dictionary,
      englishWords,
      reverseMap
    );
  }

  const output = [];
  for (const child of children) {
    if (typeof child === "string") {
      for (const c of processChildString(
        child,
        dictionary,
        englishWords,
        reverseMap
      ))
        output.push(c);
    } else {
      if (child.props.children) {
        output.push({
          ...child,
          props: {
            ...child.props,
            children: tagChildList(
              child.props.children,
              dictionary,
              englishWords,
              reverseMap
            ),
          },
        });
      } else {
        output.push(child);
      }
    }
  }
  return output;
};

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
      ")(s?\\b)",
    "i"
  );

  return (
    <Difficulty.Provider value={{ useSuggestions: wordCount < 13 }}>
      <Container>
        <img className="coverImage" src={image} />
        <div style={{ padding: "2rem" }}>
          <Typography variant="h3">{title}</Typography>
          <div style={{ fontSize: "1.1rem", lineHeight: "1.7rem" }}>
            {tagChildList(children, dictionary, englishWords, reverseMap)}
          </div>
          <div style={{ height: "1.5rem" }}></div>
        </div>
      </Container>
    </Difficulty.Provider>
  );
};
