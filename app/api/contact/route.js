// import { MongoClient } from 'mongodb';
// import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer'; // Make sure this import statement is correct

// export async function POST(req) {
//   try {
//     const { email, name, message, phone } = await req.json();

//     // Validate input
//     if (!email || !email.includes('@') || !name.trim() || !message.trim()) {
//       return NextResponse.json({ message: 'Invalid input' }, { status: 422 });
//     }

//     const newMessage = { email, name, phone, message };

//     // Connect to MongoDB
//     let client;
//     try {
//       client = await MongoClient.connect(
//         `mongodb+srv://shabaan:${process.env.MONGO_PASSWORD}@cosmic.botjfdk.mongodb.net/`,
//         { useNewUrlParser: true, useUnifiedTopology: true }
//       );
//     } catch (e) {
//       console.error('Database connection failed:', e);
//       return NextResponse.json(
//         { message: 'Could not connect to the database' },
//         { status: 500 }
//       );
//     }

//     // Store message in the database
//     const db = client.db();
//     try {
//       const result = await db.collection('messages').insertOne(newMessage);
//       newMessage.id = result.insertedId;
//     } catch (e) {
//       console.error('Storing message failed:', e);
//       client.close();
//       return NextResponse.json(
//         { message: 'Storing message failed' },
//         { status: 500 }
//       );
//     }

//     client.close();

//     // Configure Nodemailer transporter
//     let transporter;
//     try {
//       transporter = nodemailer.createTransport({
//         host: process.env.EMAIL_HOST,
//         port: 465, // SSL/TLS port
//         secure: true, // true for 465, false for other ports
//         auth: {
//           user: process.env.EMAIL_USERNAME,
//           pass: process.env.EMAIL_PASSWORD,
//         },
//         tls: {
//           rejectUnauthorized: false, // Optional: Use this if you're having issues with self-signed certificates
//         },
//         dnsLookup: (hostname, options, cb) => {
//           require('dns').lookup(hostname, { family: 4 }, cb); // Force IPv4
//         },
//       });

//       const mailOptions = {
//         from: process.env.EMAIL_USERNAME,
//         to: process.env.EMAIL_USERNAME,
//         subject: `New Contact Form Submission from ${name}`,
//         text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
//       };

//       await transporter.sendMail(mailOptions);
//     } catch (e) {
//       console.error('Email sending failed:', e);
//       return NextResponse.json(
//         { message: 'Email sending failed' },
//         { status: 500 }
//       );
//     }

//     // Return success response
//     return NextResponse.json({
//       message: 'Success',
//       data: { email, name, phone, message },
//     });
//   } catch (error) {
//     console.error('An error occurred:', error);
//     return NextResponse.json(
//       { message: 'An error occurred', error },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { email, name, message, phone } = await req.json();

    // Validate input
    if (!email || !email.includes('@') || !name.trim() || !message.trim()) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 422 });
    }

    // Configure Nodemailer transporter
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        host: 'mail.lonex.com',
        port: 465, // SSL/TLS port
        secure: true, // true for 465, false for other ports
        auth: {
          // user: process.env.RECIPIENT_EMAIL,
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
        dnsLookup: (hostname, options, cb) => {
          require('dns').lookup(hostname, { family: 4 }, cb); // Force IPv4
        },
      });

      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: process.env.USER_EMAIL,
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

    // Return success response
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
