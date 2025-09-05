# Frontend Dockerfile for Development
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port for React dev server
EXPOSE 3000

# Development command with hot reload
# CHOKIDAR_USEPOLLING=true enables hot reload in Docker
CMD ["sh", "-c", "CHOKIDAR_USEPOLLING=true npm start"]