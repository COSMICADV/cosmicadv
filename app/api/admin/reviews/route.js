import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

function isAdmin(req) {
  const password = req.headers.get('x-admin-password');
  return password === process.env.ADMIN_PASSWORD;
}

// GET – list all reviews (pending, approved, rejected) – admin only
export async function GET(req) {
  if (!isAdmin(req)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const db = await getDb();
    const reviews = await db
      .collection('reviews')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const serialized = reviews.map((r) => ({
      _id: r._id.toString(),
      name: r.name,
      title: r.title,
      stars: r.stars,
      words: r.words,
      status: r.status,
      createdAt: r.createdAt?.toISOString?.() ?? null,
    }));

    return NextResponse.json(serialized);
  } catch (error) {
    console.error('Admin reviews GET error:', error);
    return NextResponse.json(
      { message: 'Failed to load reviews' },
      { status: 500 }
    );
  }
}
