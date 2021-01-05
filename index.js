const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose  = require('mongoose');
const config = require('./config/dev');
const imagenesRoutes = require('./routes/imagenes');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//database connection
mongoose.connect(config.DB_URI,{ useNewUrlParser: true,useUnifiedTopology: true } );
mongoose.connection.on("error", function (error) { console.log(error)})

app.use("/imagenes/", imagenesRoutes);
app.use("/imagenes/:id", imagenesRoutes);
app.use("/imagenes/upload", imagenesRoutes);
const port = process.env.PORT || config.Port;

app.listen(port,function(req,res){
    console.log("Server is started on port "+port);
});
