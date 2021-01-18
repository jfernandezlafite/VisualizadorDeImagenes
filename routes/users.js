const express = require("express");
const router = express.Router();
const users = require('../models/users');

// GET ALL USER
router.get('/:name', function(req, res){
    var name = req.params.name;
    var query = users.findOne({"userName":name});
    query.exec(function( err , foundusers) {
        res.json(foundusers);
    });
});

// NEW USER
router.post('/newUser', function(req, res){
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

        var user = {
            userName: req.body.userName,
            password: req.body.password,
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            admin: req.body.admin
        }
        users.watch()
        users.create(user, function (err, res) {
            if (err) return handleError(err);
        });
    }
});

// UPDATE USER BY ID
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
        const query = users.findOneAndUpdate({ "id": id }, { "name": req.body.name });
        query.exec();
    }
})

// DELETE USERUSER BY ID
router.post('/delete/:id', function (req, res, next) {
    var id = req.params.id;
    const query = users.findOneAndDelete({ "id": id });
    query.select("-_id -__v");
    // execute the query at a later time
    query.exec(function (err, user) {
        if (err) return handleError(err);
        console.log(user)
        res.send(user);
    });
});

module.exports = router;