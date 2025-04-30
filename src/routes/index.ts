import express, { Router, Request, Response } from 'express';
import carRoutes from './carRoutes';

const router: Router = express.Router();

// Welcome route
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Nexu Test' });
});

// Register routes
router.use('/cars', carRoutes);

export default router;
