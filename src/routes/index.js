// Required modules
const router = require('express').Router();
const Images = require('../controllers/images');

// Route declarations
router.get('/image/:id', Images.getImage);
router.post('/image/upload', Images.uploadImage);

module.exports = router;