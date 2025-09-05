# Backend Dockerfile for Development
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for development)
RUN npm install

# Copy source code
COPY . .

# Create logs directory if needed
RUN mkdir -p logs

# Expose port
EXPOSE 3001

# Development command with hot reload
CMD ["npm", "run", "dev"]