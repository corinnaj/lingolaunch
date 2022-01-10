import React, {useState, useEffect} from "react";
import { supabase } from './supabaseClient'
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import "./App.css";
import Dashboard from "./Dashboard.js";
import ShoppingList from "./ShoppingList.js";
import SignUp from "./account/SignUp.js"
import Finalise from "./account/Finalise"
import CircularProgress from '@mui/material/CircularProgress';
// import bundeseagleIcon from "./bundeseagle-icon.svg";
// import pheasantIcon from "./pheasant-icon.png";
// import germanFlag from "./german-flag.svg";
// import japanFlag from "./japan-flag.svg";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { DictionaryContainer } from "./Dictionary";
import { ArticleList } from "./ArticleList";
import { Translate } from "./Translate";
import { VocabTrainer } from "./VocabTrainer";
import { Login } from "./account/Login";
import { PictureGame } from "./PictureGame";
import { IndexCard } from "./IndexCard";
import { VocabList } from "./VocabList";
import ScrollToTop from "./ScrollToTop";
import MainNavbar from "./MainNavbar";
import {blue} from "@mui/material/colors";

const theme = createTheme({
  typography: {
    letterSpacing: "-1px",
    fontFamily: ["Mulish", "sans-serif"].join(","),
  },
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
  overrides: {},
  palette: {
    primary: blue,
  },
});

function App() {
  const usePhoneFrame = false;

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
      setLoading(false)
    }
    else if (!supabase.auth.session()) {
      setUserInfo({...userInfo, status: 'ToVerify'})
      setLoading(false)
    }
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
            setLoading(false)
          })
    }
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
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            {
              loading ?
                  <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                          marginTop: 8,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                    ><CircularProgress/>
                    </Box>
                  </Container> :
                  <>
                  <MainNavbar userInfo={userInfo} updateUserInfo={setUserInfo}/>
                  <DictionaryContainer>
                    <Router>
                      <ScrollToTop/>
                      <Switch>
                        <Route exact path="/login">
                          {userInfo.status === 'Guest' ? <Login/> : <Redirect to="/"/>}
                        </Route>
                        <Route exact path="/signup">
                          {['Guest', 'ToVerify'].includes(userInfo.status) ?
                              <SignUp userInfo={userInfo} updateUserInfo={setUserInfo}/> : <Redirect to="/"/>
                          }
                        </Route>
                        <Route exact path="/finalise">
                          {userInfo.status === 'ToComplete' ?
                              <Finalise userInfo={userInfo} updateUserInfo={setUserInfo}/> : <Redirect to="/"/>}
                        </Route>

                        {/*TODO: soon!*/}
                        {/*<Route exact path="/recovery">*/}
                        {/*  <PasswordRecovery/>*/}
                        {/*</Route>*/}

                        <SafeZone userInfo={userInfo} updateUserInfo={setUserInfo}>
                          <Route exact path="/">
                            <Dashboard/>
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
                    </Router>
                    {/*TODO: handle here messages from children components as notifications*/}
                  </DictionaryContainer>
                  </>
            }
          </ThemeProvider>
        </StyledEngineProvider>
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