# Stage 1: Build
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install build dependencies (git, python3, make, g++, etc. if needed)
RUN apk add --no-cache python3 make g++ git

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production=false

# Copy source files
COPY . .

# Build the project (transpile TS to JS)
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine

WORKDIR /app

# Copy only the necessary files from build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/cert ./cert  # copy certs if you use self-signed certs in /cert folder

# Security: create a non-root user and switch to it
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose HTTPS port 443 (and optionally HTTP 80 if needed)
EXPOSE 443

# Start app with node
CMD ["node", "dist/main.js"]
