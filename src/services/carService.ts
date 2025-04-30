import fs from 'fs';
import path from 'path';
import { Car } from '../types/models';

class CarService {
  private carsData: Car[] = [];
  private dataLoaded = false;

  /**
   * Load cars data from the JSON file
   */
  public loadCarsData(): void {
    try {
      const filePath = path.join(__dirname, '../../data/data.json');
      console.log(`Loading data from: ${filePath}`);

      const fileContent = fs.readFileSync(filePath, 'utf8');
      this.carsData = JSON.parse(fileContent);
      this.dataLoaded = true;

      console.log(`Successfully loaded ${this.carsData.length} cars`);
    } catch (error) {
      console.error('Error loading cars data:', error);
      throw new Error(`Failed to load cars data: ${(error as Error).message}`);
    }
  }

  /**
   * Get brands with average prices
   * @returns Array of brand objects with id, nombre, and average_price
   */
  public getBrands(): { id: number; nombre: string; average_price: number }[] {
    if (!this.dataLoaded) {
      this.loadCarsData();
    }

    // Group cars by brand name
    const brandMap: { [key: string]: Car[] } = {};

    this.carsData.forEach((car) => {
      const brand = car.brand_name;
      if (!brandMap[brand]) {
        brandMap[brand] = [];
      }
      brandMap[brand].push(car);
    });

    // Calculate average price for each brand and format result
    const brands = Object.keys(brandMap).map((brandName, index) => {
      const brandCars = brandMap[brandName];
      const totalPrice = brandCars.reduce(
        (sum, car) => sum + car.average_price,
        0,
      );
      const avgPrice =
        brandCars.length > 0 ? Math.round(totalPrice / brandCars.length) : 0;

      return {
        id: index + 1,
        nombre: brandName,
        average_price: avgPrice,
      };
    });

    // Sort by brand name
    return brands.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  /**
   * Get cars by brand name
   * @returns Array of cars of a specific brand
   */
  public getCarsByBrand(brandName: string): Car[] {
    if (!this.dataLoaded) {
      this.loadCarsData();
    }
    return this.carsData.filter(
      (car) => car.brand_name.toLowerCase() === brandName.toLowerCase(),
    );
  }

  public createBrand(name: string): void {
    if (!this.dataLoaded) {
      this.loadCarsData();
    }
    this.carsData.push({
      id: this.carsData.length + 1,
      name,
      average_price: 0,
      brand_name: name,
    });
  }
}

// Export a singleton instance of the service
export const carService = new CarService();
