import React from "react";
import { Typography, Container, AppBar, Toolbar } from "@material-ui/core";
import "./App.css";
import Dashboard from "./Dashboard.js";
import ShoppingList from "./ShoppingList.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { T } from "./PartialTranslationParagraph";
import { DictionaryContainer } from "./Dictionary";

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            LingoLaunch
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/article">
              <Container>
                <DictionaryContainer>
                  <pre>TESTAREA</pre>
                  <div style={{ fontSize: "1.1rem" }}>
                    Text comes <T w="hier" />
                  </div>
                </DictionaryContainer>
              </Container>
            </Route>
            <Route path="/shopping">
              <ShoppingList />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
