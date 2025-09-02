import { Router } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { protect } from '../authMiddleware.js';

const router = Router();
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

// ✅ Wrap everything in the export default function
export default function(db) {
  
  // POST /api/scans/upload - Protected for Technicians
  router.post('/upload', protect(['Technician']), upload.single('scanImage'), async (req, res) => {
    const { patientName, patientId, scanType, region } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided.' });
    }

    // Upload image to Cloudinary
    cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Cloudinary upload failed', error });
      }

      const imageUrl = result.secure_url;
      
      // Save scan info to database
      const dbResult = await db.run(
        'INSERT INTO scans (patientName, patientId, scanType, region, imageUrl) VALUES (?, ?, ?, ?, ?)',
        patientName, patientId, scanType, region, imageUrl
      );
      
      res.status(201).json({ message: 'Scan uploaded successfully!', id: dbResult.lastID });

    }).end(req.file.buffer);
  });

  // GET /api/scans - Protected for Dentists
  router.get('/', protect(['Dentist']), async (req, res) => {
    const scans = await db.all('SELECT * FROM scans ORDER BY uploadDate DESC');
    res.json(scans);
  });

  // ✅ The function must return the configured router
  return router;
}