import express, { Router } from 'express';
import { carController } from '../controllers/carController';

const router: Router = express.Router();

/**
 * @route   GET /api/brands
 * @desc    Get all cars
 * @access  Public
 */
router.get('/brands', carController.getBrands);

/**
 * @route   GET /api/brands/:brandName/models
 * @desc    Get cars by brand name
 * @access  Public
 */
router.get('/brands/:brandName/models', carController.getCarsByBrand);

/**
 * @route   POST /api/brands
 * @desc    Create new brand
 * @access  Public
 */
router.post('/brands', carController.createBrand);

/**
 * @route   POST /api/brands/:brandName/models
 * @desc    Create new model in specific brand
 * @access  Public
 */
router.post('/brands/:brandName/models', carController.createModel);

/**
 * @route   PUT /api/models/:id
 * @desc    Edit average price of a model
 * @access  Public
 */
router.put('/models/:id', carController.editModel);

/**
 * @route   GET /api/models
 * @desc    Get all models
 * @access  Public
 */
router.get('/models', carController.getAllModels);

export default router;
