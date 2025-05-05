# Car Catalog API

A robust TypeScript-based Express.js API for managing car brands and models with price tracking capabilities.

## Features

- Express.js server with TypeScript and essential middleware
- PostgreSQL database with Prisma ORM integration
- RESTful API for car brands and models management
- Price filtering capabilities
- Error handling middleware
- Unit testing with Jest
- Docker support
- ESLint for code quality

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- PostgreSQL database
- Docker (optional)

### Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your PostgreSQL database and update the `.env` file with your database connection string:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/car_catalog?schema=public"
   ```
4. Run Prisma migrations to set up your database schema:
   ```
   npx prisma migrate dev
   ```

### Development

Start the development server:
```
npm run dev
```

### Testing

Run tests:
```
npm test
```

### Production

Build and run with Docker:
```
docker-compose up -d
```

## API Endpoints

### Brands

- **GET /api/brands** - Get all car brands
- **POST /api/brands** - Create a new brand
  ```json
  {
    "name": "Toyota"
  }
  ```

### Models

- **GET /api/models** - Get all car models
  - Optional query parameters:
    - `greater` - Filter models with price greater than or equal to this value
    - `lower` - Filter models with price less than or equal to this value
  - Example: `/api/models?greater=20000&lower=30000`

- **GET /api/brands/:brandId/models** - Get all models of a specific brand

- **POST /api/brands/:brandId/models** - Create a new model for a brand
  ```json
  {
    "name": "Corolla",
    "averagePrice": 25000
  }
  ```

- **PUT /api/models/:id** - Update a model's price
  ```json
  {
    "averagePrice": 26000
  }
  ```

## Project Structure

```
├── prisma/              # Prisma schema and migrations
├── src/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── types/           # TypeScript type definitions
│   ├── lib/             # Shared libraries (e.g., Prisma client)
│   └── app.ts           # Application entry point
├── tests/               # Unit tests
├── .env                 # Environment variables
├── .eslintrc.js         # ESLint configuration
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose configuration
├── jest.config.js       # Jest configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```
