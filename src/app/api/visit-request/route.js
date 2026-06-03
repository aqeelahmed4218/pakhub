import VisitRequest from '@/lib/models/visitRequest.model';
import { connect } from '@/lib/mongodb/mongoose';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connect();
    const { listingId, listingTitle, ownerUserRef, visitorUserRef, visitorName, visitorEmail, date, time, message } = await req.json();
    if (!listingId || !listingTitle || !ownerUserRef || !visitorUserRef || !visitorName || !visitorEmail || !date || !time) {
      return NextResponse.json({ success: false, error: 'Missing required fields.' }, { status: 400 });
    }
    const visit = await VisitRequest.create({
      listingId,
      listingTitle,
      ownerUserRef,
      visitorUserRef,
      visitorName,
      visitorEmail,
      date,
      time,
      message,
    });
    return NextResponse.json({ success: true, visit });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connect();
    const { searchParams } = new URL(req.url);
    const ownerUserRef = searchParams.get('ownerUserRef');
    if (!ownerUserRef) return NextResponse.json({ error: 'Missing ownerUserRef' }, { status: 400 });
    const visits = await VisitRequest.find({ ownerUserRef }).sort({ createdAt: -1 });
    return NextResponse.json({ visits });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
} 