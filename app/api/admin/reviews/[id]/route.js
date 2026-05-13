import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

function isAdmin(req) {
  const password = req.headers.get('x-admin-password');
  return password === process.env.ADMIN_PASSWORD;
}

// PATCH – approve or reject a review – admin only
export async function PATCH(req, { params }) {
  if (!isAdmin(req)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (status !== 'approved' && status !== 'rejected') {
      return NextResponse.json(
        { message: 'Status must be "approved" or "rejected"' },
        { status: 422 }
      );
    }

    const db = await getDb();
    const result = await db.collection('reviews').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Review updated', status });
  } catch (error) {
    console.error('Admin review PATCH error:', error);
    return NextResponse.json(
      { message: 'Failed to update review' },
      { status: 500 }
    );
  }
}

// DELETE – permanently remove a review – admin only
export async function DELETE(req, { params }) {
  if (!isAdmin(req)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { id } = await params;
    const db = await getDb();
    const result = await db.collection('reviews').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Review deleted' });
  } catch (error) {
    console.error('Admin review DELETE error:', error);
    return NextResponse.json(
      { message: 'Failed to delete review' },
      { status: 500 }
    );
  }
}
