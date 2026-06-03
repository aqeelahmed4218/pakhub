import Message from '@/lib/models/message.model';
import { connect } from '@/lib/mongodb/mongoose';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connect();
    const { toUserRef, fromUserRef, fromName, fromEmail, listingId, listingTitle, message } = await req.json();
    if (!toUserRef || !fromUserRef || !fromName || !fromEmail || !listingId || !listingTitle || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields.' }, { status: 400 });
    }
    const msg = await Message.create({
      toUserRef,
      fromUserRef,
      fromName,
      fromEmail,
      listingId,
      listingTitle,
      message,
    });
    return NextResponse.json({ success: true, message: msg });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connect();
    const { searchParams } = new URL(req.url);
    const toUserRef = searchParams.get('toUserRef');
    if (!toUserRef) return NextResponse.json({ error: 'Missing toUserRef' }, { status: 400 });
    const messages = await Message.find({ toUserRef }).sort({ createdAt: -1 });
    return NextResponse.json({ messages });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
} 