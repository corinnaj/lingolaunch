const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const Vision = require('@google-cloud/vision');
const vision = new Vision.ImageAnnotatorClient();

const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate();

const app = express();

let bucketName = "lingolaunch_images";
//const filename = 'menu.jpg';

// do magic google stuff here
async function things(filename) {
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

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//cadd other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// start app 
const port = process.env.PORT || 8000;

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);

app.post('/upload-image', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            // Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let image = req.files.image;

            // Use the mv() method to place the file in upload directory (i.e. "uploads")
            image.mv('./uploads/' + image.name);

            // send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: image.name,
                    mimetype: image.mimetype,
                    size: image.size
                }
            });

            things(image.name);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});