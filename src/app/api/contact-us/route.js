import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

// General "Contact Us" form handler.
// Sends an email to the site owner. If RESEND_API_KEY isn't configured yet,
// it logs the submission instead of crashing so the form still "works".
export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Please fill in your name, email, and message.' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL || 'thewisdomalgorithm@gmail.com';

    // Graceful fallback: no email provider configured yet.
    if (!apiKey) {
      console.log('[Contact Us] (no RESEND_API_KEY set) New message:', {
        name,
        email,
        subject,
        message,
      });
      return NextResponse.json({
        success: true,
        note: 'Message received. (Email delivery is not configured yet.)',
      });
    }

    const resend = new Resend(apiKey);
    const emailRes = await resend.emails.send({
      from: 'PakHub Contact <onboarding@resend.dev>',
      to: toEmail,
      reply_to: email,
      subject: subject
        ? `[PakHub Contact] ${subject}`
        : `[PakHub Contact] New message from ${name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        ${subject ? `<p><b>Subject:</b> ${subject}</p>` : ''}
        <p><b>Message:</b></p>
        <p>${String(message).replace(/\n/g, '<br/>')}</p>
      `,
    });

    if (emailRes.error) {
      console.error('[Contact Us] Resend error:', emailRes.error);
      return NextResponse.json(
        { success: false, error: 'Could not send your message. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact Us] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
