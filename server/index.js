const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const _ = require("lodash");

const Vision = require("@google-cloud/vision");
const vision = new Vision.ImageAnnotatorClient();

const { Translate } = require("@google-cloud/translate").v2;
const translate = new Translate();

const app = express();

async function translateText(text, targetLanguageCode) {
  const [translation] = await translate.translate(text, targetLanguageCode);
  return translation;
}

async function translateImage(imageBuffer) {
  const [textDetections] = await vision.textDetection(imageBuffer);
  const [annotation] = textDetections.textAnnotations;
  const text = annotation ? annotation.description : "";
  console.log(`Extracted text from image:`, text);

  /*let [translateDetection] = await translate.detect(text);
  if (Array.isArray(translateDetection)) {
    [translateDetection] = translateDetection;
  }*/

  const [translation] = await translate.translate(text, "en");
  console.log(`Translated Text:`, translation);

  return { translation, text };
}

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// send a base64 encoded image as a json payload
app.post("/upload-image", async (req, res) => {
  try {
    res.send(await translateImage(Buffer.from(req.body.base64, "base64")));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.post("/translate", async (req, res) => {
  try {
    res.send({
      translated: await translateText(
        req.body.text,
        req.body.targetLanguageCode
      ),
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App is listening on port ${port}.`));
