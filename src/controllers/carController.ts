import { Request, Response } from 'express';
import { carService } from '../services/carService';

/**
 * Controller for car-related endpoints
 */
export const carController = {
  /**
   * Get all brands
   */
  getBrands: (req: Request, res: Response): void => {
    try {
      const brands = carService.getBrands();
      res.json(brands);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  /**
   * Get all cars
   */
  getAllCars: (req: Request, res: Response): void => {
    try {
      const cars = carService.getAllCars();
      res.json(cars);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  /**
   * Get car by ID
   */
  getCarById: (req: Request, res: Response): void => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID format' });
        return;
      }

      const car = carService.getCarById(id);
      if (!car) {
        res.status(404).json({ error: 'Car not found' });
        return;
      }

      res.json(car);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  /**
   * Get cars by brand name
   */
  getCarsByBrand: (req: Request, res: Response): void => {
    try {
      const brandName = req.params.brand;
      if (!brandName) {
        res.status(400).json({ error: 'Brand name is required' });
        return;
      }

      const cars = carService.getCarsByBrand(brandName);
      res.json(cars);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
};
