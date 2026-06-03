import mongoose from 'mongoose';

// Use mongoose.connection.readyState to check real connection status:
// 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting

export const connect = async () => {
  // Already connected — reuse the existing connection
  if (mongoose.connection.readyState === 1) {
    return;
  }

  // Currently connecting — wait for it
  if (mongoose.connection.readyState === 2) {
    await new Promise((resolve) => mongoose.connection.once('connected', resolve));
    return;
  }

  // Not connected — establish a new connection
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'next-estate',
      serverSelectionTimeoutMS: 10000, // fail fast after 10s
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // Re-throw so the API route returns a proper 500 instead of hanging
    throw new Error('Database connection failed');
  }
};
