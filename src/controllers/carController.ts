import { Request, Response } from 'express';
import { carService } from '../services/carService';
import { Car } from '../types/models';

/**
 * Controller for car-related endpoints
 */
export const carController = {
  /**
   * Get all brands
   */
  getBrands: async (req: Request, res: Response): Promise<void> => {
    try {
      const brands = await carService.getBrands();
      res.json(brands);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  /**
   * Get cars by brand name
   */
  getCarsByBrand: async (req: Request, res: Response): Promise<void> => {
    try {
      const brandId = req.params.brandId;
      if (!brandId) {
        res.status(400).json({ error: 'Brand ID is required' });
        return;
      }

      const cars = await carService.getCarsByBrand(parseInt(brandId, 10));
      res.json(cars);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  /**
   * Create a new brand
   */
  createBrand: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.body;

      if (!name) {
        res.status(400).json({ error: 'Brand name is required' });
        return;
      }

      const newBrand = await carService.createBrand(name);
      res.status(201).json(newBrand);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  /**
   * Create a new model for a specific brand
   */
  createModel: async (req: Request, res: Response): Promise<void> => {
    try {
      const brandName = req.params.brandName;
      const { name, averagePrice } = req.body;

      if (!brandName) {
        res.status(400).json({ error: 'Brand name is required' });
        return;
      }

      if (!name) {
        res.status(400).json({ error: 'Model name is required' });
        return;
      }

      if (averagePrice === undefined || averagePrice === null) {
        res.status(400).json({ error: 'Average price is required' });
        return;
      }

      const newModel = await carService.createModel(
        brandName,
        name,
        averagePrice,
      );
      res.status(201).json(newModel);
    } catch (error) {
      if ((error as Error).message.includes('Brand not found')) {
        res.status(404).json({ error: (error as Error).message });
      } else {
        res.status(500).json({ error: (error as Error).message });
      }
    }
  },

  /**
   * Edit a model's price
   */
  editModel: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const { averagePrice } = req.body;

      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID format' });
        return;
      }

      if (averagePrice === undefined || averagePrice === null) {
        res.status(400).json({ error: 'Average price is required' });
        return;
      }

      const updatedModel = await carService.editModelPrice(id, averagePrice);
      if (!updatedModel) {
        res.status(404).json({ error: 'Model not found' });
        return;
      }

      res.json(updatedModel);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
};
