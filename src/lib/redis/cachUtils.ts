import { getClient } from "./config";

const USE_REDIS = process.env.USE_REDIS === "true";

export async function getFromCache<T>(key: string): Promise<T | null> {
  if (!USE_REDIS) return null;

  const redis = await getClient();
  const cached = await redis.get(key);

  if (cached) {
    console.log(`✅ Redis cache HIT for key: ${key}`);
    return JSON.parse(cached) as T;
  }

  console.log(`⛔ Redis cache MISS for key: ${key}`);
  return null;
}

export async function setCache<T>(
  key: string,
  value: T,
  options?: { ttlSeconds?: number },
): Promise<void> {
  if (!USE_REDIS) return;

  const redis = await getClient();
  if (options?.ttlSeconds) {
    await redis.set(key, JSON.stringify(value), { EX: options.ttlSeconds });
  } else {
    await redis.set(key, JSON.stringify(value));
  }

  console.log(`📝 Redis cache SET for key: ${key}`);
}

export async function deleteCache(key: string): Promise<void> {
  if (!USE_REDIS) return;

  const redis = await getClient();
  await redis.del(key);

  console.log(`🗑️ Redis cache DELETE for key: ${key}`);
}
