"use client";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import ListingMap from './ListingMap';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from 'react-icons/fa';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

export default function ListingDetailsClient({ listing }) {
  const { isSignedIn, user, isLoaded } = useUser();
  const [showContact, setShowContact] = useState(false);
  const [showVisit, setShowVisit] = useState(false);
  const [message, setMessage] = useState('');
  const [visitMessage, setVisitMessage] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [sending, setSending] = useState(false);
  const [visitSending, setVisitSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [visitSent, setVisitSent] = useState(false);
  const [error, setError] = useState('');
  const [visitError, setVisitError] = useState('');

  if (!listing) return null;
  const images = (listing.imageUrls || []).map((url) => ({
    original: url,
    thumbnail: url,
  }));

  // Only show contact button if user is signed in and not the owner
  const userMongoId = user?.publicMetadata?.userMongoId || user?.publicMetadata?.userMogoId;
  const isOwner = isSignedIn && userMongoId === listing.userRef;

  const handleContact = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      // Store the message in the database only
      await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toUserRef: listing.userRef,
          fromUserRef: userMongoId,
          fromName: user?.firstName + ' ' + user?.lastName,
          fromEmail: user?.primaryEmailAddress?.emailAddress,
          listingId: listing._id,
          listingTitle: listing.name,
          message,
        }),
      });
      setSent(true);
      setMessage('');
    } catch (err) {
      setError(err.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleVisit = async (e) => {
    e.preventDefault();
    setVisitSending(true);
    setVisitError('');
    try {
      await fetch('/api/visit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listing._id,
          listingTitle: listing.name,
          ownerUserRef: listing.userRef,
          visitorUserRef: userMongoId,
          visitorName: user?.firstName + ' ' + user?.lastName,
          visitorEmail: user?.primaryEmailAddress?.emailAddress,
          date: visitDate,
          time: visitTime,
          message: visitMessage,
        }),
      });
      setVisitSent(true);
      setVisitMessage('');
      setVisitDate('');
      setVisitTime('');
    } catch (err) {
      setVisitError(err.message || 'Failed to schedule visit');
    } finally {
      setVisitSending(false);
    }
  };

  return (
    <main>
      <div>
        {/* Image Gallery */}
        <div className='w-full max-w-3xl mx-auto'>
          <ImageGallery items={images} showPlayButton={false} showFullscreenButton={true} />
        </div>
        {/* Map Section */}
        <div className='w-full max-w-3xl mx-auto my-6'>
          <ListingMap address={listing.address} />
        </div>
        <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
          {/* Contact Seller Button */}
          {isLoaded && isSignedIn && (
            <div className='my-4 flex flex-col gap-2'>
              <button
                className='bg-cyan-700 text-white px-6 py-2 rounded hover:bg-cyan-500 transition-colors font-semibold'
                onClick={() => setShowContact(true)}
              >
                Contact Seller
              </button>
              <button
                className='bg-emerald-700 text-white px-6 py-2 rounded hover:bg-emerald-500 transition-colors font-semibold'
                onClick={() => setShowVisit(true)}
              >
                Schedule a Visit
              </button>
            </div>
          )}
          {/* Contact Modal/Form */}
          {showContact && (
            <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40'>
              <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative'>
                <button
                  className='absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl'
                  onClick={() => { setShowContact(false); setSent(false); setError(''); }}
                  aria-label='Close'
                >
                  ×
                </button>
                <h3 className='text-xl font-bold mb-4 text-cyan-700'>Contact Seller</h3>
                {sent ? (
                  <div className='text-green-600 font-semibold text-center my-6'>Message sent!</div>
                ) : (
                  <form onSubmit={handleContact} className='flex flex-col gap-3'>
                    <input
                      type='text'
                      className='border rounded px-3 py-2'
                      value={user?.firstName + ' ' + user?.lastName || ''}
                      disabled
                      placeholder='Your Name'
                    />
                    <input
                      type='email'
                      className='border rounded px-3 py-2'
                      value={user?.primaryEmailAddress?.emailAddress || ''}
                      disabled
                      placeholder='Your Email'
                    />
                    <textarea
                      className='border rounded px-3 py-2 min-h-[80px]'
                      placeholder='Your message...'
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      required
                    />
                    {error && <div className='text-red-600 text-sm'>{error}</div>}
                    <button
                      type='submit'
                      className='bg-cyan-700 text-white px-4 py-2 rounded hover:bg-cyan-500 disabled:opacity-60'
                      disabled={sending || !message.trim()}
                    >
                      {sending ? 'Sending...' : 'Send'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
          {/* Schedule a Visit Modal */}
          {showVisit && (
            <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40'>
              <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative'>
                <button
                  className='absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl'
                  onClick={() => { setShowVisit(false); setVisitSent(false); setVisitError(''); }}
                  aria-label='Close'
                >
                  ×
                </button>
                <h3 className='text-xl font-bold mb-4 text-emerald-700'>Schedule a Visit</h3>
                {visitSent ? (
                  <div className='text-green-600 font-semibold text-center my-6'>Visit request sent!</div>
                ) : (
                  <form onSubmit={handleVisit} className='flex flex-col gap-3'>
                    <input
                      type='date'
                      className='border rounded px-3 py-2'
                      value={visitDate}
                      onChange={e => setVisitDate(e.target.value)}
                      required
                    />
                    <input
                      type='time'
                      className='border rounded px-3 py-2'
                      value={visitTime}
                      onChange={e => setVisitTime(e.target.value)}
                      required
                    />
                    <textarea
                      className='border rounded px-3 py-2 min-h-[60px]'
                      placeholder='Optional message...'
                      value={visitMessage}
                      onChange={e => setVisitMessage(e.target.value)}
                    />
                    {visitError && <div className='text-red-600 text-sm'>{visitError}</div>}
                    <button
                      type='submit'
                      className='bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-500 disabled:opacity-60'
                      disabled={visitSending || !visitDate || !visitTime}
                    >
                      {visitSending ? 'Requesting...' : 'Request Visit'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
          <p className='text-2xl font-bold text-emerald-700'>
            {listing.name} - <span className='text-primary font-bold'>₨{' '}
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}</span>
            {listing.type === 'rent' && <span className='text-gray-700'> / month</span>}
          </p>
          <p className='flex items-center mt-6 gap-2 text-gray-700 text-base font-medium'>
            <FaMapMarkerAlt className='text-green-700' />
            <span className='bg-gray-100 px-2 py-1 rounded text-gray-900'>{listing.address}</span>
          </p>
          <div className='flex gap-4'>
            <p className='bg-red-700 w-full max-w-[200px] text-white text-center p-1 rounded-md font-semibold shadow'>
              {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
            </p>
            {listing.offer && (
              <p className='bg-green-700 w-full max-w-[200px] text-white text-center p-1 rounded-md font-semibold shadow'>
                ₨{(+listing.regularPrice - +listing.discountPrice).toLocaleString('en-US')} OFF
              </p>
            )}
          </div>
          <p className='text-gray-900 bg-gray-50 rounded p-3 shadow-sm'>
            <span className='font-semibold text-black'>Description - </span>
            {listing.description}
          </p>
          <ul className='text-teal-700 font-semibold text-base flex flex-wrap items-center gap-4 sm:gap-6'>
            <li className='flex items-center gap-1 whitespace-nowrap bg-gray-100 px-2 py-1 rounded'>
              <FaBed className='text-lg text-blue-700' />
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap bg-gray-100 px-2 py-1 rounded'>
              <FaBath className='text-lg text-blue-700' />
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap bg-gray-100 px-2 py-1 rounded'>
              <FaParking className='text-lg text-blue-700' />
              {listing.parking ? 'Parking spot' : 'No Parking'}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap bg-gray-100 px-2 py-1 rounded'>
              <FaChair className='text-lg text-blue-700' />
              {listing.furnished ? 'Furnished' : 'Unfurnished'}
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
} 