const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forosSchema = new Schema({
    id: Number,
    title: String,
    numRespuestas: Number
    
});

module.exports = mongoose.model('foros', forosSchema, 'foros' );

