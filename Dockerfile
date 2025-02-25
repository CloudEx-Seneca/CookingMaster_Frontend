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
FROM node:16-alpine AS runtime

WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src

#RUN npm install -g serve
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the app
#CMD ["npm", "run", "deploy"]
CMD ["serve", "-s", "build", "-l", "3000"]
