const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,"https://stitch-statichosting-prod.s3.amazonaws.com/5f912719421334c99e7d637b/assets/images/")
        //cb(null,path.join(__dirname,'../app/upload'))
    },
    filename: (req,file,cb)=>{
        cb(null,`${file.originalname}`)
    }
});

module.exports = storage;