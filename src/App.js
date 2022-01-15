import React, {useState, useEffect} from "react";
import { supabase } from './supabaseClient'
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import "./App.css";
import Dashboard from "./Dashboard.js";
import ShoppingList from "./ShoppingList.js";
import SignUp from "./account/SignUp.js"
import Finalise from "./account/Finalise"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Welcome from "./Welcome"
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
    primary: {main: '#343434'}
  },
});

function App() {
  const usePhoneFrame = false;

  const [userInfo, setUserInfo] = useState({
    status: JSON.parse(localStorage.getItem('status')) || undefined,
    username: undefined,
    language: undefined,
    level: undefined,
    articles: null,
    syncUser:true,
    syncArticles: false,
  })

  function syncArticles(){
    supabase
        .rpc('get_completed_articles', {
          logged_user_id: supabase.auth.user().id
        })
        .eq('level', userInfo.level)
        .eq('lang', userInfo.language)
        .then(articles => {
          if (articles.error)
            console.log(articles.error)
          setUserInfo({
            ...userInfo,
            articles: articles.data ? articles.data : articles.error,
            syncArticles: false
          })
        })
  }

  function sync_permissions() {
    if (!supabase.auth.session()) {
      const newStatus = (userInfo.status === 'ToVerify') ? 'ToVerify' : 'Guest';
      localStorage.setItem('status', JSON.stringify(newStatus))
      setUserInfo({status: newStatus, syncUser:false})
    }
    else {  // has potentially just logged in, we have to check
      supabase
          .from('profiles')
          .select('username, level, languages(name)', {count: 'exact'})
          .eq('id', supabase.auth.user().id)
          .then(response => {
            const {data, count, error} = response
            if (error) console.log(error)
            const newStatus = count > 0 ? "Completed" : "ToComplete"
            localStorage.setItem('status', JSON.stringify(newStatus))
            setUserInfo({
              ...userInfo,
              status: newStatus,
              username: count > 0 ? data[0].username : undefined,
              language: count > 0 ? data[0].languages.name : undefined,
              level: count > 0 ? data[0].level : undefined,
              syncUser: false,
              syncArticles: (!userInfo.articles && count > 0) // if we are completed and still not have articles..
            })
          })
    }
  }

  useEffect(() => {

    // we have 4 types of user status: Guest, ToVerify (email), ToComplete (last fields), Completed
    if (userInfo.syncUser) {
      sync_permissions()
    }

    if (userInfo.syncArticles){
      syncArticles()
    }

    // use effect if triggered every time userInfo state changes but only two events
    // really trigger a refresh of informations and permissions namely a session change or
    // when a component changes the userInfo.sync var to True. Note: these event should not happen
    // at the same time! (e.g. on login we don't need to set sync True as the session hook already
    // carries the info refresh.
    const {data: listener} = supabase.auth.onAuthStateChange((_event, session) => {
      if (!userInfo.syncUser) { // if sync is active useEffect is already handling changes.
        sync_permissions()
      }
    })

    return () => {
      listener?.unsubscribe()
    }

  }, [userInfo])

  return (
    <div className={usePhoneFrame ? "phone-wrapper-outer" : null}>
      <div className={usePhoneFrame ? "phone-wrapper" : null}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <DictionaryContainer>
              <Router>
                <ScrollToTop />
                  {
                    (userInfo.syncUser || userInfo.syncArticles) ?
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
                              <Dashboard userInfo={userInfo} updateUserInfo={setUserInfo}/>
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
                        </>
                  }
              </Router>
              {/*TODO: handle here messages from children components as notifications*/}
            </DictionaryContainer>
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
      return <Welcome/>
    default:
      return <Redirect to="/login" />
  }
}
