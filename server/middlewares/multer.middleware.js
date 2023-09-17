import path from 'path';
import multer from 'multer';

const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 50 * 1024 * 1024 },
    storage: multer.diskStorage({
        destination: 'uploads/',
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
        fileFilter: (req, res, cb) => {
            let ext = path.extname(file.originalname);
            if (
                ext !== '.jpg' &&
                ext !== '.png' &&
                ext !== '.webp' &&
                ext !== '.mp4' &&
                ext !== '.jpeg'
            ) {
                cb(new Error(`Unsupported file-type ${ext}`), false);
            }
            cb(null, true);
        },
    }),
});

export default upload;
