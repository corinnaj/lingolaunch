import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, AppBar, Toolbar } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import "./App.css";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width:'100%',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: "5px",
  },
  section: {
    padding: theme.spacing(1),
    marginLeft: "5px",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
}));

function Dashboard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <AppBar position='static'>
          <Toolbar>
              <Typography variant="h6" className={classes.title}>LingoLaunch</Typography>
          </Toolbar>
      </AppBar>
      <div>
        <div className={classes.section}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5">
            be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Button size="small">Learn More</Button>
        </div>
        
        <Divider variant="middle"/>

        <div className={classes.section}>
        <Card>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Tips for Tipping
            </Typography>
            <Typography variant="body1" component="h2">
              Turns out, the Deutsche do not like to zahl proper Geld to their staff in Restaurants. Thus, you have to do it. <a href="#">Read More...</a>            
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        </div>
        <Divider variant="middle"/>
        <div className={classes.section}>
          <Typography variant="h6">Word of the day:</Typography>
          <Typography variant="body1">Apfelkuchen</Typography>
        </div>
      </div>
  </div>
  );
}

export default Dashboard;
