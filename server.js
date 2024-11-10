import express from 'express';
import connectDB from './config/DatabaseConfig.js';
import cors from 'cors';
import adminRouter from './routes/AdminRoute.js';

import dotenv from 'dotenv';
dotenv.config();

// Initialize express app
const app = express();

// Set up middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests


// Connect to MongoDB 
connectDB();

//routes/endpoints
app.use("/api/admin",adminRouter)

// Define routes (example route)
app.get('/', (req, res) => {
  res.send('Hello from ScoutTrbie ');
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
