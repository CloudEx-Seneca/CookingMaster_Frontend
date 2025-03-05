# Stage 1: Build
FROM node:16-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json first (to leverage caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the entire project
COPY . .

# Build the frontend
RUN npm run build

# Stage 2: Runtime
FROM nginx:alpine AS runtime

WORKDIR /usr/share/nginx/html

# Copy the built React app from the builder stage
COPY --from=builder /app/build/. /usr/share/nginx/html

# Copy the Nginx config and entrypoint script
COPY nginx.conf /etc/nginx/nginx.conf
COPY entrypoint.sh /entrypoint.sh

# Make the script executable
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
