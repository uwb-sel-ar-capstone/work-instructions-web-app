/**
 * Connects to the redis client when module is first loaded.
 */
const redis = require("redis");
require("dotenv").config();

const HOSTNAME = process.env.REDIS_HOSTNAME || "127.0.0.1";
const PORT = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient({
  socket: {
    host: HOSTNAME,
    port: PORT,
  },
});

redisClient.on("ready", () => {
  console.log(`Connected to Redis server at ${HOSTNAME}:${PORT}`);
});

redisClient.connect();

module.exports = redisClient;
