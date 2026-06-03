import Listing from '../../../../lib/models/listing.model.js';
import { connect } from '../../../../lib/mongodb/mongoose.js';

export const POST = async (req) => {
  try {
    await connect();
    const data = await req.json();
    
    const startIndex = parseInt(data.startIndex) || 0;
    const limit = parseInt(data.limit) || 9;
    const sortDirection = data.order === 'asc' ? 1 : -1;
    // Only allow sorting by known schema fields; default to createdAt
    const allowedSortFields = ['createdAt', 'updatedAt', 'regularPrice'];
    const sortField = allowedSortFields.includes(data.sort)
      ? data.sort
      : 'createdAt';
    
    // For these checkbox filters, only narrow results when the box is checked
    // (explicitly true). When unchecked/absent, match both true and false.
    // NOTE: the client sends real booleans, so we must handle boolean false
    // (not just the string 'false') as "match both".
    const isTrue = (v) => v === true || v === 'true';

    const offer = isTrue(data.offer) ? true : { $in: [false, true] };
    const furnished = isTrue(data.furnished) ? true : { $in: [false, true] };
    const parking = isTrue(data.parking) ? true : { $in: [false, true] };
    
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
      .sort({ [sortField]: sortDirection })
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