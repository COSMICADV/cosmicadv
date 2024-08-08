import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    let client;
    try {
      client = await MongoClient.connect(
        'mongodb+srv://shabaan:XmnfZhRGFIezBw8y@cosmic.botjfdk.mongodb.net/'
      );
    } catch (e) {
      console.log(e);
      return NextResponse.json({ message: 'Failed to connect' });
    }
    const db = client.db();
    let messages;
    try {
      messages = await db.collection('messages').find().toArray();
    } catch (e) {
      console.log(e);
      return NextResponse.json({ message: 'Failed to resolve Message' });
    }

    client.close();
    return NextResponse.json({ messages: messages });
  } catch (e) {
    return NextResponse.json({ message: 'Failed to connect' }, { status: 500 });
  }
}
