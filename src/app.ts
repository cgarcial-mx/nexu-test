import dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { errorHandler, notFound } from './middleware/errorHandlers';
import routes from './routes';
import logger from './utils/logger';
import { carService } from './services/carService';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // HTTP request logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Loading json file
try {
  carService.loadCarsData();
  logger.info('Car data loaded successfully');
} catch (error) {
  logger.error(`Failed to load car data: ${(error as Error).message}`);
}

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
    logger.info(`Cars API is available at http://localhost:${PORT}/api/cars`);
  });
}

// Export for testing
export default app;
