#!/bin/bash

# Install backend dependencies
echo "Installing backend dependencies..."
npm install

# Create .env file
echo "Creating .env file..."
cat > .env << EOL
MONGODB_URI=mongodb://localhost:27017/cannabis-rewards
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
EOL

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd client
npm install

# Start the application
echo "Starting the application..."
cd ..
npm run dev:full 