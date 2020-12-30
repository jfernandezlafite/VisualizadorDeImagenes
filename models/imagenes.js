const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagenesSchema = new Schema({
    id: Number,
    name: String,
    author: String,
    tags: Array,
    characters: Array,
    serie: String,
    url: String,
    uploadDate: String,
    likes: Number,
    dislikes: Number
});

module.exports = mongoose.model('Imagenes', imagenesSchema, 'Imagenes' );

