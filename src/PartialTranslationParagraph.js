import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { TextField } from "@material-ui/core";
import { Dictionary } from "./Dictionary";
import Confetti from "react-dom-confetti";

const confettiConfig = {
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

export const T = ({ w: german, readonly }) => {
  const [opened, setOpened] = useState(false);
  const { confirmWord, getWordCount } = useContext(Dictionary);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (answer) => {
    if (confirmWord(german, answer)) {
      setSuccess(true);
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
          "partial-translation " + (colors[getWordCount(german)] ?? "completed")
        }
        onClick={() => !readonly && !success && setOpened((o) => !o)}
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
      <div className="confetti-wrapper">
        <Confetti
          style={{ position: "absolute" }}
          active={success}
          config={confettiConfig}
        />
      </div>
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
