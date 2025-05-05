import dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler, notFound } from './middleware/errorHandlers';
import routes from './routes';
import logger from './utils/logger';
import { initializeDatabase } from './utils/dbInitializer';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // HTTP request logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Initialize database with data from JSON file
initializeDatabase()
  .then(() => {
    logger.info('Database initialized successfully');
  })
  .catch((error) => {
    logger.error(`Failed to initialize database: ${(error as Error).message}`);
  });

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
    logger.info(`API is available at http://localhost:${PORT}/api`);
  });
}

// Export for testing
export default app;
