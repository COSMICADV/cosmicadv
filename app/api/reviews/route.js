import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

// POST – submit a new review (saved as pending)
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, title, company, location, stars, words } = body;

    if (!name?.trim() || !title?.trim() || !words?.trim()) {
      return NextResponse.json(
        { message: 'Name, title, and review text are required' },
        { status: 422 }
      );
    }

    const starsNum = parseInt(stars, 10);
    if (isNaN(starsNum) || starsNum < 1 || starsNum > 5) {
      return NextResponse.json(
        { message: 'Please choose a rating between 1 and 5 stars' },
        { status: 422 }
      );
    }

    const db = await getDb();
    const newReview = {
      name: name.trim(),
      title: title.trim(),
      company: company?.trim() || '',
      location: location?.trim() || '',
      stars: starsNum,
      words: words.trim(),
      status: 'pending', // pending | approved | rejected
      createdAt: new Date(),
    };

    const result = await db.collection('reviews').insertOne(newReview);

    return NextResponse.json({
      message: 'Thank you! Your review has been submitted and will appear after approval.',
      id: result.insertedId.toString(),
    });
  } catch (error) {
    console.error('Reviews POST error:', error);
    const message =
      process.env.NODE_ENV === 'development'
        ? error.message || 'Failed to submit review'
        : 'Failed to submit review';
    return NextResponse.json({ message }, { status: 500 });
  }
}

// GET – return only approved reviews (for home page)
export async function GET() {
  try {
    const db = await getDb();
    const reviews = await db
      .collection('reviews')
      .find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .toArray();

    const serialized = reviews.map((r) => ({
      _id: r._id.toString(),
      name: r.name,
      title: r.title,
      location: r.location || '',
      stars: r.stars,
      words: r.words,
      createdAt: r.createdAt?.toISOString?.() ?? null,
    }));

    return NextResponse.json(serialized);
  } catch (error) {
    console.error('Reviews GET error:', error);
    return NextResponse.json(
      { message: 'Failed to load reviews' },
      { status: 500 }
    );
  }
}
