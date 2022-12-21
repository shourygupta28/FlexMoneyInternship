import express from 'express';
import multer from 'multer';
// import { isAuth } from '../utils.js';
// import path from 'path';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/');
    },
    filename(req, file, cb){
        // console.log(file);
        cb(null, `${file.fieldname}-${Date.now()}.jpg`)
    },
});

// function checkFileType(file, cb){
//     const fileTypes = /jpg|jpeg|png/
//     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = fileTypes.test(file.mimetype);

//     if(extname && mimetype) {
//         return cb(null, true)
//     } else {
//         cb('Images Only!')
//     }
// }${path.extname(file.originalname)}

const upload = multer({
    storage,
    limits: {fileSize: 1000000},
    // fileFilter: function(req, file, cb) {
    //     checkFileType(file, cb)
    // }
});

uploadRouter.post('/', upload.array('images', 1), (req, res) => {
    const files = req.files;
    if(!files){
        console.log('No files')
    }
    // res.send(`/${files.path}`);
    res.send(files);
    // const elementArray = [];
    // for(let i=0; i<files.length; i++ ){
    //     const element = files[i];
    //     elementArray.push(element.path);
    // }
    // res.send({elementArray});
});

export default uploadRouter;