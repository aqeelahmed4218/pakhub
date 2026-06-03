// SEED SCRIPT: Run with `node seed-listings.js`

const mongoose = require('mongoose');
const { default: Listing } = require('./src/lib/models/listing.model.js');
const { connect } = require('./src/lib/mongodb/mongoose.js');
require('dotenv').config();

const multanAddresses = [
  'Gulgasht Colony, Multan',
  'Model Town, Multan',
  'Shah Rukn-e-Alam Colony, Multan',
  'New Multan, Multan',
  'Cantt, Multan',
  'DHA, Multan',
  'Wapda Town, Multan',
  'Mumtazabad, Multan',
  'Boson Road, Multan',
  'Askari Colony, Multan',
  'Shershah Road, Multan',
  'Chungi No. 6, Multan',
  'Peer Khurshid Colony, Multan',
  'Basti Malook, Multan',
  'Vehari Road, Multan',
];

const offerDescriptions = [
  'Limited time offer! Spacious family home with modern amenities and a beautiful lawn.',
  'Special deal: Newly renovated house in a peaceful neighborhood, close to schools and parks.',
  'Exclusive offer: 3-bedroom house with attached bathrooms and a large kitchen.',
  'Don\'t miss out! Affordable home with car parking and easy access to main roads.',
  'Hot offer: Well-furnished property ideal for families, with nearby shopping centers.',
];

const rentDescriptions = [
  'Comfortable apartment available for rent in a prime location of Multan.',
  'Well-maintained house with all basic facilities, perfect for small families.',
  'Spacious upper portion for rent, close to public transport and markets.',
  'Affordable rental property with 24/7 security and water supply.',
  'Modern flat for rent, ideal for working professionals or students.',
];

const saleDescriptions = [
  'Beautiful house for sale in a secure and friendly neighborhood.',
  'Brand new property with high-quality fittings and a spacious garage.',
  'Prime location! Double-storey house available for immediate sale.',
  'Investment opportunity: Well-built home with excellent resale value.',
  'Luxury villa for sale with lush green garden and modern design.',
];

const propertyNames = [
  'Gulgasht Heights Apartment',
  'Model Town Family Home',
  'Shah Rukn-e-Alam Residency',
  'New Multan Executive Flat',
  'Cantt Corner House',
  'DHA Villas Multan',
  'Wapda Town Modern Home',
  'Mumtazabad Classic House',
  'Bosan Road Luxury Apartment',
  'Askari Colony Duplex',
  'Shershah Road Bungalow',
  'Chungi No. 6 Plaza Suite',
  'Peer Khurshid Colony Cottage',
  'Basti Malook Estate',
  'Vehari Road Urban Home',
  'Buch Villas Executive Home',
  'Dream Gardens Townhouse',
  'Royal Orchard Family House',
  'Citi Housing Smart Villa',
  'Fatima Jinnah Town Residence',
  'Green Fort Enclave Apartment',
  'Al-Mustafa Garden House',
  'Shalimar Colony Modern Flat',
  'Multan Public School Road House',
  'Sabzazar Colony Home',
  'MDA Officers Colony Villa',
  'Garden Town Classic Home',
  'Jalalpur Road Estate',
  'Suraj Miani Urban House',
  'Lodhi Colony Family Home',
];

const propertyImages = [
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=600&q=80',
];

async function seed() {
  await connect();

  // Get all users from the database
  let users = [];
  try {
    const User = require('./src/lib/models/user.model.js');
    users = await User.find({});
  } catch (e) {
    // If user model or collection doesn't exist, fallback to generic userRef
    users = [];
  }

  function getRandomUserRef() {
    if (users.length === 0) return 'seedUserId';
    return users[Math.floor(Math.random() * users.length)]._id.toString();
  }

  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Delete all existing listings
  await Listing.deleteMany({});

  const offers = Array.from({ length: 5 }).map((_, i) => ({
    userRef: getRandomUserRef(),
    name: getRandom(propertyNames),
    description: getRandom(offerDescriptions),
    address: getRandom(multanAddresses),
    regularPrice: 65000 + i * 5000, // PKR
    discountPrice: 60000 + i * 5000, // PKR
    bathrooms: 2,
    bedrooms: 3,
    furnished: i % 2 === 0,
    parking: i % 2 === 1,
    type: 'rent',
    offer: true,
    imageUrls: [propertyImages[i]],
  }));

  const rents = Array.from({ length: 5 }).map((_, i) => ({
    userRef: getRandomUserRef(),
    name: getRandom(propertyNames),
    description: getRandom(rentDescriptions),
    address: getRandom(multanAddresses),
    regularPrice: 35000 + i * 4000, // PKR
    discountPrice: 0,
    bathrooms: 1 + (i % 3),
    bedrooms: 2 + (i % 2),
    furnished: i % 2 === 1,
    parking: i % 2 === 0,
    type: 'rent',
    offer: false,
    imageUrls: [propertyImages[i + 5]],
  }));

  const sales = Array.from({ length: 5 }).map((_, i) => ({
    userRef: getRandomUserRef(),
    name: getRandom(propertyNames),
    description: getRandom(saleDescriptions),
    address: getRandom(multanAddresses),
    regularPrice: 12000000 + i * 500000, // PKR
    discountPrice: 0,
    bathrooms: 2 + (i % 2),
    bedrooms: 3 + (i % 2),
    furnished: i % 2 === 0,
    parking: true,
    type: 'sale',
    offer: false,
    imageUrls: [propertyImages[i + 10]],
  }));

  await Listing.insertMany([...offers, ...rents, ...sales]);
  console.log('Seeded 5 offers, 5 rents, 5 sales listings!');
  mongoose.connection.close();
}

seed().catch((err) => {
  console.error(err);
  mongoose.connection.close();
}); 