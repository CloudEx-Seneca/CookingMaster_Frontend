FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the entire project
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Build the frontend if needed (useful for React or similar frameworks)
#RUN npm run build

# Run the application
CMD ["npm", "start"]
