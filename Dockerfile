# Use official Node.js image
FROM node:18-alpine
 
# Set working directory
WORKDIR /app
 
# Install pnpm globally
RUN npm install -g pnpm
 
# Copy package files first for dependency install caching
COPY package.json pnpm-lock.yaml* ./
 
# Install dependencies
RUN pnpm install
 
# Copy rest of the source code
COPY . .
 
# Expose default Next.js port
EXPOSE 3000
 
# Run development server
CMD ["pnpm", "run", "dev"]