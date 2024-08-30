const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();

// Load environment variables
require('dotenv').config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

router.post('/upload-to-s3', (req, res) => {
    const base64Image = req.body.image;
    const buffer = Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const fileName = `uploads/${Date.now()}.jpeg`;

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.error('Error uploading image:', err);
            return res.status(500).send(err);
        }
        res.status(200).send({ imageUrl: data.Location });
    });
});

module.exports = router;