'use client';

import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
export default function Header() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };
  
  return (
    <header className='bg-white shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link href='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-primary'>Pak</span>
            <span className='text-secondary'>Hub</span>
          </h1>
        </Link>
        <form
          className='bg-gray-50 p-3 rounded-lg flex items-center'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64 text-foreground'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type='submit' aria-label='Search'>
            <FaSearch className='text-secondary' />
          </button>
        </form>
        <ul className='flex gap-4'>
          <Link href='/'>
            <li className='hidden md:inline text-secondary hover:text-primary transition-colors'>
              Home
            </li>
          </Link>
          <Link href='/about'>
            <li className='hidden md:inline text-secondary hover:text-primary transition-colors'>
              About
            </li>
          </Link>
          <Link href='/map'>
            <li className='hidden md:inline text-secondary hover:text-primary transition-colors'>
              Map
            </li>
          </Link>
          <SignedIn>
            <Link href='/my-listings'>
              <li className='hidden md:inline text-secondary hover:text-primary transition-colors'>
                My Listings
              </li>
            </Link>
            <Link href='/inbox'>
              <li className='hidden md:inline text-secondary hover:text-primary transition-colors'>
                Inbox
              </li>
            </Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href='/sign-in'>
              <li className='hidden md:inline list-none'>
                <span className='px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-150 shadow-sm'>
                  Sign In
                </span>
              </li>
            </Link>
          </SignedOut>
        </ul>
      </div>
    </header>
  );
}
