# Express.js API Boilerplate

A robust Express.js API boilerplate with built-in JSON file reading capabilities, comprehensive middleware setup, and Docker support.

## Features

- Express.js server with essential middleware
- JSON file reading utility
- Logging with Winston
- Error handling middleware
- Unit testing with Jest
- Docker support
- ESLint for code quality

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Docker (optional)

### Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
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

## JSON File Reading

The API includes an endpoint to read JSON files from the `data` directory:

```
GET /read-json/:filename
```

Example:
```
GET /read-json/example
```

## Project Structure

```
├── data/                # JSON data files
├── logs/                # Application logs
├── src/
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── app.js           # Application entry point
├── tests/               # Unit tests
├── .env                 # Environment variables
├── .eslintrc.js         # ESLint configuration
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose configuration
├── jest.config.js       # Jest configuration
└── package.json         # Project dependencies
```
