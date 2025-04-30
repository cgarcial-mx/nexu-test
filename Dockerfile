FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
COPY tsconfig.json ./

# Install ALL dependencies (including dev dependencies for TypeScript and Prisma compilation)
RUN npm ci

# Copy Prisma schema and migrations
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Bundle app source
COPY . .

# Build TypeScript code
RUN npm run build

# Prune dev dependencies after build is complete (keep Prisma as it's needed at runtime)
RUN npm prune --omit=dev

# Create logs directory
RUN mkdir -p logs

# Make data directory
RUN mkdir -p data

# Set environment to production
ENV NODE_ENV production

# Expose port
EXPOSE 3000

# Run the app (database migration is handled in docker-compose.yml)
CMD ["node", "dist/app.js"]
