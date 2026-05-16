import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import mongoose from 'mongoose';

// Agent Schema
const agentSchema = new mongoose.Schema({
  id: String,
  name: String,
  subtitle: String,
  activity: String,
  color: String,
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now },
});

// Agent Model
const Agent = mongoose.models.Agent || mongoose.model('Agent', agentSchema);

// GET /api/agents - Fetch all agents
export async function GET() {
  try {
    await connectDB();
    
    // If no DB connection, return mock data
    if (!mongoose.connection.readyState) {
      return NextResponse.json([
        { id: 'hype', name: 'Hype Agent', subtitle: 'Detects exciting moments', activity: 'Scanning highlights', color: 'purple' },
        { id: 'emotion', name: 'Crowd Emotion', subtitle: 'Mood analysis & emoji', activity: 'Analyzing cheers', color: 'cyan' },
        { id: 'story', name: 'Storyline', subtitle: 'Cinematic narratives', activity: 'Weaving arcs', color: 'amber' },
        { id: 'challenge', name: 'Challenge', subtitle: 'Fan predictions & games', activity: 'Preparing poll', color: 'green' },
        { id: 'community', name: 'Community', subtitle: 'Tribes & engagement', activity: 'Grouping fans', color: 'cyan' },
      ]);
    }
    
    const agents = await Agent.find({});
    return NextResponse.json(agents);
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 });
  }
}

// POST /api/agents - Create new agent
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const agent = await Agent.create(body);
    return NextResponse.json(agent, { status: 201 });
  } catch (error) {
    console.error('Error creating agent:', error);
    return NextResponse.json({ error: 'Failed to create agent' }, { status: 500 });
  }
}
