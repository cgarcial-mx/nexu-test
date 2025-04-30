import request from 'supertest';
import app from '../src/app';
import { Car } from '../src/types/models';

describe('Car API Endpoints', () => {
  // Test getting all cars
  it('should get all cars', async () => {
    const res = await request(app).get('/api/cars');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Test getting car by ID
  it('should get a car by ID', async () => {
    const id = 1; // Assuming this ID exists in your data
    const res = await request(app).get(`/api/cars/${id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', id);
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('brand_name');
  });

  // Test getting car by non-existent ID
  it('should return 404 for non-existent car ID', async () => {
    const res = await request(app).get('/api/cars/9999');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error');
  });

  // Test getting cars by brand
  it('should get cars by brand name', async () => {
    const brand = 'Audi'; // Assuming this brand exists in your data
    const res = await request(app).get(`/api/cars/brand/${brand}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    
    // Check that all returned cars have the specified brand
    res.body.forEach((car: Car) => {
      expect(car.brand_name).toEqual(brand);
    });
  });

  // Test searching cars
  it('should search cars by name', async () => {
    const searchTerm = 'A'; // This should match some cars
    const res = await request(app).get(`/api/cars/search?name=${searchTerm}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    
    // Check that all returned cars have the search term in their name
    res.body.forEach((car: Car) => {
      expect(car.name.toLowerCase()).toContain(searchTerm.toLowerCase());
    });
  });
});
