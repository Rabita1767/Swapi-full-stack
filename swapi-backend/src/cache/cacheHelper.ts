import {redisClient,redisConnected} from "./redisClient";

export const getCache = async (key: string): Promise<any> => {
  if (!redisConnected) {
      console.warn(`⚠️ Redis not connected. Skipping cache retrieval for key: ${key}`);
      return null; // Fallback: No cache
  }

  try {
      console.log("Getting cache for key:", key);
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
  } catch (err) {
      console.error("⚠️ Redis GET error:", err);
      return null; // Fallback: No cache
  }
};

export const setCache = async (key: string, value: any, ttlSeconds: number = 600): Promise<void> => {
  if (!redisConnected) {
      console.warn(`⚠️ Redis not connected. Skipping cache storage for key: ${key}`);
      return; // Fallback: No cache
  }

  try {
      // console.log("Setting cache for key:", key, "with value:", value);
      await redisClient.set(key, JSON.stringify(value), { EX: ttlSeconds });
  } catch (err) {
      console.error("⚠️ Redis SET error:", err);
  }
};