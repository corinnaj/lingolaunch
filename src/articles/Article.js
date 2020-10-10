import React from "react";

import { T } from "../PartialTranslationParagraph";
import { Container, Typography } from "@material-ui/core";
import { dictionary } from "../Dictionary";

const processChildString = (string) => {
  const englishWords = new RegExp(
    "\\b(" +
    Object.values(dictionary)
      .map((d) => d.en)
      .join("|") +
    ")\\b"
  );
  const reverseMap = Object.fromEntries(
    Object.entries(dictionary).map(([german, { en }]) => [en, german])
  );
  const output = [];

  // adapted from https://github.com/artem-solovev/regexify-string/blob/master/src/index.ts
  let key = 0;
  let processedInput = string;
  let result = englishWords.exec(processedInput);
  while (result !== null) {
    const matchStartAt = result.index;
    const match = result[0];
    const contentBeforeMatch = processedInput.substring(0, matchStartAt);

    output.push(contentBeforeMatch);
    output.push(React.createElement(T, { w: reverseMap[match], key }));

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

const tagChildList = (children) => {
  const output = [];

  if (typeof children === "string") {
    return processChildString(children);
  }

  for (const child of children) {
    if (typeof child === "string") {
      for (const c of processChildString(child)) output.push(c);
    } else {
      if (child.props.children) {
        output.push({
          ...child,
          props: {
            ...child.props,
            children: tagChildList(child.props.children),
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
  return (
    <Container>
      <img className="coverImage" src={image} />
      <Typography variant="h3">{title}</Typography>
      <div style={{ fontSize: "1.1rem", lineHeight: "1.7rem" }}>{tagChildList(children)}</div>
      <div style={{ height: "2rem" }}></div>
    </Container>
  );
};
