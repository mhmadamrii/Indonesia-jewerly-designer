import { createClient } from "redis";

export const client = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: 18520,
  },
});

export async function connectRedis() {
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();

  client.on("error", (err) => {
    console.error("❌ Redis Client Error", err);
  });

  let isConnected = false;
  if (!isConnected) {
    await client.connect();
    isConnected = true;
    console.log("✅ Redis connected");
  }
}
