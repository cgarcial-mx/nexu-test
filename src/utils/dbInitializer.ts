import fs from 'fs';
import path from 'path';
import prisma from '../lib/prisma';
import logger from './logger';
import { Car, CarFileContent } from '../types/models';

export async function initializeDatabase(): Promise<void> {
  try {
    // Check if the database has already been initialized
    const brandsCount = await prisma.brand.count();

    if (brandsCount > 0) {
      logger.info('Database already initialized, skipping initialization');
      return;
    }

    logger.info('Initializing database from JSON file...');

    // Load data from JSON file
    const dataFilePath = path.join(__dirname, '../../data/data.json');
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    const carsData: CarFileContent[] = JSON.parse(fileContent);

    // Group cars by brand
    const brandMap: Record<string, CarFileContent[]> = {};

    carsData.forEach((car) => {
      if (!brandMap[car.brand_name]) {
        brandMap[car.brand_name] = [];
      }
      brandMap[car.brand_name].push(car);
    });

    // Create brands and models
    for (const brandName of Object.keys(brandMap)) {
      const cars = brandMap[brandName];

      // // Calculate average price for the brand
      const totalPrice = cars.reduce((sum, car) => sum + car.average_price, 0);
      const avgPrice = cars.length > 0 ? totalPrice / cars.length : 0;

      // Create the brand
      const brand = await prisma.brand.create({
        data: {
          name: brandName,
          averagePrice: avgPrice,
        },
      });

      // Create models for this brand - handling duplicates
      for (const car of cars) {
        try {
          // Check if model already exists
          const existingModel = await prisma.model.findFirst({
            where: {
              name: car.name,
              brandId: brand.id
            }
          });

          if (existingModel) {
            // Update existing model
            await prisma.model.update({
              where: { id: existingModel.id },
              data: {
                averagePrice: car.average_price,
                modelId: car.id
              }
            });
            logger.info(`Updated existing model: ${car.name} (${brandName})`);
          } else {
            // Create new model
            await prisma.model.create({
              data: {
                name: car.name,
                averagePrice: car.average_price,
                modelId: car.id,
                brandId: brand.id,
                brandName: brandName,
              },
            });
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          logger.warn(`Error processing model ${car.name} (${brandName}): ${errorMessage}`);
        }
      }
    }

    logger.info(`Database initialized with ${carsData.length} car models`);
  } catch (error) {
    logger.error('Failed to initialize database:', error);
    throw error;
  }
}
