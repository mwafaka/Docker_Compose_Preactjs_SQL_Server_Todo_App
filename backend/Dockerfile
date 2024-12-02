# Use Node.js LTS version
FROM node:22.11.0

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port
EXPOSE 5000

# Run the app
CMD ["npm", "start"]
