import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import mongoose from 'mongoose';

// Feed Event Schema
const feedSchema = new mongoose.Schema({
  id: String,
  tag: String,
  title: String,
  time: String,
  impact: { type: String, default: 'Low' },
  createdAt: { type: Date, default: Date.now },
});

// Feed Model
const FeedEvent = mongoose.models.FeedEvent || mongoose.model('FeedEvent', feedSchema);

// GET /api/feed - Fetch feed events
export async function GET() {
  try {
    await connectDB();
    
    if (!mongoose.connection.readyState) {
      // Mock data when no DB
      return NextResponse.json([
        { id: 'ev_1', tag: 'G', title: 'Goal! Spectacular strike 🎯', time: new Date().toLocaleTimeString(), impact: 'High' },
        { id: 'ev_2', tag: 'W', title: 'Wicket – close call 🎪', time: new Date().toLocaleTimeString(), impact: 'Medium' },
      ]);
    }
    
    const events = await FeedEvent.find({}).sort({ createdAt: -1 }).limit(50);
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching feed:', error);
    return NextResponse.json({ error: 'Failed to fetch feed' }, { status: 500 });
  }
}

// POST /api/feed - Create feed event
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const event = await FeedEvent.create(body);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error creating feed event:', error);
    return NextResponse.json({ error: 'Failed to create feed event' }, { status: 500 });
  }
}
