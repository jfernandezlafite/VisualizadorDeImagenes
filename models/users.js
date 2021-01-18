const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    userName: String,
    password: String,
    name: String,
    surname: String,
    email: String,
    admin: Boolean
    
});

module.exports = mongoose.model('Users', usersSchema, 'Users' );

