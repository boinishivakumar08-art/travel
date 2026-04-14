import express from 'express';
import Package from '../models/Package.js';

const router = express.Router();

const samplePackages = [
  {
    title: 'Magical Bali Retreat',
    destination: 'Bali, Indonesia',
    description: 'Experience the enchanting beauty of Bali with pristine beaches, ancient temples, lush rice terraces, and vibrant culture. Includes luxury villa stay, guided temple tours, and traditional Balinese spa treatments.',
    price: 1299,
    duration: '7 Days / 6 Nights',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    rating: 4.8,
    featured: true,
  },
  {
    title: 'Swiss Alps Adventure',
    destination: 'Switzerland',
    description: 'Discover the breathtaking Swiss Alps with scenic train rides, charming villages, and world-class skiing. Includes Glacier Express pass, luxury chalet accommodation, and guided mountain hiking.',
    price: 2499,
    duration: '8 Days / 7 Nights',
    imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    rating: 4.9,
    featured: true,
  },
  {
    title: 'Santorini Dream Escape',
    destination: 'Santorini, Greece',
    description: 'Immerse yourself in the iconic white-washed villages and stunning sunsets of Santorini. Enjoy wine tasting, catamaran cruises, and explore ancient ruins with breathtaking caldera views.',
    price: 1899,
    duration: '6 Days / 5 Nights',
    imageUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
    rating: 4.7,
    featured: true,
  },
  {
    title: 'Tokyo Cultural Fusion',
    destination: 'Tokyo, Japan',
    description: 'Dive into the perfect blend of ancient traditions and futuristic innovation in Tokyo. Visit historic shrines, enjoy world-class sushi, explore vibrant Shibuya, and experience the beauty of cherry blossoms.',
    price: 1799,
    duration: '7 Days / 6 Nights',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    rating: 4.6,
    featured: false,
  },
  {
    title: 'Maldives Paradise Getaway',
    destination: 'Maldives',
    description: 'Escape to the crystal-clear turquoise waters of the Maldives. Stay in an overwater bungalow, snorkel with manta rays, enjoy sunset dolphin cruises, and unwind with oceanside spa sessions.',
    price: 3299,
    duration: '5 Days / 4 Nights',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
    rating: 4.9,
    featured: true,
  },
  {
    title: 'Machu Picchu Explorer',
    destination: 'Peru',
    description: 'Trek through the sacred Inca Trail to the mystical Machu Picchu. Experience the rich history of the Inca Empire, explore Cusco\'s colonial architecture, and taste authentic Peruvian cuisine.',
    price: 1599,
    duration: '9 Days / 8 Nights',
    imageUrl: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80',
    rating: 4.8,
    featured: false,
  },
  {
    title: 'Dubai Luxury Experience',
    destination: 'Dubai, UAE',
    description: 'Indulge in the extravagance of Dubai with visits to the iconic Burj Khalifa, desert safari adventures, luxury shopping at the Dubai Mall, and a memorable dhow cruise dinner.',
    price: 2199,
    duration: '5 Days / 4 Nights',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    rating: 4.5,
    featured: false,
  },
  {
    title: 'Northern Lights Iceland',
    destination: 'Iceland',
    description: 'Witness the magical Aurora Borealis in Iceland. Explore geysers, waterfalls, volcanic landscapes, and relax in the famous Blue Lagoon. A once-in-a-lifetime arctic adventure awaits.',
    price: 2799,
    duration: '6 Days / 5 Nights',
    imageUrl: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80',
    rating: 4.9,
    featured: true,
  },
];

router.get('/', async (req, res) => {
  try {
    const count = await Package.countDocuments();
    if (count === 0) {
      await Package.insertMany(samplePackages);
      return res.status(201).json({ message: 'Database seeded with sample packages!' });
    }

    res.status(200).json({ message: `Database already has ${count} packages.` });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: 'Failed to seed database' });
  }
});

export default router;
