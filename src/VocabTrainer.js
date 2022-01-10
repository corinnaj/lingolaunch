import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

export function VocabTrainer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button 
        variant="contained" 
        color="primary"
        component={Link}
        to="./vocablist"
      >
        <div >
          <p><Typography variant="h5"> Vocabulary List</Typography></p>
          <p><Typography variant="body1" color="textSecondary">Get an overview of all learned vocabulary</Typography></p>
        </div>
      </Button>
      <Button 
        variant="contained" 
        color="secondary"
        component={Link}
        to="./indexcards"
      >
        <div>
          <p><Typography variant="h5"> Index Cards </Typography></p>
          <p><Typography variant="body1" color="textSecondary">Study your vocabulary using the index card approach</Typography></p>
        </div>
      </Button>
    </div>
  );
}