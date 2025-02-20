# Node JS base Image 
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of application code 
COPY . .    

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]