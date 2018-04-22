const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const pharmaSchema = new Schema({

    datasetid : String,
    fields : {commune : String, rs: String, lng: Number, lat: Number}
    


});

// define collections and schema
const pharma = mongoose.model('pharmacies', pharmaSchema);

module.exports.pharma = pharma;