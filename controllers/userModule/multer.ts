import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('uploads/'));
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    }
});

const fileFilter = (req: any, file: any, cb: any) => {
    // reject a file
    if (file.mimetype === '.jpeg' || file.mimetype === '.png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    //fileFilter: fileFilter
});

export default upload ;