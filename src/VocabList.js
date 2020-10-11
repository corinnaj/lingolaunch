import React, { useContext } from "react";
import { Dictionary } from "./Dictionary.js";
import { List, ListItem, ListItemText, ListSubheader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

export function VocabList() {
  const { getKnownWords, dictionary } = useContext(Dictionary);
  const knownWords = getKnownWords();
  const classes = useStyles();

  function showWord(word, labelId) {
    if (!dictionary[word]) {
      word = word.charAt(0).toUpperCase() + word.slice(1)
      let counter = 0

      for (let knownWord in knownWords) {
        let knownWordUpper = knownWord.charAt(0).toUpperCase() + knownWord.slice(1)
        if (knownWord === word || knownWordUpper === word) {
          counter ++
        }
      }
      if (counter > 1) {
        return
      }
    }

    var engWord = dictionary[word].en;
    return <ListItemText id={labelId} primary={word} secondary={engWord} />;
  }

  return (
    <List className={classes.root} subheader={<li />}>
      {["Bronze", "Silber", "Gold", "Emerald", "Remembered"].map(
        (sectionId, index) => (
          <li key={`section-${sectionId}`} className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader className={`subheader-${index}`}>
                {sectionId}
              </ListSubheader>
              {Object.keys(knownWords).map((value) => {
                if (knownWords[value] === index+1) {
                  return (
                    <ListItem key={value} role={undefined} dense>
                      {showWord(value, { value })}
                    </ListItem>
                  );
                }
              })}
            </ul>
          </li>
        )
      )}
    </List>
  );
}
