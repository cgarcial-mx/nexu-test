FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
COPY tsconfig.json ./

# Install ALL dependencies (including dev dependencies for TypeScript compilation)
RUN npm ci

# Bundle app source
COPY . .

# Build TypeScript code
RUN npm run build

# Prune dev dependencies after build is complete
RUN npm prune --production

# Create logs directory
RUN mkdir -p logs

# Make data directory
RUN mkdir -p data

# Set environment to production
ENV NODE_ENV production

# Expose port
EXPOSE 3000

# Run the app
CMD ["node", "dist/app.js"]
