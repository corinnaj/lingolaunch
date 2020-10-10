const Vision = require('@google-cloud/vision');
const vision = new Vision.ImageAnnotatorClient();

const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate();

let bucketName = "lingolaunch_images";
const filename = 'menu.jpg';

async function things() {
    const [textDetections] = await vision.textDetection(
        `gs://${bucketName}/${filename}`
      );
      const [annotation] = textDetections.textAnnotations;
      const text = annotation ? annotation.description : '';
      console.log(`Extracted text from image:`, text);
    
      let [translateDetection] = await translate.detect(text);
      if (Array.isArray(translateDetection)) {
        [translateDetection] = translateDetection;
      }

      const [translation] = await translate.translate(text, "en");
      console.log(`Translated Text:`, translation);

    return "done"
}

things();