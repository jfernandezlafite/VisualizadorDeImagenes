const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    id: Number,
    idForo: Number,
    idUsuario:String,
    createdAt:String,
    respuesta: String
    
});

module.exports = mongoose.model('Post', postsSchema, 'Post' );

