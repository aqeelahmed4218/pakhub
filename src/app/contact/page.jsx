'use client';

import { useState } from 'react';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export default function ContactPage() {
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

  return (
    <main className='max-w-6xl mx-auto px-6 py-12 min-h-[70vh]'>
      <h1 className='text-3xl font-bold text-foreground mb-2'>Contact Us</h1>
      <p className='text-muted mb-10'>
        Have a question or want to list your property? Send us a message and our
        team will get back to you.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Info */}
        <div className='space-y-6'>
          <div className='flex items-start gap-4'>
            <span className='w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary shrink-0'>
              <FaMapMarkerAlt />
            </span>
            <div>
              <h3 className='font-semibold text-foreground'>Office</h3>
              <p className='text-muted text-sm'>Multan, Pakistan</p>
            </div>
          </div>
          <div className='flex items-start gap-4'>
            <span className='w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary shrink-0'>
              <FaEnvelope />
            </span>
            <div>
              <h3 className='font-semibold text-foreground'>Email</h3>
              <p className='text-muted text-sm'>aqeel@pakhub.com</p>
              <p className='text-muted text-sm'>rehman@pakhub.com</p>
            </div>
          </div>
          <div className='flex items-start gap-4'>
            <span className='w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary shrink-0'>
              <FaPhoneAlt />
            </span>
            <div>
              <h3 className='font-semibold text-foreground'>Phone</h3>
              <p className='text-muted text-sm'>03015444218</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className='bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col gap-4'
        >
          <input
            id='name'
            type='text'
            required
            placeholder='Your name'
            value={form.name}
            onChange={handleChange}
            className='border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-primary'
          />
          <input
            id='email'
            type='email'
            required
            placeholder='Your email'
            value={form.email}
            onChange={handleChange}
            className='border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-primary'
          />
          <input
            id='subject'
            type='text'
            placeholder='Subject (optional)'
            value={form.subject}
            onChange={handleChange}
            className='border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-primary'
          />
          <textarea
            id='message'
            required
            rows={5}
            placeholder='Your message'
            value={form.message}
            onChange={handleChange}
            className='border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-primary resize-none'
          />
          <button
            type='submit'
            disabled={status.loading}
            className='bg-primary text-white rounded-lg p-3 text-sm font-semibold uppercase hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60'
          >
            {status.loading ? 'Sending...' : 'Send Message'}
          </button>
          {status.ok === true && (
            <p className='text-sm text-emerald-600'>{status.msg}</p>
          )}
          {status.ok === false && (
            <p className='text-sm text-red-600'>{status.msg}</p>
          )}
        </form>
      </div>
    </main>
  );
}
