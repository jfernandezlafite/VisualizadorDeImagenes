const express = require("express");
const router = express.Router();
const multipart = require("connect-multiparty");
const imagenes = require('../models/imagenes');

router.get('', function(req, res){
    var query = imagenes.find();
    query.exec(function( err , foundimageness) {
        res.json(foundimageness);
    });
});

router.get('/:id', function(req, res){
    var id = req.params.id;
    var query = imagenes.findOne({"id":id});
    console.log(query);
    query.exec(function( err , foundimageness) {
        res.json(foundimageness);
    });
});

const multiPartMiddleware = multipart({
    uploadDir:'https://application-0-emvrx.mongodbstitch.com/assets/images';
});

router.post('/upload', function(req, res){
    res.json({'mensaje':'Fichero subido'});
});

module.exports = router;
