import React from "react";
import {
  Typography,
  Container,
  AppBar,
  Toolbar,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import "./App.css";
import Dashboard from "./Dashboard.js";
import ShoppingList from "./ShoppingList.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { T } from "./PartialTranslationParagraph";
import { DictionaryContainer } from "./Dictionary";
import { lightGreen } from "@material-ui/core/colors";
import { ApplePie } from "./articles/ApplePie";
import { ArticleList } from "./ArticleList";

const theme = createMuiTheme({
  typography: {
    letterSpacing: "-1px",
    fontFamily: ["Mulish", "sans-serif"].join(","),
    h3: {
      fontWeight: 900,
      margin: "1.5rem 0 2rem 0",
      letterSpacing: "-1px",
    },
    h4: {
      fontWeight: 900,
      letterSpacing: "-1px",
      fontSize: "20px",
    },
    h6: {
      fontWeight: 900,
      letterSpacing: "-1px",
    },
  },
  overrides: {},
  palette: {
    primary: lightGreen,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DictionaryContainer>
        <AppBar position="static" elevation={0}>
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
              <Route exact path="/articles/applepie">
                <ApplePie />
              </Route>
              <Route exact path="/article">
                <Container>
                  <Typography variant="h3">Apple Pie Recipe</Typography>
                  <div style={{ fontSize: "1.1rem" }}>
                    Text comes <T w="hier" />
                  </div>
                </Container>
              </Route>
              <Route path="/shopping">
                <ShoppingList />
              </Route>
              <Route path="/articles">
                <ArticleList />
              </Route>
            </Switch>
          </div>
        </Router>
      </DictionaryContainer>
    </ThemeProvider>
  );
}

export default App;
