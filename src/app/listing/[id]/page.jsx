import ListingDetailsClient from '@/components/ListingDetailsClient';

export default async function Listing({ params }) {
  // Next.js 15: params is a Promise — must be awaited
  const { id } = await params;
  let listing = null;
  try {
    const result = await fetch(process.env.URL + '/api/listing/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listingId: id }),
      cache: 'no-store',
    });
    const data = await result.json();
    // Ensure it's a plain object (not a Mongoose document class instance)
    listing = data[0] ? JSON.parse(JSON.stringify(data[0])) : null;
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