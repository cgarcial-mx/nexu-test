import prisma from '../lib/prisma';
import { Car } from '../types/models';

class CarService {
  /**
   * Get brands with average prices
   * @returns Array of brand objects with id, name, and averagePrice
   */
  public async getBrands(): Promise<
    { id: number; nombre: string; averagePrice: number }[]
  > {
    const brands = await prisma.brand.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return brands.map((brand) => ({
      id: brand.id,
      nombre: brand.name,
      averagePrice: brand.averagePrice,
    }));
  }

  /**
   * Get cars by brand name
   * @returns Array of cars of a specific brand
   */
  public async getCarsByBrand(brandId: number): Promise<Car[]> {
    console.log(brandId);
    const models = await prisma.model.findMany({
      where: {
        brandId: {
          equals: brandId,
        },
      },
    });

    return models.map((model) => ({
      id: model.modelId,
      name: model.name,
      averagePrice: model.averagePrice,
      brandName: model.brandName,
    }));
  }

  /**
   * Create a new brand
   */
  public async createBrand(
    name: string,
    averagePrice: number = 0,
  ): Promise<{ id: number; name: string; averagePrice: number }> {
    const brand = await prisma.brand.create({
      data: {
        name,
        averagePrice,
      },
    });

    // brandname is already used
    if (!brand) {
      throw new Error(`Brand "${name}" already exists`);
    }

    return {
      id: brand.id,
      name: brand.name,
      averagePrice: brand.averagePrice,
    };
  }

  /**
   * Create a new model for a specific brand
   */
  public async createModel(
    brandId: number,
    name: string,
    averagePrice: number,
  ): Promise<Car> {
    // Find the brand
    const brand = await prisma.brand.findFirst({
      where: {
        brandId: {
          equals: brandId,
        },
      },
    });

    if (!brand) {
      throw new Error(`Brand "${brandId}" not found`);
    }

    // Create the model
    const model = await prisma.model.create({
      data: {
        name,
        averagePrice,
        brandId: brand.id,
        brandName: brand.name,
        modelId: 0,
      },
    });

    // Update the brand's average price
    await this.updateBrandAveragePrice(brand.id);

    return {
      id: model.id,
      name: model.name,
      averagePrice: model.averagePrice,
      brandName: model.brandName,
    };
  }

  /**
   * Edit a model's price
   */
  public async editModelPrice(
    modelId: number,
    newPrice: number,
  ): Promise<Car | null> {
    // Find the model first
    const existingModel = await prisma.model.findFirst({
      where: { modelId },
    });

    if (!existingModel) {
      return null;
    }

    // Update the model
    const model = await prisma.model.update({
      where: { id: existingModel.id },
      data: {
        averagePrice: newPrice,
      },
    });

    // Update the brand's average price
    await this.updateBrandAveragePrice(model.brandId);

    return {
      id: model.id,
      name: model.name,
      averagePrice: model.averagePrice,
      brandName: model.brandName,
    };
  }

  /**
   * Update a brand's average price based on its models
   */
  private async updateBrandAveragePrice(brandId: number): Promise<void> {
    // Get all models for the brand
    const models = await prisma.model.findMany({
      where: { brandId },
    });

    // Calculate new average price
    const totalPrice = models.reduce(
      (sum: number, model: { averagePrice: number }) =>
        sum + model.averagePrice,
      0,
    );
    const newAvgPrice = models.length > 0 ? totalPrice / models.length : 0;

    // Update the brand
    await prisma.brand.update({
      where: { id: brandId },
      data: {
        averagePrice: newAvgPrice,
      },
    });
  }
}

// Export a singleton instance of the service
export const carService = new CarService();
