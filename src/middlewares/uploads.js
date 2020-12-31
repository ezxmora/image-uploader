// Requires modules
const path = require('path');
const multer = require('multer');
const { storageFolder, maxFileSize } = require('../config/config');

const mimetypes = ['video/mp4', 'image/gif', 'image/png', 'image/jpeg'];

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, storageFolder);
    },

    filename: (request, file, callback) => {
        const renameFile = Math.random().toString(36).substring(7) + path.extname(file.originalname);
        callback(null, renameFile);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: maxFileSize * 1024 * 1024,
        files: 1
    },
    fileFilter: (request, file, callback) => {
        if (!mimetypes.includes(file.mimetype)) {
            return callback(new Error('Only, GIFs, PNGs, MP4, JPGs and JPEGs are allowed'));
        }

        callback(null, true);
    }
});

module.exports = upload;