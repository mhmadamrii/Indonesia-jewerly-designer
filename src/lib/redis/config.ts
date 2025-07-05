import { createClient } from "redis";

const redisClient = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: 18520,
  },
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Client Error", err);
});

redisClient.on("connect", () => {
    console.log("✅ Redis connected");
});

async function getClient() {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
    return redisClient;
}

export { getClient };