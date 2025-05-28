import {redisClient} from "../cache/redisClient";

const clearAllCache = async () => {
  try {
    const keys = await redisClient.keys('*'); // Or use 'search:*' to filter specific keys
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`✅ Deleted ${keys.length} keys from Redis.`);
    } else {
      console.log('ℹ️ No keys found to delete.');
    }
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing Redis cache:', error);
    process.exit(1);
  }
};

clearAllCache();
