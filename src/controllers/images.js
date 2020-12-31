// Required modules
const multer = require('multer');
const upload = require('../middlewares/uploads');
const db = require('../database/index');
const path = require('path');

module.exports = {
    getImage: (request, response) => {
        db.get(request.params.id.trim(), (error, responseDB) => {
            if (error) {
                response.status(500).json({
                    ok: false,
                    error: 'INTERNAL_SERVER_ERROR',
                    message: 'There was an internal server error :('
                });
            } else if (!responseDB) {
                response.status(404).json({
                    ok: false,
                    error: 'FILE_DOESNT_EXIST',
                    message: 'That file doesn\'t exist'
                });
            } else {
                const filename = `${path.dirname(require.main.filename)}\\${responseDB}`;
                response.sendFile(filename, (err) => {
                    if (err) {
                        if (err.code === "ECONNABORT" && response.statusCode == 304) {
                            // No problem, 304 means client cache hit, so no data sent.
                            console.log('304 cache hit for ' + filename);
                            return;
                        }
                        console.log("SendFile error:", err, " (status: " + err.status + ")");
                        if (err.status) {
                            response.status(err.status).end();
                        }
                    }
                    else {
                        console.log('Sent:', filename);
                    }
                })
            }
        });
    },

    uploadImage: (request, response) => {
        upload.single('fileUpload')(request, response, (error) => {
            if (error instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                response.status(400).json({
                    ok: false,
                    error: error.code,
                    message: error.message
                });
            } else if (error) {
                // An unknown error occurred when uploading.
                response.status(500).json({
                    ok: false,
                    error
                });
            } else {
                db.set(request.file.filename.split('.')[0], request.file.path)
                    .then((res) => {
                        if (res == "OK") {
                            response.status(200).json({
                                ok: true,
                                path: `/image/${request.file.filename}`
                            });
                        }
                    });
            }
        })
    }
}
