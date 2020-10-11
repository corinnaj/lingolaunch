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
import bundeseagleIcon from "./bundeseagle-icon.svg";
import pheasantIcon from "./pheasant-icon.png";
import germanFlag from "./german-flag.svg";
import japanFlag from "./japan-flag.svg";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { T } from "./PartialTranslationParagraph";
import { DictionaryContainer } from "./Dictionary";
import { lightGreen } from "@material-ui/core/colors";

import { Tipping } from "./articles/Tipping";
import { ApplePie } from "./articles/ApplePie";
import { CapitainBluebear } from "./articles/CapitainBluebear";
import { Kangaroo } from "./articles/Kangaroo";
import { Characteristics } from "./articles/Characteristics";
import { Spaetzle } from "./articles/ASortOfPasta";
import { MyArticle } from "./articles/MyArticle";

import { ArticleList } from "./ArticleList";
import { Translate } from "./Translate";
import { VocabTrainer } from "./VocabTrainer";
import { Welcome } from "./Welcome";
import { PictureGame } from "./PictureGame";
import { IndexCard } from "./IndexCard";
import { VocabList } from "./VocabList";
import ScrollToTop from "./ScrollToTop";

const theme = createMuiTheme({
  typography: {
    letterSpacing: "-1px",
    fontFamily: ["Mulish", "sans-serif"].join(","),
    h3: {
      fontWeight: 900,
      margin: "1.5rem 0 4rem 0",
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
  const isJapanese = false;

  const appBarStyles = isJapanese
    ? {
      color: "white",
      backgroundImage: `url(${japanFlag})`,
      backgroundPosition: "center center",
      backgroundColor: "white",
      backgroundRepeat: "no-repeat",
    }
    : {
      color: "black",
      backgroundImage: `url(${germanFlag})`,
      backgroundPosition: "center center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };

  return (
    <div className="phone-wrapper-outer">
      <div className="phone-wrapper">
        <ThemeProvider theme={theme}>
          <DictionaryContainer>
            <Router>
              <ScrollToTop />
              <AppBar position="static" elevation={8} style={appBarStyles}>
                <Toolbar style={{ minHeight: "56px" }}>
                  <Link
                    to="/"
                    style={{
                      flexGrow: 1,
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{ color: isJapanese ? "black" : "white" }}
                    >
                      LingoLaunch
                    </Typography>
                  </Link>
                  {!isJapanese ? (
                    <img src={bundeseagleIcon} />
                  ) : (
                      <img height="40px" src={pheasantIcon} />
                    )}
                </Toolbar>
              </AppBar>
              <div>
                <Switch>
                  <Route exact path="/">
                    <Dashboard isJapanese={isJapanese} />
                  </Route>
                  <Route exact path="/welcome">
                    <Welcome />
                  </Route>
                  <Route exact path="/articles/tipping">
                    <Tipping />
                  </Route>
                  <Route exact path="/articles/applepie">
                    <ApplePie />
                  </Route>
                  <Route exact path="/articles/bluebear">
                    <CapitainBluebear />
                  </Route>
                  <Route exact path="/articles/kangaroo">
                    <Kangaroo />
                  </Route>
                  <Route exact path="/articles/characteristics">
                    <Characteristics />
                  </Route>
                  <Route exact path="/articles/spaetzle">
                    <Spaetzle />
                  </Route>
                  <Route exact path="/articles/myarticle">
                    <MyArticle />
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
                  <Route path="/vocab">
                    <VocabTrainer />
                  </Route>
                  <Route path="/picture-game">
                    <PictureGame />
                  </Route>
                  <Route path="/translate">
                    <Translate />
                  </Route>
                  <Route path="/indexcards">
                    <IndexCard />
                  </Route>
                  <Route path="/vocablist">
                    <VocabList />
                  </Route>
                </Switch>
              </div>
            </Router>
          </DictionaryContainer>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
