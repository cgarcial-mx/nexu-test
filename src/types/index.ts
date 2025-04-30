import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
  status?: number;
}

export interface LogEntry {
  message: string;
  stack?: string;
  method?: string;
  path?: string;
  statusCode?: number;
}

export interface JsonData {
  [key: string]: any;
}

export interface ErrorResponse {
  error: {
    message: string;
    status: number;
    stack?: string;
  };
}

export type ErrorRequestHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
