import { getClient } from "./config";

type CacheOptions = {
  ttlSeconds?: number; // time-to-live in seconds
};

export async function getFromCache<T>(key: string): Promise<T | null> {
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
  options?: CacheOptions,
): Promise<void> {
  const redis = await getClient();
  const ttl = options?.ttlSeconds;

  if (ttl) {
    await redis.set(key, JSON.stringify(value), { EX: ttl });
  } else {
    await redis.set(key, JSON.stringify(value));
  }

  console.log(`📝 Redis cache SET for key: ${key}${ttl ? ` (TTL: ${ttl}s)` : ""}`);
}

export async function deleteCache(key: string): Promise<void> {
  const redis = await getClient();
  await redis.del(key);
  console.log(`🗑️ Redis cache DELETE for key: ${key}`);
}
