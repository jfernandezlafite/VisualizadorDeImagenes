const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    id: Number,
    idForo: Number,
    respuesta: String
    
});

module.exports = mongoose.model('posts', postsSchema, 'posts' );

