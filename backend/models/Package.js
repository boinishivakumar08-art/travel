import mongoose from 'mongoose';

const PackageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a package title'],
    trim: true,
  },
  destination: {
    type: String,
    required: [true, 'Please provide a destination'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
  },
  duration: {
    type: String,
    required: [true, 'Please provide the trip duration'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Package || mongoose.model('Package', PackageSchema);
