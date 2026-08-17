import { MongoClient } from 'mongodb';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const MONGODB_URI = 'mongodb+srv://user1:TwdOxChhOdAhpyA2@cluster0.2evbyaj.mongodb.net/';

function escapeCSV(value) {
  if (value == null) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

async function main() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();

    // Detect DB name from URI path
    const dbName = new URL(MONGODB_URI).pathname.replace(/^\//, '') || 'mydatabase';
    const db = client.db(dbName);

    const reviews = await db.collection('reviews').find({}).sort({ createdAt: -1 }).toArray();

    if (reviews.length === 0) {
      console.log('No reviews found in the database.');
      return;
    }

    const headers = ['id', 'name', 'title', 'company', 'location', 'stars', 'status', 'words', 'createdAt'];
    const rows = reviews.map((r) => [
      r._id.toString(),
      r.name,
      r.title,
      r.company || '',
      r.location || '',
      r.stars,
      r.status,
      r.words,
      r.createdAt ? new Date(r.createdAt).toISOString() : '',
    ].map(escapeCSV).join(','));

    const csv = [headers.join(','), ...rows].join('\n');

    const outPath = resolve('reviews-backup.csv');
    writeFileSync(outPath, csv, 'utf8');
    console.log(`✓ Exported ${reviews.length} reviews → ${outPath}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error('Export failed:', err.message);
  process.exit(1);
});
