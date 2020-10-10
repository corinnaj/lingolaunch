import React from "react";
import { Typography, Container } from "@material-ui/core";
import "./App.css";
import Dashboard from "./Dashboard.js";

import { T } from "./PartialTranslationParagraph";
import { DictionaryContainer } from "./Dictionary";

function App() {
  return (
    <div>
      <Dashboard />
      <Container>
        <DictionaryContainer>
          <pre>TESTAREA</pre>
          <div style={{ fontSize: "1.1rem" }}>
            Text comes <T german="hier" english="here" />
          </div>
        </DictionaryContainer>
      </Container>
    </div>
  );
}

export default App;
