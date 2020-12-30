const express = require("express");
const router = express.Router();
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

router.post('', function(req, res){
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

module.exports = router;