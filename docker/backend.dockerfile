FROM node:20.11.1

WORKDIR /app

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm install 

RUN npm install -g axios

# Copy project files
COPY backend/ .

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]