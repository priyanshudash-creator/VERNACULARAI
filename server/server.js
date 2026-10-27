import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB, disconnectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  // Connect to Database (graceful connection attempt)
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 VernacularAI Backend Server running on port ${PORT}`);
    console.log(`🌐 Base API URL: http://localhost:${PORT}/api/v1`);
    console.log(`🩺 Health Check: http://localhost:${PORT}/api/v1/health`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`=======================================================`);
  });

  const shutdown = async (signal) => {
    console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`);
    server.close(async () => {
      await disconnectDB();
      console.log('[Server] Process terminated cleanly.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  return server;
}

startServer().catch(err => {
  console.error('[Fatal Error] Failed to start server:', err);
  process.exit(1);
});
