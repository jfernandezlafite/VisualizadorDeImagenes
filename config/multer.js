const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        //cb(null,"https://application-0-emvrx.mongodbstitch.com/assets/images/")
        cb(null,path.join(__dirname,'../app/upload'))
    },
    filename: (req,file,cb)=>{
        cb(null,`${file.originalname}`)
    }
});

module.exports = storage;