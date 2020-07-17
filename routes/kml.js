const express = require('express');
const router = express.Router();
var multer = require('multer');
var upload = multer();
const Data = require('../models/Kml')
const DOMParser = require("xmldom").DOMParser;
const tj = require('@tmcw/togeojson');
const fs = require('fs');
const path = require('path')

router.post('/upload', async (req, res) => {

    if (!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let avatar = req.files.avatar;


        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        try {
            avatar.mv('./uploads/' + avatar.name).then(() => {
                const kml = new DOMParser().parseFromString(fs.readFileSync(path.join(__dirname, '../uploads/' + avatar.name), "utf8"));
                // const kml = new DOMParser().parseFromString(fs.readFileSync(req.files.avatar, "utf8"));
                const converted = tj.kml(kml);

                const convertedWithStyles = tj.kml(kml, {
                    styles: true
                });

                //send response
                res.json(convertedWithStyles);
            });

            // node doesn't have xml parsing or a dom. use xmldom
            // res.json({
            //     status: 200
            // });
        } catch (err) {
            res.json({
                err
            });
        }

    }

});


router.post('/', async (req, res) => {
    const kml = new DOMParser().parseFromString(fs.readFileSync("doc.kml", "utf8"));

    const converted = tj.kml(kml);

    const convertedWithStyles = tj.kml(kml, {
        styles: true
    });
    try {
        res.json(convertedWithStyles);
    } catch (err) {
        res.json({
            message: err
        });
    }

});

module.exports = router;