import {
  Checkbox,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import React, { useState } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { dictionary } from "./Dictionary";

export function Translate() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [textToTranslate, setTextToTranslate] = useState("");

  const translateText = async () => {
    try {
      setLoading(true);
      setTranslatedText(await dictionary.translate(textToTranslate));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {translatedText && <>Translated: {translatedText}</>}
      {loading && (
        <div>
          <CircularProgress />
        </div>
      )}

      <div style={{ padding: "1rem" }}>
        <FormControl>
          <InputLabel>Password</InputLabel>
          <Input
            label="Enter Text to translate ..."
            variant="outlined"
            fullWidth
            value={textToTranslate}
            onChange={(e) => setTextToTranslate(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={translateText}>
                  <Send />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <div style={{ padding: "1rem" }}>Or take a picture ...</div>

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
            });
        }}
      />
      <div>{text && <>Found Text: {text}</>}</div>
    </div>
  );
}
