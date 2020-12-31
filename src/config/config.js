const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT_IMAGES,
    redisDB: process.env.REDIS_DB,
    storageFolder: process.env.IMAGES_STORAGE,
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10)
}