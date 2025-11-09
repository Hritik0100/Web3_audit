# Web3 Audit Project

This project consists of three main components:

1. **Chainalytic App** - Main frontend application (Next.js)
2. **React Tailwind Dashboard** - Dashboard application (Next.js)
3. **Web3 Audit Backend** - Node.js backend server with MongoDB

## Setup

1. Install dependencies for each project:
   ```bash
   cd chainalytic-app && npm install
   cd ../react-tailwind-dashboard-test && npm install
   cd ../web3-aduit-backend && npm install
   ```

## Running the Applications

### Individual Startup
- **Chainalytic App**: `cd chainalytic-app && npm run dev` (runs on port 3000)
- **React Dashboard**: `cd react-tailwind-dashboard-test && npm run dev` (runs on port 3002)
- **Web3 Backend**: `cd web3-aduit-backend && node server.js` (runs on port 3001)

### Combined Startup
Run all applications simultaneously:
```bash
./start-all.sh
```

## Access Points
- Chainalytic App: http://localhost:3000
- React Dashboard: http://localhost:3002
- Web3 Backend API: http://localhost:3001

## Navigation
Clicking the "Get Started" button on the Chainalytic App homepage will redirect to the React Dashboard login page at http://localhost:3002/login