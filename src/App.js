import React from "react";
import { Typography, Container } from "@material-ui/core";
import "./App.css";

import { T } from "./PartialTranslationParagraph";
import { DictionaryContainer } from "./Dictionary";

function App() {
  return (
    <Container>
      <DictionaryContainer>
        <Typography variant="h1">LingoLaunch</Typography>
        <div style={{ fontSize: "1.3rem" }}>
          Text comes <T german="hier" english="here" />
        </div>
      </DictionaryContainer>
    </Container>
  );
}

export default App;
