import User from '@/lib/models/user.model';
import { connect } from '@/lib/mongodb/mongoose';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connect();
    const { userRef } = await req.json();
    if (!userRef) return NextResponse.json({ error: 'Missing userRef' }, { status: 400 });
    const user = await User.findById(userRef);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ email: user.email });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
} 