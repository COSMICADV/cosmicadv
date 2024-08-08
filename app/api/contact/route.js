import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, name, message, phone } = await req.json();

    if (!email || !email.includes('@') || !name.trim() || !message.trim()) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 422 });
    }

    const newMessage = { email, name, phone, message };
    console.log(newMessage);

    let client;
    try {
      client = await MongoClient.connect(
        'mongodb+srv://shabaan:XmnfZhRGFIezBw8y@cosmic.botjfdk.mongodb.net/'
      );
    } catch (e) {
      console.log(e);
      return;
    }
    const db = client.db();
    try {
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (e) {
      console.log(e);
      return;
    }

    client.close();

    return NextResponse.json({
      message: 'Success',
      data: { email, name, phone, message },
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred', error },
      { status: 500 }
    );
  }
}
