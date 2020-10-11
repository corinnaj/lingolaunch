import {
  Button,
  Checkbox,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import Confetti from "react-dom-confetti";
import { confettiConfig } from "./PartialTranslationParagraph";
import { AddShoppingCart, Apartment } from "@material-ui/icons";

export function PictureGame() {
  const [tasks, setTasks] = useState(null);

  const challenges = [
    {
      title: "A Walk Through the Streets",
      icon: () => <Apartment />,
      tasks: [
        {
          check: (text) => text.toLowerCase().includes("straße"),
          label: 'Take a photo of a label containing "Straße"',
        },
        {
          check: (text) => text.toLowerCase().includes("weg"),
          label: 'Take a photo of a label containing "Weg"',
        },
      ],
    },
    {
      title: "Skimming the Supermarket",
      icon: () => <AddShoppingCart />,
      tasks: [
        {
          check: (text) => text.toLowerCase().includes("käse"),
          label: 'Take a photo of a label containing "Käse"',
        },
        {
          check: (text) => text.toLowerCase().includes("wurst"),
          label: 'Take a photo of a label containing "Wurst"',
        },
      ],
    },
  ];

  return tasks ? (
    <PictureGameTasks tasks={tasks} />
  ) : (
      <div
        style={{
          background: "#000",
          color: "#fff",
          minHeight: "calc(100vh - 56px)",
          overflow: "hidden",
        }}
      >
        <Typography style={{ margin: "2rem" }} variant="h4">
          Pick Your Challenge!
      </Typography>
        {challenges.map((challenge) => (
          <Button
            variant="contained"
            onClick={() => setTasks(challenge.tasks)}
            style={{ margin: "1rem 2rem" }}
          >
            {challenge.icon()} {challenge.title}
          </Button>
        ))}
      </div>
    );
}

function PictureGameTasks({ tasks }) {
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
        idealFacingMode={FACING_MODES.ENVIRONMENT}
        onTakePhoto={(dataUri) => {
          setLoading(true);
          window
            .fetch("/upload-image", {
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
                if (!completed[i] && tasks[i].check(json.text))
                  setCompleted((list) =>
                    list.map((c, index) => (index === i ? !c : c))
                  );
              }
            });
        }}
      />

      <div style={{ padding: "3rem" }}>
        <p>
          {loading && (
            <div>
              <CircularProgress />
            </div>
          )}
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
