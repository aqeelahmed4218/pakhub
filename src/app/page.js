'use client';

import ListingItem from '@/components/ListingItem';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [perfectColor, setPerfectColor] = useState('text-lime-500');
  const [rentListings, setRentListings] = useState(null);
  const [saleListings, setSaleListings] = useState(null);
  const [offerListings, setOfferListings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carousel refs
  const offerRef = useRef(null);
  const rentRef = useRef(null);
  const saleRef = useRef(null);

  // Carousel scroll function
  const scrollCarousel = (ref, direction) => {
    if (!ref.current) return;
    const scrollAmount = ref.current.offsetWidth * 0.8;
    ref.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // Array of contrasting colors that work well with white text
    const colors = [
      'text-lime-500',    // Bright lime
      'text-cyan-400',    // Bright cyan
      'text-amber-400',   // Bright amber
      'text-emerald-400', // Bright emerald
      'text-fuchsia-400', // Bright fuchsia
      'text-rose-400',    // Bright rose
    ];
    setPerfectColor(colors[Math.floor(Math.random() * colors.length)]);

    // Fetch listings
    const fetchListings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const baseUrl = window.location.origin; // Get the current origin

        // Fetch rent listings
        const rentResult = await fetch(`${baseUrl}/api/listing/get`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
      body: JSON.stringify({
        type: 'rent',
        limit: 4,
        order: 'asc',
      }),
        });
        console.log('Rent fetch result ok:', rentResult.ok);
        
        if (!rentResult.ok) {
          const errorBody = await rentResult.text();
          throw new Error(`Failed to fetch rent listings: ${rentResult.status} - ${errorBody}`);
        }
        const rentData = await rentResult.json();
        console.log('Rent data received:', rentData);
        setRentListings(rentData);

        // Fetch sale listings
        const saleResult = await fetch(`${baseUrl}/api/listing/get`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
      body: JSON.stringify({
        type: 'sale',
        limit: 4,
        order: 'asc',
      }),
        });
        console.log('Sale fetch result ok:', saleResult.ok);
        
        if (!saleResult.ok) {
          const errorBody = await saleResult.text();
          throw new Error(`Failed to fetch sale listings: ${saleResult.status} - ${errorBody}`);
        }
        const saleData = await saleResult.json();
        console.log('Sale data received:', saleData);
        setSaleListings(saleData);

        // Fetch offer listings
        const offerResult = await fetch(`${baseUrl}/api/listing/get`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
      body: JSON.stringify({
        limit: 4,
        order: 'asc',
        offer: true,
      }),
        });
        console.log('Offer fetch result ok:', offerResult.ok);
        
        if (!offerResult.ok) {
          const errorBody = await offerResult.text();
          throw new Error(`Failed to fetch offer listings: ${offerResult.status} - ${errorBody}`);
        }
        const offerData = await offerResult.json();
        console.log('Offer data received:', offerData);
        setOfferListings(offerData);
  } catch (error) {
        console.error('Error fetching listings:', error);
        setError(`Failed to load listings: ${error.message}`);
      } finally {
        setIsLoading(false);
  }
    };

    fetchListings();
  }, []);

  return (
    <div>
      <div className='relative h-[600px]'>
        {/* Background Grid */}
        <div className='absolute inset-0 grid grid-cols-2 gap-1 opacity-20'>
          <div className='bg-cover bg-center' style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")' }}></div>
          <div className='bg-cover bg-center' style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80")' }}></div>
          <div className='bg-cover bg-center' style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")' }}></div>
          <div className='bg-cover bg-center' style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80")' }}></div>
          {/* Dark overlay */}
          <div className='absolute inset-0 bg-black bg-opacity-50'></div>
        </div>

        {/* Content */}
        <div className='relative z-10 flex flex-col gap-6 px-3 max-w-6xl mx-auto h-full justify-start pt-28'>
          <h1 className='text-white font-bold text-3xl lg:text-6xl'>
            Find your next <span className={perfectColor}>perfect</span>
            <br />
            place with ease
          </h1>
          <div className='text-gray-300 text-xs sm:text-sm'>
            PakHub is Multan's trusted platform to find your next perfect place to live.<br />
            We offer a wide range of properties for rent and sale, tailored for every need and budget.
          </div>
          <Link
            href={'/search'}
            className='text-xs sm:text-sm text-cyan-400 font-bold hover:underline'
          >
            Let&apos;s get started...
          </Link>
        </div>
      </div>

      {/* Large banner image with text overlay */}
      <div className='relative w-full h-[550px] my-10'>
        <img
          src='https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
          className='w-full h-full object-cover'
          alt="Real Estate Banner"
        />
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-40'>
          <p className='text-white text-5xl md:text-7xl font-bold text-center'>
            VIEW. BUY. RENT.
          </p>
        </div>
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {error && (
          <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">
            Error: {error}
          </div>
        )}
        {isLoading ? (
          <div className="text-gray-500 text-center p-4 flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            Loading listings...
          </div>
        ) : (
          <>
            {/* Offers Carousel */}
            {offerListings && offerListings.length > 0 && (
              <div className=''>
                <div className='my-3 flex items-center justify-between'>
                  <h2 className='text-2xl font-semibold text-white'>Recent Offers</h2>
                  <div className='flex gap-2'>
                    <button onClick={() => scrollCarousel(offerRef, 'left')} className='bg-cyan-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-cyan-500' aria-label='Scroll left'>
                      &#8592;
                    </button>
                    <button onClick={() => scrollCarousel(offerRef, 'right')} className='bg-cyan-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-cyan-500' aria-label='Scroll right'>
                      &#8594;
                    </button>
                  </div>
                </div>
                <div ref={offerRef} className='flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory'>
                  {offerListings.map((listing) => (
                    <div key={listing._id} className='snap-start min-w-[320px] max-w-[340px]'>
                      <ListingItem listing={listing} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Rent Carousel */}
            {rentListings && rentListings.length > 0 && (
              <div className=''>
                <div className='my-3 flex items-center justify-between'>
                  <h2 className='text-2xl font-semibold text-white'>Recent places for rent</h2>
                  <div className='flex gap-2'>
                    <button onClick={() => scrollCarousel(rentRef, 'left')} className='bg-cyan-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-cyan-500' aria-label='Scroll left'>
                      &#8592;
                    </button>
                    <button onClick={() => scrollCarousel(rentRef, 'right')} className='bg-cyan-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-cyan-500' aria-label='Scroll right'>
                      &#8594;
                    </button>
                  </div>
                </div>
                <div ref={rentRef} className='flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory'>
                  {rentListings.map((listing) => (
                    <div key={listing._id} className='snap-start min-w-[320px] max-w-[340px]'>
                      <ListingItem listing={listing} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Sale Carousel */}
            {saleListings && saleListings.length > 0 && (
              <div className=''>
                <div className='my-3 flex items-center justify-between'>
                  <h2 className='text-2xl font-semibold text-white'>Recent places for sale</h2>
                  <div className='flex gap-2'>
                    <button onClick={() => scrollCarousel(saleRef, 'left')} className='bg-cyan-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-cyan-500' aria-label='Scroll left'>
                      &#8592;
                    </button>
                    <button onClick={() => scrollCarousel(saleRef, 'right')} className='bg-cyan-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-cyan-500' aria-label='Scroll right'>
                      &#8594;
                    </button>
                  </div>
                </div>
                <div ref={saleRef} className='flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory'>
                  {saleListings.map((listing) => (
                    <div key={listing._id} className='snap-start min-w-[320px] max-w-[340px]'>
                      <ListingItem listing={listing} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* No listings fallback */}
            {(!offerListings?.length && !rentListings?.length && !saleListings?.length && !error) && (
              <p className="text-gray-500 text-center p-4">No listings found. Check back later!</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}