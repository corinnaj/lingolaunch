import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider, Card, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';

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
    marginLeft: "5px",
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
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  wordRow: {
    display: "flex",
    alignItems: "center",
  },
}));

function Dashboard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <div className={classes.section}>
        <Typography className={classes.title} color="textSecondary">
          Word of the Day
        </Typography>
        <div className={classes.wordRow}>
          <Typography variant="h5">Ap{bull}fel</Typography>
          <div style={{ fontSize: "2rem", marginLeft: "0.5rem" }}>🍏</div>
        </div>
        <Typography className={classes.pos} color="textSecondary">
          noun, fruit
        </Typography>
      </div>

      <Divider variant="middle" />

      <div className={classes.section}>
        <Card elevation={4}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Tips for Tipping
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Turns out, the Deutsche do not like to zahl proper Geld to their
              staff in Restaurants. Thus, you have to do it.{" "}
              <Link to="/article/tipping">Read More...</Link>
            </Typography>
          </CardContent>
        </Card>
      </div>

      <Divider variant="middle" />

      <div className={classes.avatar_root}>
        <Fab color="primary">
          Shopping List
        </Fab>
        <Fab color="secondary">
          Learn About Culture
        </Fab>
        <Fab color="primary">
          Check Your Vocab
        </Fab>
        <Fab color="secondary">
          Translate and OCR
        </Fab>
      </div>
      <Divider variant="middle" />
    </div>
  );
}

export default Dashboard;
