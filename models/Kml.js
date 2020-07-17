const mongoose = require('mongoose');


const kmlSchema = mongoose.Schema({
    geojson: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Kml', kmlSchema);