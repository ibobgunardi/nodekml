const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const fileUpload = require('express-fileupload');
const _ = require('lodash');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv/config');


// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(morgan('dev'));
//import routes
const postRoute = require('./routes/posts');
const kmlRoute = require('./routes/kml');
app.use(cors());
app.use('/posts', postRoute);
app.use('/kml', kmlRoute);
mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log('bismillah');
    });



app.listen(3000);