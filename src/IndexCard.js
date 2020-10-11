import React, { useContext, useState } from "react";
import { Dictionary } from "./Dictionary.js";
import { Typography, Divider, Card, CardContent, ListItemText, ListItem, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    margin: "1rem",
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
    return word
  };

  function showTranslation(word) {
    var translation = dictionary[word].en
    setRevealedWord(translation)
  }

  const [randomWord] = useState(getRandomWord()) 
  const [revealedWord, setRevealedWord] = useState(null)

  return (
    <div className={classes.root}>
      <Typography>Study your vocab! Guess what the word means and check your answer by clicking on the card.</Typography>
      <br />
      <div onClick={() => {showTranslation(randomWord)}}>
        <Card elevation={4}>
          <CardContent>
            <ListItemText primary={randomWord} secondary={revealedWord}/> 
          </CardContent>
        </Card>
      </div>

    </div>
  )
}