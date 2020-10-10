import {
  Button,
  ButtonGroup,
  Checkbox,
  CircularProgress,
  FilledInput,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  TextField,
  Typography,
} from "@material-ui/core";
import { PlaylistAdd, PlaylistAddCheck, Send } from "@material-ui/icons";
import React, { useState } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { translate } from "./Dictionary";

export function Translate() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [textToTranslate, setTextToTranslate] = useState("");
  const [targetLanguageCode, setTargetLanguageCode] = useState("de");
  const [wordAdded, setWordAdded] = useState(false);

  const translateText = async () => {
    try {
      setLoading(true);
      setWordAdded(false);
      setTranslatedText(await translate(textToTranslate, "en"));
    } finally {
      setLoading(false);
    }
  };

  const addWord = () => {
    setWordAdded(true);
    // TODO add to dict via corinnas code
  };

  return (
    <div>
      <div style={{ padding: "1rem" }}>
        {translatedText && (
          <>
            <Typography variant="overline">Translation</Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5">{translatedText}</Typography>
              <div style={{ flexGrow: 1 }}></div>
              <IconButton disabled={wordAdded} onClick={addWord}>
                {wordAdded ? <PlaylistAddCheck /> : <PlaylistAdd />}
              </IconButton>
            </div>
          </>
        )}
        {loading && (
          <div>
            <CircularProgress />
          </div>
        )}

        <ButtonGroup
          color="primary"
          aria-label="outlined primary button group"
          style={{ margin: "1rem 0" }}
        >
          <Button
            onClick={() => setTargetLanguageCode("de")}
            disableElevation
            variant={targetLanguageCode === "de" ? "contained" : "outlined"}
          >
            DE
          </Button>
          <Button
            onClick={() => setTargetLanguageCode("en")}
            disableElevation
            variant={targetLanguageCode === "en" ? "contained" : "outlined"}
          >
            EN
          </Button>
        </ButtonGroup>

        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="text-translate">
            Enter text to translate ...
          </InputLabel>
          <OutlinedInput
            autoFocus
            id="text-translate"
            variant="outlined"
            onKeyPress={(e) => e.key === "Enter" && translateText()}
            fullWidth
            value={textToTranslate}
            onChange={(e) => setTextToTranslate(e.target.value)}
            labelWidth={180}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  disabled={loading}
                  onClick={translateText}
                  edge="end"
                >
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
