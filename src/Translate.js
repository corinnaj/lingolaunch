import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

export function Translate() {
  const tasks = [
    {
      check: (response) => response.text.includes("Straße"),
      label: 'Take a photo of a label containing "Straße"',
    },
    {
      check: (response) => response.text.includes("Weg"),
      label: 'Take a photo of a label containing "Weg"',
    },
  ];

  const [completed, setCompleted] = useState(() => {
    const bools = [];
    for (let i = 0; i < tasks.length; i++) bools.push(false);
    return bools;
  });

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "calc(100vh - 56px)",
      }}
    >
      <Camera
        onTakePhoto={(dataUri) =>
          // Buffer.from(req.body, 'base64')
          {
            /* Buffer.from(req.body, 'base64')*/
            console.log(dataUri);
            window
              .fetch("http://localhost:8000/detect", {
                method: "post",
                body: dataUri.substring("data:image/png;base64,".length),
              })
              .then((json) => {
                for (var i = 0; i < tasks.length; i++) {
                  if (!completed[i] && tasks[i].check(json))
                    setCompleted((list) =>
                      list.map((c, index) => (index === i ? !c : c))
                    );
                }
              });
          }
        }
      />

      <div style={{ padding: "3rem" }}>
        <Typography variant="h4">Your current Tasks:</Typography>
        <List>
          {tasks.map(({ label }, index) => (
            <ListItem key={label} dense>
              <ListItemIcon>
                <Checkbox edge="start" checked={completed[index]} readOnly />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
