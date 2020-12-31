// Required modules
const Redis = require("ioredis");
const { redisDB } = require('../config/config');

const db = new Redis(redisDB);

db.on('error', (err) => {
    console.log(`There was an error in the database: ${err}`);
});

module.exports = db;