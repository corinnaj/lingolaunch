import {
  Checkbox,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import Confetti from "react-dom-confetti";
import { confettiConfig } from "./PartialTranslationParagraph";
import { translate } from "./Dictionary";

export function Translate() {
  const tasks = [
    {
      check: (text) => text.includes("Straße"),
      label: 'Take a photo of a label containing "Straße"',
    },
    {
      check: (text) => text.includes("Weg"),
      label: 'Take a photo of a label containing "Weg"',
    },
  ];

  const [completed, setCompleted] = useState(() => {
    const bools = [];
    for (let i = 0; i < tasks.length; i++) bools.push(false);
    return bools;
  });

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "calc(100vh - 56px)",
      }}
    >
      <Camera
        onTakePhoto={(dataUri) => {
          setLoading(true);
          window
            .fetch("http://localhost:8000/upload-image", {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                base64: dataUri.substring("data:image/png;base64,".length),
              }),
            })
            .then((res) => res.json())
            .then((json) => {
              setText(json.text);
              setTranslatedText(json.translation);
              setLoading(false);
              console.log(json);
              for (var i = 0; i < tasks.length; i++) {
                if (!completed[i] && tasks[i].check(json.translation))
                  setCompleted((list) =>
                    list.map((c, index) => (index === i ? !c : c))
                  );
              }
            });
        }}
      />

      <div style={{ padding: "3rem" }}>
        <p>
          {loading && <CircularProgress />}
          {text && <>Found Text: {text}</>}
          <br />
          {translatedText && <>Translated: {translatedText}</>}
        </p>

        <Typography variant="h4">Your current Tasks:</Typography>
        <List>
          {tasks.map(({ label }, index) => (
            <ListItem key={label} dense>
              <ListItemIcon>
                <Checkbox edge="start" checked={completed[index]} readOnly />
              </ListItemIcon>
              <div className="confetti-wrapper">
                <Confetti
                  style={{ position: "absolute" }}
                  active={completed[index]}
                  config={confettiConfig}
                />
              </div>
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
