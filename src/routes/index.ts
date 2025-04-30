import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

// Example route
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API is working!' });
});

// Add more route modules here
// router.use('/users', require('./users'));

export default router;
