import React, { useContext, useState } from "react";
import { Dictionary } from "./Dictionary.js";
import { Typography, Fab, Card, CardContent, ListItemText} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    margin: "1rem",
  },
  card: {
    height: 100,
  },
}));

export function IndexCard() {
  const { getKnownWords, dictionary } = useContext(Dictionary);
  const knownWords = getKnownWords()
  const classes = useStyles()

  function getRandomWord() {
    var keys = Object.keys(knownWords);
    var randomKey = Math.floor((Math.random() * keys.length));
    var word = keys[randomKey]
    if (!dictionary[word]) word = word.charAt(0).toUpperCase() + word.slice(1)
    return word
  };

  function showTranslation(word) {
    var translation = dictionary[word].en
    setRevealedWord(translation)
  }

  function showNewWord() {
    setRandomWord(getRandomWord)
    setRevealedWord(null)
  }

  const [randomWord, setRandomWord] = useState(getRandomWord()) 
  const [revealedWord, setRevealedWord] = useState(null)

  return (
    <div className={classes.root}>
      <Typography>Study your vocab! Guess what the word means and check your answer by clicking on the card.</Typography>
      
      <br />

      <div onClick={() => {showTranslation(randomWord)}}>
        <Card className={classes.card} elevation={4}>
          <CardContent>
            <ListItemText align="center" primary={randomWord} secondary={revealedWord}/> 
          </CardContent>
        </Card>
      </div>

      <br /> 

      <div align="right">
        <Fab 
          color="primary" 
          variant="extended"
          onClick={() => {showNewWord()}}
        >
          <ArrowForwardIosIcon />
          Next Card
        </Fab>
      </div>
  
    </div>
  )
}