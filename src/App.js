import React, {useState, useEffect} from "react";
import { supabase } from './supabaseClient'
import {Typography, Container, AppBar, Toolbar, ThemeProvider, createTheme} from "@material-ui/core";
import "./App.css";
import Dashboard from "./Dashboard.js";
import ShoppingList from "./ShoppingList.js";
import SignUp from "./account/SignUp.js"
import Finalise from "./account/Finalise"
import bundeseagleIcon from "./bundeseagle-icon.svg";
import pheasantIcon from "./pheasant-icon.png";
import germanFlag from "./german-flag.svg";

import japanFlag from "./japan-flag.svg";

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { DictionaryContainer } from "./Dictionary";
import { lightGreen } from "@material-ui/core/colors";
import { ArticleList } from "./ArticleList";
import { Translate } from "./Translate";
import { VocabTrainer } from "./VocabTrainer";
import { Login } from "./account/Login";
import { PictureGame } from "./PictureGame";
import { IndexCard } from "./IndexCard";
import { VocabList } from "./VocabList";
import ScrollToTop from "./ScrollToTop";

const theme = createTheme({
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
  const usePhoneFrame = false;
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
  const [loading, setLoading] = useState(true)

  const [userInfo, setUserInfo] = useState({
    status: 'Guest',
    username: undefined,
    language: undefined,
    level: undefined,
    session: null
  })

  function sync_permissions(){
    setLoading(true)
    if (!userInfo.status || !supabase.auth.user()) {
      setUserInfo({...userInfo, status: 'Guest'})
    }
    else if (!supabase.auth.session())
      setUserInfo({...userInfo, status: 'ToVerify'})
    else if (userInfo.status !== "Completed") {
      supabase
          .from('profiles')
          .select('username, level, languages(name)', {count: 'exact'})
          .eq('id', supabase.auth.user().id)
          .then(response => {
            const {data, count, error} = response
            if (error)
              console.log(error)
            if (data && count > 0){
              setUserInfo({
                ...userInfo,
                status: 'Completed',
                username: data[0].username,
                language: data[0].languages.name,
                level: data[0].level,
                session: supabase.auth.session()
              })
            }
            else {
              setUserInfo({
                ...userInfo,
                status: 'ToComplete',
                session: supabase.auth.session()
              })
            }
          })
    }
    setLoading(false)
  }


  useEffect(() => {

    supabase.auth.onAuthStateChange((_event, session) => {
      setUserInfo({...userInfo, session: session})
      sync_permissions()
    })

    // we have 4 types of user status: Guest, ToVerify (email), ToComplete (last fields), Completed
    setUserInfo({...userInfo, session: supabase.auth.session()})
    sync_permissions()
  }, [])



  return (
    <div className={usePhoneFrame ? "phone-wrapper-outer" : null}>
      <div className={usePhoneFrame ? "phone-wrapper" : null}>
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
                {
                  loading ? 'loading' :
                      <Switch>
                        <Route exact path="/login">
                          {userInfo.status === 'Guest' ? <Login/> : <Redirect to="/" /> }
                        </Route>
                        <Route exact path="/signup">
                          {['Guest', 'ToVerify'].includes(userInfo.status) ?
                              <SignUp userInfo={userInfo} updateUserInfo={setUserInfo}/> : <Redirect to="/" />
                          }
                        </Route>
                        <Route exact path="/finalise">
                          {userInfo.status === 'ToComplete' ? <Finalise userInfo={userInfo} updateUserInfo={setUserInfo}/> : <Redirect to="/" /> }
                        </Route>

                        {/*TODO: soon!*/}
                        {/*<Route exact path="/recovery">*/}
                        {/*  <PasswordRecovery/>*/}
                        {/*</Route>*/}

                        <SafeZone userInfo={userInfo} updateUserInfo={setUserInfo}>
                          <Route exact path="/">
                            <Dashboard isJapanese={isJapanese}/>
                          </Route>
                          <Route path={"/articles/:articleId?"}>
                            <ArticleList userInfo={userInfo} updateUserInfo={setUserInfo}/>
                          </Route>
                          <Route path="/shopping">
                            <ShoppingList/>
                          </Route>
                          <Route path="/vocab">
                            <VocabTrainer/>
                          </Route>
                          <Route path="/picture-game">
                            <PictureGame/>
                          </Route>
                          <Route path="/translate">
                            <Translate/>
                          </Route>
                          <Route path="/indexcards">
                            <IndexCard/>
                          </Route>
                          <Route path="/vocablist">
                            <VocabList/>
                          </Route>
                        </SafeZone>
                      </Switch>
                }
              </div>
            </Router>
            {/*TODO: handle here messages from children components as notifications*/}
          </DictionaryContainer>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;

// This wrapper routes users to the right path according to their sign-up status
// and ensure that fully registered users can access the internal area of the application
function SafeZone({ children, userInfo, updateUserInfo, ...rest }) {
  switch (userInfo.status){
    case 'ToVerify':
      return <Redirect to="/signup" />
    case 'ToComplete':
      return <Redirect to="/finalise" />
    case 'Completed':
      return children
    case 'Guest':
    default:
      return <Redirect to="/login" />
  }
}