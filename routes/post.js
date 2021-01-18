const express = require("express");
const router = express.Router();
const posts = require('../models/post');

// GET ALL POST
router.get('', function(req, res){
    var query = posts.find();
    query.exec(function( err , foundposts) {
        res.json(foundposts);
    });
});

// NEW POST
router.post('/newPost', function(req, res){
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

        var post = {
            id: req.body.id,
            idForo: req.body.idForo,
            respuesta: req.body.respuesta,
        }
        posts.watch()
        posts.create(post, function (err, res) {
            if (err) return handleError(err);
        });
    }
});

// UPDATE POST BY ID
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
        const query = posts.findOneAndUpdate({ "id": id }, { "name": req.body.name });
        query.exec();
    }
})

// DELETE POST BY ID
router.post('/delete/:id', function (req, res, next) {
    var id = req.params.id;
    const query = posts.findOneAndDelete({ "id": id });
    query.select("-_id -__v");
    // execute the query at a later time
    query.exec(function (err, post) {
        if (err) return handleError(err);
        console.log(post)
        res.send(post);
    });
});

module.exports = router;