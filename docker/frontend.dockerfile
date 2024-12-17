FROM node:20.11.1

WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli@19.0.5

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY frontend/ .

# Expose port
EXPOSE 4200

# Start development server
CMD ["ng", "serve", "--host", "0.0.0.0"]