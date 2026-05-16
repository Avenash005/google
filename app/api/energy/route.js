import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import mongoose from 'mongoose';

// Energy Reading Schema
const energySchema = new mongoose.Schema({
  value: Number,
  timestamp: Date,
  createdAt: { type: Date, default: Date.now },
});

// Energy Model
const EnergyReading = mongoose.models.EnergyReading || mongoose.model('EnergyReading', energySchema);

// GET /api/energy - Fetch energy readings
export async function GET() {
  try {
    await connectDB();
    
    if (!mongoose.connection.readyState) {
      return NextResponse.json([
        { value: 48, timestamp: new Date(), createdAt: new Date() },
        { value: 52, timestamp: new Date(), createdAt: new Date() },
        { value: 61, timestamp: new Date(), createdAt: new Date() },
      ]);
    }
    
    const readings = await EnergyReading.find({}).sort({ createdAt: -1 }).limit(20);
    return NextResponse.json(readings);
  } catch (error) {
    console.error('Error fetching energy:', error);
    return NextResponse.json({ error: 'Failed to fetch energy' }, { status: 500 });
  }
}

// POST /api/energy - Create energy reading
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const reading = await EnergyReading.create({
      value: body.value,
      timestamp: new Date(),
    });
    
    return NextResponse.json(reading, { status: 201 });
  } catch (error) {
    console.error('Error creating energy reading:', error);
    return NextResponse.json({ error: 'Failed to create energy reading' }, { status: 500 });
  }
}
