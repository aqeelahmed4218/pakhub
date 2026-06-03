'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export default function Footer() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ loading: false, ok: null, msg: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, ok: null, msg: '' });
    try {
      const res = await fetch('/api/contact-us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          loading: false,
          ok: true,
          msg: 'Thanks for reaching out — we will get back to you soon.',
        });
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          loading: false,
          ok: false,
          msg: data.error || 'Could not send your message. Please try again.',
        });
      }
    } catch (err) {
      setStatus({
        loading: false,
        ok: false,
        msg: 'Network error. Please try again.',
      });
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer id='contact' className='bg-gray-900 text-gray-200 mt-16'>
      <div className='max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10'>
        {/* Brand + about */}
        <div>
          <h2 className='text-2xl font-bold mb-3'>
            <span className='text-primary'>Pak</span>
            <span className='text-white'>Hub</span>
          </h2>
          <p className='text-sm text-gray-400 leading-relaxed'>
            Multan&apos;s trusted platform to find properties for rent and sale.
            Browse, view, and connect with sellers with ease.
          </p>
          <div className='flex gap-3 mt-5'>
            {[
              { Icon: FaFacebookF, label: 'Facebook' },
              { Icon: FaTwitter, label: 'Twitter' },
              { Icon: FaInstagram, label: 'Instagram' },
              { Icon: FaLinkedinIn, label: 'LinkedIn' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href='#'
                aria-label={label}
                className='w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition-colors'
              >
                <Icon className='text-sm' />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links + contact info */}
        <div>
          <h3 className='text-lg font-semibold mb-4 text-white'>Quick Links</h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <Link href='/' className='text-gray-400 hover:text-primary transition-colors'>
                Home
              </Link>
            </li>
            <li>
              <Link href='/about' className='text-gray-400 hover:text-primary transition-colors'>
                About
              </Link>
            </li>
            <li>
              <Link href='/search' className='text-gray-400 hover:text-primary transition-colors'>
                Browse Listings
              </Link>
            </li>
            <li>
              <Link href='/map' className='text-gray-400 hover:text-primary transition-colors'>
                Map
              </Link>
            </li>
          </ul>

          <h3 className='text-lg font-semibold mt-6 mb-4 text-white'>Get in Touch</h3>
          <ul className='space-y-3 text-sm text-gray-400'>
            <li className='flex items-center gap-3'>
              <FaMapMarkerAlt className='text-primary shrink-0' /> Multan, Pakistan
            </li>
            <li className='flex items-center gap-3'>
              <FaEnvelope className='text-primary shrink-0' /> support@pakhub.com
            </li>
            <li className='flex items-center gap-3'>
              <FaPhoneAlt className='text-primary shrink-0' /> +92 300 0000000
            </li>
          </ul>
        </div>

        {/* Contact form */}
        <div>
          <h3 className='text-lg font-semibold mb-4 text-white'>Contact Us</h3>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <input
              id='name'
              type='text'
              required
              placeholder='Your name'
              value={form.name}
              onChange={handleChange}
              className='bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary'
            />
            <input
              id='email'
              type='email'
              required
              placeholder='Your email'
              value={form.email}
              onChange={handleChange}
              className='bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary'
            />
            <input
              id='subject'
              type='text'
              placeholder='Subject (optional)'
              value={form.subject}
              onChange={handleChange}
              className='bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary'
            />
            <textarea
              id='message'
              required
              rows={3}
              placeholder='Your message'
              value={form.message}
              onChange={handleChange}
              className='bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none'
            />
            <button
              type='submit'
              disabled={status.loading}
              className='bg-primary text-white rounded-lg p-2.5 text-sm font-semibold uppercase hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60'
            >
              {status.loading ? 'Sending...' : 'Send Message'}
            </button>
            {status.ok === true && (
              <p className='text-sm text-emerald-400'>{status.msg}</p>
            )}
            {status.ok === false && (
              <p className='text-sm text-red-400'>{status.msg}</p>
            )}
          </form>
        </div>
      </div>

      <div className='border-t border-gray-800'>
        <p className='max-w-6xl mx-auto px-6 py-5 text-center text-xs text-gray-500'>
          © {year} PakHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
