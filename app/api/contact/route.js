// import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

export async function POST(request) {
  const { email, name, message } = await request.json();

  // Perform necessary actions (e.g., save to database, send email, etc.)

  // Respond with success message
  console.log(email, name, message);
  return new Response(
    JSON.stringify({ message: 'Message received successfully' }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
