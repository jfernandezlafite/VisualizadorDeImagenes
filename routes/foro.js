const express = require("express");
const router = express.Router();
const foros = require('../models/foro');

// GET ALL foro
router.get('', function(req, res){
    var query = foros.find();
    query.exec(function( err , foundforos) {
        res.json(foundforos);
    });
});

// NEW foro
router.foro('/newforo', function(req, res){
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

        var foro = {
            id: req.body.id,
            title: req.body.title,
            numRespuestas: req.body.numRespuestas,
        }
        foros.watch()
        foros.create(foro, function (err, res) {
            if (err) return handleError(err);
        });
    }
});

// UPDATE foro BY ID
router.foro('/update/:id', function (req, res, next) {
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
        const query = foros.findOneAndUpdate({ "id": id }, { "numRespuestas": numRespuestas });
        query.exec();
    }
})

// DELETE foro BY ID
router.foro('/delete/:id', function (req, res, next) {
    var id = req.params.id;
    const query = foros.findOneAndDelete({ "id": id });
    query.select("-_id -__v");
    // execute the query at a later time
    query.exec(function (err, foro) {
        if (err) return handleError(err);
        console.log(foro)
        res.send(foro);
    });
});

module.exports = router;