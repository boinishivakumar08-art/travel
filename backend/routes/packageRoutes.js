import express from 'express';
import Package from '../models/Package.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const packages = await Package.find({}).sort({ createdAt: -1 });
    res.status(200).json({ packages });
  } catch (error) {
    console.error('Packages fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch packages' });
  }
});

export default router;
