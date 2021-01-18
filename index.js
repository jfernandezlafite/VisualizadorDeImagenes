const express = require("express");
const cors = require('cors');
const mongoose  = require('mongoose');
const config = require('./config/dev');
const path = require('path');

const imagenesRoutes = require('./routes/imagenes');
const userRoutes = require('./routes/users');
const foroRoutes = require('./routes/foro');
const topicRoutes = require('./routes/post');

//iniziaclizaciones
var app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//static files
app.use(express.static(path.join(__dirname,"app/upload")));

//database connection
mongoose.connect(config.DB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(db => console.log("db is on"))
.catch(error => console.log(error));

//routes
app.use("/imagenes/", imagenesRoutes);
app.use("/imagenes/:id", imagenesRoutes);
app.use("/imagenes/upload", imagenesRoutes);
app.use("/imagenes/newImage", imagenesRoutes);
app.use("/usuarios/", userRoutes);
app.use("/usuarios/:name", userRoutes);
app.use("/usuarios/newUser", userRoutes);
app.use("/foro/", foroRoutes);
app.use("/foro/update/:id", foroRoutes);
app.use("/foro/newforo", foroRoutes);
app.use("/foro/topics/", topicRoutes);
app.use("/foro/topics/:id", topicRoutes);
app.use("/foro/topics/newPost/:id", topicRoutes);

//listening server
const port = process.env.PORT || config.Port;
app.listen(port,function(req,res){
    console.log("Server is started on port "+port);
});