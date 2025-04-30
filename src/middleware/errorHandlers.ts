import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { CustomError, ErrorRequestHandler, RequestHandler } from '../types';

// 404 Not Found middleware
export const notFound: RequestHandler = (req, res, next) => {
  const error: CustomError = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

// General error handler
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  
  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path,
    statusCode
  });
  
  res.status(statusCode).json({
    error: {
      message: err.message,
      status: statusCode,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    }
  });
};
