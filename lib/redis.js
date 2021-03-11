const redis = require('redis');

const subscriber = redis.createClient();
const publisher = redis.createClient();

module.exports = { subscriber, publisher };
