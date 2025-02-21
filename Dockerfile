# Node JS base Image 
FROM node:16

# Create app directory and set permissions
WORKDIR /usr/src/app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs nextjs

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of application code 
COPY . .

# Set correct permissions
RUN chown -R nextjs:nodejs .

# Switch to non-root user
USER nextjs

# Expose port 5000
ENV PORT=5000
EXPOSE ${PORT}

# Start the application in production mode
CMD ["npm", "start"]