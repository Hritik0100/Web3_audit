#!/bin/bash

# Script to start all three applications simultaneously
echo "Starting Web3 Audit Backend on port 3001..."
cd web3-aduit-backend && node server.js &

echo "Starting React Tailwind Dashboard on port 3002..."
cd ../react-tailwind-dashboard-test && npm run dev &

echo "Starting Chainalytic App on port 3000..."
cd ../chainalytic-app && npm run dev &

echo "All applications started!"
echo "Access the applications at:"
echo "- Chainalytic App: http://localhost:3000"
echo "- React Dashboard: http://localhost:3002"
echo "- Web3 Backend API: http://localhost:3001"

# Wait for all background processes
wait