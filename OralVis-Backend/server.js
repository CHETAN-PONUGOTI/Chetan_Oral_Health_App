import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import { initializeDatabase } from './database.js';
import authRoutes from './routes/auth.js'; // Default import
import scanRoutes from './routes/scans.js'; // Default import

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

async function startServer() {
  const db = await initializeDatabase();

  app.get('/', (req, res) => res.send('OralVis API Running'));

  // ✅ Call the imported functions and pass the db object
  app.use('/api/auth', authRoutes(db));
  app.use('/api/scans', scanRoutes(db));

  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

startServer();