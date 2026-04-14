import express from 'express';
import Booking from '../models/Booking.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Please login to book a package' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { packageId, packageTitle, packagePrice } = req.body;

    const existing = await Booking.findOne({
      userId: decoded.userId,
      packageId,
    });

    if (existing) {
      return res.status(400).json({ error: 'You have already booked this package!' });
    }

    const booking = await Booking.create({
      username: decoded.username,
      userId: decoded.userId,
      packageId,
      packageTitle,
      packagePrice,
    });

    res.status(201).json({ message: 'Package booked successfully!', booking });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Failed to book package' });
  }
});

router.get('/', async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Please login to view bookings' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const bookings = await Booking.find({ userId: decoded.userId }).sort({ bookedAt: -1 });
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

export default router;
