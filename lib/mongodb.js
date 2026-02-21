import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please add MONGODB_URI to your .env');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb() {
  const c = await clientPromise;
  let dbName = process.env.MONGODB_DB_NAME;
  if (!dbName && uri) {
    try {
      const pathname = new URL(uri).pathname?.replace(/^\//, '');
      if (pathname) dbName = pathname;
    } catch (_) {}
  }
  return c.db(dbName || 'mydatabase');
}
