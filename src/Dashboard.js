import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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
          <Typography variant="h5">A{bull}pfel</Typography>
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
            <Typography variant="body1">
              Turns out, the Deutsche do not like to zahl proper Geld to their
              staff in Restaurants. Thus, you have to do it.{" "}
              <Link to="/article/tipping">Read More...</Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
      <Divider variant="middle" />
    </div>
  );
}

export default Dashboard;
