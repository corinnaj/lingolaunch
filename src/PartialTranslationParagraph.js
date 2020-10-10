import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { TextField } from "@material-ui/core";
import { Dictionary } from "./Dictionary";

export const T = ({ german, english }) => {
  const [opened, setOpened] = useState(false);
  const { confirmWord, getWord } = useContext(Dictionary);

  const handleSubmit = (answer) => {
    if (confirmWord(english, answer)) {
      setOpened(false);
      return true;
    }
    return false;
  };

  const colors = ["emerald", "gold", "silver", "bronze"];

  return (
    <span style={{ position: "relative" }}>
      <motion.span
        className={
          "partial-translation " + (colors[getWord(german)] ?? "completed")
        }
        onClick={() => setOpened(true)}
        whileHover={{ scale: [1, 1.1] }}
        transition={{
          ease: "linear",
          repeat: 4,
          duration: 0.3,
          repeatType: "reverse",
        }}
      >
        {german}
      </motion.span>
      {opened && <PartialTranslationOverlay onSubmit={handleSubmit} />}
    </span>
  );
};

const PartialTranslationOverlay = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  return (
    <div className="partial-translation-overlay">
      <TextField
        autoFocus
        value={input}
        label="Translated ..."
        onKeyPress={(e) =>
          e.key === "Enter" && (onSubmit(e.target.value) || setInput(""))
        }
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};
