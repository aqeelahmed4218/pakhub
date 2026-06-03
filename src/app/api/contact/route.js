import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { senderName, senderEmail, message, listingId, listingTitle, recipientEmail } = await req.json();
    if (!senderName || !senderEmail || !message || !recipientEmail) {
      return NextResponse.json({ success: false, error: 'Missing required fields.' }, { status: 400 });
    }
    const emailRes = await resend.emails.send({
      from: 'PakHub <noreply@yourdomain.com>',
      to: recipientEmail,
      subject: `New inquiry for your listing: ${listingTitle}`,
      html: `<p>You have received a new message about your listing <b>${listingTitle}</b> (ID: ${listingId}):</p>
             <p><b>From:</b> ${senderName} (${senderEmail})</p>
             <p><b>Message:</b></p>
             <p>${message}</p>`
    });
    if (emailRes.error) {
      return NextResponse.json({ success: false, error: emailRes.error }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
} 