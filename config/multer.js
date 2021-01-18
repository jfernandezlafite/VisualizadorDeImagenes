const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        //cb(null,"https://api.cloudinary.com/v1_1/visualizador-de-imagenes/image/upload/")
        cb(null,path.join(__dirname,'../app/upload'))
    },
    filename: (req,file,cb)=>{
        cb(null,`${file.originalname}`)
    }
});

module.exports = storage;