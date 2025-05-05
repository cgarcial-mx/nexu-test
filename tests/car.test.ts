import request from 'supertest';
import app from '../src/app';

describe('Tests to run i cars api', () => {
  let brandId = 1;

  it('should create a new brand', async () => {
    const res = await request(app)
      .post('/api/brands')
      .send({ name: 'TestBrand' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'TestBrand');
  });

  it('should get all brands', async () => {
    const res = await request(app).get('/api/brands');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.some((b: any) => b.id === brandId)).toBeTruthy();
  });

  it('should create a new model for the brand', async () => {
    const res = await request(app)
      .post(`/api/brands/${brandId}/models`)
      .send({ name: 'TestModel', averagePrice: 12345 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'TestModel');
    expect(res.body).toHaveProperty('averagePrice', 12345);
  });

  it('should get all models', async () => {
    const res = await request(app).get('/api/models');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should filter models by price range', async () => {
    const res = await request(app).get('/api/models?greater=10000&lower=13000');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
