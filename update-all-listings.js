// USAGE: node update-all-listings.js
require('dotenv').config();
const mongoose = require('mongoose');
const { default: Listing } = require('./src/lib/models/listing.model.js');
const { connect } = require('./src/lib/mongodb/mongoose.js');

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

const descriptions = [
  'Spacious family home with modern amenities and a beautiful lawn in Multan.',
  'Newly renovated house in a peaceful Multan neighborhood, close to schools and parks.',
  '3-bedroom house with attached bathrooms and a large kitchen in the heart of Multan.',
  'Affordable home with car parking and easy access to main roads in Multan.',
  'Well-furnished property ideal for families, with nearby shopping centers in Multan.',
  'Comfortable apartment available for rent in a prime location of Multan.',
  'Well-maintained house with all basic facilities, perfect for small families in Multan.',
  'Spacious upper portion for rent, close to public transport and markets in Multan.',
  'Modern flat for rent, ideal for working professionals or students in Multan.',
  'Beautiful house for sale in a secure and friendly Multan neighborhood.',
  'Brand new property with high-quality fittings and a spacious garage in Multan.',
  'Prime location! Double-storey house available for immediate sale in Multan.',
  'Investment opportunity: Well-built home with excellent resale value in Multan.',
  'Luxury villa for sale with lush green garden and modern design in Multan.',
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function updateAllListings() {
  await connect();
  const listings = await Listing.find({});
  let updated = 0;
  for (const listing of listings) {
    let regularPrice = 0;
    let discountPrice = 0;
    if (listing.type === 'rent') {
      // Rent: 30,000 to 150,000
      regularPrice = 30000 + Math.floor(Math.random() * 120000); // 30k to 150k
      if (listing.offer) {
        const discount = 5000 + Math.floor(Math.random() * 15000); // 5k to 20k
        discountPrice = Math.max(regularPrice - discount, 5000);
      }
    } else if (listing.type === 'sale') {
      // Sale: 3,000,000 to 30,000,000
      regularPrice = 3000000 + Math.floor(Math.random() * 27000000); // 3M to 30M
      if (listing.offer) {
        const discount = 100000 + Math.floor(Math.random() * 900000); // 100k to 1M
        discountPrice = Math.max(regularPrice - discount, 100000);
      }
    } else {
      // Fallback
      regularPrice = 30000 + Math.floor(Math.random() * 120000);
      discountPrice = 0;
    }
    listing.address = getRandom(multanAddresses);
    listing.description = getRandom(descriptions);
    listing.regularPrice = regularPrice;
    listing.discountPrice = discountPrice;
    // Remove any $ or 'dollar' from description
    if (typeof listing.description === 'string') {
      listing.description = listing.description.replace(/\$/g, '').replace(/dollar/gi, 'PKR').replace(/USD/gi, 'PKR');
    }
    updated++;
    await listing.save();
  }
  console.log(`Updated ${updated} listings with Multan data and PKR prices.`);
  mongoose.connection.close();
}

updateAllListings().catch((err) => {
  console.error(err);
  mongoose.connection.close();
}); 