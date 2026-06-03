import Listing from '../../../../lib/models/listing.model.js';
import { connect } from '../../../../lib/mongodb/mongoose.js';

export const POST = async (req) => {
  try {
    await connect();
    const data = await req.json();
    
    const startIndex = parseInt(data.startIndex) || 0;
    const limit = parseInt(data.limit) || 9;
    const sortDirection = data.order === 'asc' ? 1 : -1;
    
    let offer = data.offer;
    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }
    
    let furnished = data.furnished;
    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }
    
    let parking = data.parking;
    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }
    
    let type = data.type;
    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }
    
    const listings = await Listing.find({
      ...(data.userRef && { userRef: data.userRef }),
      ...(data.listingId && { _id: data.listingId }),
      ...(data.searchTerm && {
        $or: [
          { name: { $regex: data.searchTerm, $options: 'i' } },
          { description: { $regex: data.searchTerm, $options: 'i' } },
        ],
      }),
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    return new Response(JSON.stringify(listings), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error getting listings:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch listings' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};