import React, {useContext, useEffect, useState} from "react";
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import {Card, CardContent, CardActions, Button, Box, LinearProgress} from "@mui/material";
import { Link } from "react-router-dom";
import { Divider } from '@mui/material';
import LinearProgressWithLabel from "./ProgressBar.js";
import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import {Dictionary} from "./Dictionary";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: "5px",
  },
  section: {
    padding: theme.spacing(1),
    margin: "3rem",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  avatar_root: {
    "& > *": {
      fontSize: 10,
      padding: theme.spacing(0.65),
      margin: theme.spacing(1),
      width: theme.spacing(11),
      height: theme.spacing(11),
    },
  },
  wordRow: {
    display: "flex",
    alignItems: "center",
  },
}));

function Dashboard({userInfo, updateUserInfo}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const {progress} = useContext(Dictionary)
  const words = progress()

  return (
    <Container component="main" maxWidth="lg">
      <Grid container spacing={2}>

        {userInfo.articles ?
            <Grid item xs={12}>
              <div className={classes.section}>
                <Typography variant="h6">
                  Welcome {userInfo.username}. your current level is {userInfo.level}.
                  You miss {userInfo.articles.filter((article) => !article.completed).length} articles to reach
                  level {userInfo.level + 1}! <br/>
                  Complete articles and grammar exercises to level up.
                </Typography>
                <LinearProgressWithLabel
                    value={100 * (userInfo.articles.filter((article) => article.completed).length / userInfo.articles.length)}
                />
              </div>
            </Grid> : ''
        }
          <Divider/>

          <Grid item xs={12} md={4}>
            <Card elevation={4}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Partial Translation
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Start discovering your first {userInfo.language} words from context and learn beautiful
                  {userInfo.language} books, stories and recipes from the {userInfo.language} culture.
                </Typography>
              </CardContent>
              <CardActions>
                <Button component={Link} to="/articles" size="small">Let's go</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card elevation={4}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Grammar Exercises
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  No pain, no gain {userInfo.username}!
                  You need grammar to learn a language. In this section you will learn the basic rules of
                  the {userInfo.language} language through fancy exercises.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Start over</Button>
              </CardActions>
            </Card>
          </Grid>

        <Grid item xs={12} md={4}>
          <div className={classes.section}>
            <Typography>
              Word of the Day
            </Typography>
            <div className={classes.wordRow}>
              <Typography variant="h5">
                Ge{bull}sund{bull}heit
              </Typography>
              <div style={{fontSize: "2rem", marginLeft: "0.5rem"}}>🤧</div>
            </div>
            <Typography className={classes.pos} color="textSecondary">
              noun
            </Typography>
          </div>
        </Grid>

          <Grid item xs={12}>
            <Card elevation={4}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Vocabulary
                </Typography>
                <div>
                  <Typography variant="body2" color="textSecondary">You learned {words[0]} of 500 words</Typography>
                  <LinearProgressWithLabel
                      value={100 * (words[0]/words[1])}
                  />
                </div>
              </CardContent>
              <CardActions>
                <Button component={Link} to="/vocab" size="small">Check your progresses</Button>
              </CardActions>
            </Card>
          </Grid>
      </Grid>
    </Container>

  );
}

export default Dashboard;
