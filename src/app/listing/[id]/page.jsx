import ListingDetailsClient from '@/components/ListingDetailsClient';
import Listing from '@/lib/models/listing.model';
import { connect } from '@/lib/mongodb/mongoose';
import mongoose from 'mongoose';

export default async function Listing_Page({ params }) {
  // Next.js 15: params is a Promise — must be awaited
  const { id } = await params;
  let listing = null;

  try {
    // Query MongoDB directly instead of doing an HTTP round-trip back to our
    // own API. This avoids depending on process.env.URL and Vercel Deployment
    // Protection, which was causing "Listing not found" in production.
    await connect();

    // Guard against malformed ids so Mongoose doesn't throw a CastError
    if (mongoose.Types.ObjectId.isValid(id)) {
      const doc = await Listing.findById(id);
      // Convert the Mongoose document to a plain serializable object
      listing = doc ? JSON.parse(JSON.stringify(doc)) : null;
    }
  } catch (error) {
    console.error('Failed to load listing:', error);
  }

  if (!listing) {
    return (
      <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h2 className='text-xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-2xl'>
          Listing not found
        </h2>
      </main>
    );
  }

  return <ListingDetailsClient listing={listing} />;
}
