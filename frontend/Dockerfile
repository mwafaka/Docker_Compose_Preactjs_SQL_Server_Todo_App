# Stage 1: Build the React app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json or yarn.lock
COPY package*.json ./

# Install dependencies
RUN npm install
# For Yarn users, uncomment the line below and comment the npm install line:
# RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build
# For Yarn users, uncomment the line below:
# RUN yarn build

# Stage 2: Serve the React app using a simple HTTP server
FROM nginx:alpine

# Copy the build output to the nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
