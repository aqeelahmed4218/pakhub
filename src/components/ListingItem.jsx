import Link from 'next/link';
import { MdLocationOn } from 'react-icons/md';
export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] min-h-[420px] max-h-[420px] flex flex-col'>
      <Link href={`/listing/${listing._id}`} className='flex flex-col h-full'>
        <img
          src={
            listing.imageUrls[0] ||
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          }
          alt='listing cover'
          className='h-[180px] w-full object-cover hover:scale-105 transition-transform duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full flex-1'>
          <p className='truncate text-lg font-bold text-emerald-700'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-accent' />
            <p className='text-sm text-secondary truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-secondary line-clamp-2'>
            {listing.description}
          </p>
          <div className='flex-1'></div>
          <p className='text-primary mt-2 font-semibold'>
            ₨
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-secondary flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}