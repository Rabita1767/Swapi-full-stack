import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import characterRoutes from './routes/character.route';
import { errorHandler } from './middlewares/error.middleware';
import { redisConnected } from './cache/redisClient';

dotenv.config();

const app = express();
app.use((req, res, next) => {
  next();
});
app.use(cors());
app.use(express.json());
// Log Redis connection status
if (!redisConnected) {
  console.warn("⚠️ Redis is not connected. Caching functionality will be disabled.");
} else {
  console.log("✅ Redis is connected. Caching is enabled.");
}
app.use("/api/characters", characterRoutes);
app.use(errorHandler)

const PORT = process.env.PORT ?? 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
