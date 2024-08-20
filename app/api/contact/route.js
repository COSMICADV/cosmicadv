import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { email, name, message, phone } = await req.json();

    if (!email || !email.includes('@') || !name.trim() || !message.trim()) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 422 });
    }

    const newMessage = { email, name, phone, message };

    let client;
    try {
      client = await MongoClient.connect(
        'mongodb+srv://shabaan:XmnfZhRGFIezBw8y@cosmic.botjfdk.mongodb.net/'
      );
    } catch (e) {
      console.error('Database connection failed:', e);
      return NextResponse.json(
        { message: 'Could not connect to the database' },
        { status: 500 }
      );
    }

    const db = client.db();
    try {
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (e) {
      console.error('Storing message failed:', e);
      client.close();
      return NextResponse.json(
        { message: 'Storing message failed' },
        { status: 500 }
      );
    }

    client.close();

    let transporter;
    try {
      transporter = nodemailer.createTransport({
        service: 'gmail', // or another email service
        auth: {
          user: 'a.shaban14617@gmail.com',
          pass: 'vcxz mykh apnx kyue',
        },
      });

      const mailOptions = {
        from: 'as6061907@gmail.com',
        to: 'a.shaban14617@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
      };

      await transporter.sendMail(mailOptions);
    } catch (e) {
      console.error('Email sending failed:', e);
      return NextResponse.json(
        { message: 'Email sending failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Success',
      data: { email, name, phone, message },
    });
  } catch (error) {
    console.error('An error occurred:', error);
    return NextResponse.json(
      { message: 'An error occurred', error },
      { status: 500 }
    );
  }
}
