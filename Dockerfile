# Use an offiial nodejs runtime as parent image
FROM node:22-alpine

# Set the working diretory in the container
WORKDIR /app

# copy the package.json and package-lock.json files to the container
COPY package*.json .

# Install the deps
RUN npm install

# Copy the rest of the source code
COPY . .

#Expose the port the app is running in
EXPOSE 5003

#Define command to run your app
CMD [ "node", "./src/server.js" ]