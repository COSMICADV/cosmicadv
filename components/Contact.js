'use client';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Contact() {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPhone, setEnteredPhone] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const loadingToast = toast.loading('Sending...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          name: enteredName,
          phone: enteredPhone,
          message: enteredMessage,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      toast.success('Message sent successfully!', {
        id: loadingToast,
      });

      setEnteredName('');
      setEnteredEmail('');
      setEnteredPhone('');
      setEnteredMessage('');
    } catch (error) {
      toast.error('Failed to send message. Please try again.', {
        id: loadingToast,
      });
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-6 sm:px-8 sm:py-12 md:px-24 md:py-16 bg-white"
      id="contact-me"
    >
      <div className="w-full max-w-xl p-8 bg-white rounded-lg">
        <Toaster />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center text-gray-800">
          Contact Us
        </h1>
        {/* <h2 className="text-lg sm:text-xl md:text-2xl mb-10 text-center text-gray-600">
          Let’s talk about how we can make your brand stand out and grow your
          business.
        </h2> */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={(e) => setEnteredName(e.target.value)}
              value={enteredName}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={enteredPhone}
              onChange={(e) => setEnteredPhone(e.target.value)}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              value={enteredMessage}
              onChange={(e) => setEnteredMessage(e.target.value)}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-md  hover:bg-gray-900 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Prefer a call? No problem. In case we cannot answer the phone, use the
          email form for a callback request.
          <br />
          +20 1000 581 080
        </p>
      </div>
    </div>
  );
}
