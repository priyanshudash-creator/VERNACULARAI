import express from 'express';
import { isDatabaseConnected } from '../config/db.js';

const router = express.Router();

router.get('/health', (req, res) => {
  const dbStatus = isDatabaseConnected() ? 'connected' : 'disconnected (using resilient in-memory engine)';

  res.status(200).json({
    status: 'ok',
    service: 'VernacularAI API Service',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())} seconds`,
    database: dbStatus,
    environment: process.env.NODE_ENV || 'development'
  });
});

export default router;
