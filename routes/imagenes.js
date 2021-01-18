const express = require("express");
const router = express.Router();
const imagenes = require('../models/imagenes');
const storage = require('../config/multer');
const multer = require('multer');
const cloudinary = require('cloudinary');

// GET ALL IMAGES
router.get('', function(req, res){
    var query = imagenes.find().limit(0);
    query.exec(function( err , foundimageness) {
        res.json(foundimageness);
    });
});

// GET IMAGE BY ID
router.get('/:id', function(req, res){
    var id = req.params.id;
    var query = imagenes.findOne({"id":id});
    console.log(query);
    query.exec(function( err , foundimageness) {
        res.json(foundimageness);
    });
});

// UPLOAD & NEW IMAGE
cloudinary.config({
    cloud_name:'visualizador-de-imagenes',
    api_key:'743837978978724',
    api_secret:'-cmbDzqG_6L8jblba_tmQssq7IM'
});

const uploader = multer({
    storage
}).single('file')

var rutaImagen = "";
router.post('/upload', uploader, async (req, res) => {
    const {body, file} = req
    if(file && body){
        const result = await cloudinary.v2.uploader.upload(file.path);
        console.log(result);
        res.json(result);
    }
})

router.post('/newImage', function(req, res){
    if (!req.body) {
        return res.status(400).json({
            status: 'error',
            error: 'req body cannot be empty',
        });
    } else {
        res.status(200).json({
            status: 'succes',
            data: req.body,
        });

        var imagen = {
            id: req.body.id,
            name: req.body.name,
            author: req.body.author,
            tags: req.body.tags,
            characters: req.body.characters,
            serie: req.body.serie,
            url: req.body.url,
            uploadDate: req.body.uploadDate,
            likes: 0,
            dislikes: 0
        }
        imagenes.watch()
        imagenes.create(imagen, function (err, res) {
            if (err) return handleError(err);
        });
    }
});

// UPDATE IMAGE BY ID
router.post('/update/:id', function (req, res, next) {
    if (!req.body) {
        return res.status(400).json({
            status: 'error',
            error: 'req body cannot be empty',
        });
    } else {
        res.status(200).json({
            status: 'succes',
            data: req.body,
        });
        var id = req.params.id;
        const query = Character.findOneAndUpdate({ "id": id }, { "name": req.body.name });
        query.exec();
    }
})

// DELETE IMAGE BY ID
router.post('/delete/:id', function (req, res, next) {
    var id = req.params.id;
    const query = Character.findOneAndDelete({ "id": id });
    query.select("-_id -__v");
    // execute the query at a later time
    query.exec(function (err, character) {
        if (err) return handleError(err);
        console.log(character)
        res.send(character);
    });
});

module.exports = router;