import React, { useContext, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TextField, Select, SelectProps, Menu, MenuItem } from "@material-ui/core";
import { Dictionary } from "./Dictionary";
import Confetti from "react-dom-confetti";
import { Difficulty } from "./articles/Article";

export const confettiConfig = {
  angle: "78",
  spread: "164",
  startVelocity: "23",
  elementCount: "55",
  dragFriction: 0.12,
  duration: 1500,
  stagger: "0",
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};


const MuiMenu = React.forwardRef((props, ref) => {
  return <Menu ref={ref} {...props} />;
});

const MuiMenuItem = React.forwardRef((props, ref) => {
  return <MenuItem ref={ref} {...props} />;
});

export const T = ({ w: german, readonly, onComplete}) => {
    /*
    TODO: since we are storing matches on state we could show here which word is already completed
            some sort of saved progress from your exercise -> useful if articles are long and complex
     */

  const [opened, setOpened] = useState(null);
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState("");

  const { useSuggestions } = useContext(Difficulty);
  const { confirmWord, getWordCount, dictionary } = useContext(Dictionary);

  const handleSubmit = (answer) => {
    if (confirmWord(german, answer)) {
      setSuccess(true);
      setOpened(false);
      onComplete();
      return true;
    }
    return false;
  };

  const wordList = useMemo(
      () => shuffle([...dictionary[german].wrong, dictionary[german].en]),
      [dictionary, german]
  );

  const colors = ["new", "bronze", "silver", "gold", "emerald"];

  return (
    <span style={{ position: "relative" }}>
      <motion.span
        className={
          "partial-translation " + (colors[getWordCount(german)] ?? "completed")
        }
        onClick={(event) =>
          !readonly && !success && setOpened(event.currentTarget)
        }
        whileHover={{ scale: [1, 1.2] }}
        transition={{
          ease: "linear",
          repeat: 4,
          duration: 0.35,
          repeatType: "reverse",
        }}
      >
        {german}
      </motion.span>
      <span className="confetti-wrapper">
        {/* TODO: the confetti component generates a div tag inside our paragraph - not good. */}
        <Confetti
          style={{ position: "absolute" }}
          active={success}
          config={confettiConfig}
        />
      </span>

      {/*<Button onClick={e => setAnchorEl(e.currentTarget)}>CLICK ME</Button>*/}
      <MuiMenu
          elevation={4}
          getContentAnchorEl={null}
          anchorEl={opened}
          onClose={() => setOpened(null)}
          open={!!opened}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
      >
      {
        useSuggestions ?
            wordList.map(word => {
              return(
                  <MuiMenuItem onClick={() => handleSubmit(word)} key={word}>
                    {word}
                  </MuiMenuItem>
              );
            }):
            <div style={{ padding: "1rem" }}>
              <TextField
                  autoFocus
                  value={input}
                  label="Translated ..."
                  onKeyPress={(e) =>
                      e.key === "Enter" && (handleSubmit(e.target.value) || setInput(""))
                  }
                  onChange={(e) => setInput(e.target.value)}
              />
            </div>
      }
      </MuiMenu>
    </span>
  );
};

/**
 * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
