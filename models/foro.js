const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forosSchema = new Schema({
    id: Number,
    title: String,
    numRespuestas: Number,
    createdAt:String
    
});

module.exports = mongoose.model('Foro', forosSchema, 'Foro' );

