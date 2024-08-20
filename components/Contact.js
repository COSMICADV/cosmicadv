'use client';
import Image from 'next/image';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Contact() {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPhone, setEnteredPhone] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    // Show loading toast
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

      const result = await response.json();

      // Show success toast
      toast.success('Message sent successfully!', {
        id: loadingToast,
      });

      // Reset form fields
      setEnteredName('');
      setEnteredEmail('');
      setEnteredPhone('');
      setEnteredMessage('');
    } catch (error) {
      // Show error toast
      toast.error('Failed to send message. Please try again.', {
        id: loadingToast,
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">
      <Toaster />
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-black text-center">
        Improve your brand performance.
      </h1>
      <h2 className="text-lg sm:text-xl md:text-2xl mb-10 text-center">
        Let’s talk about how we can make your brand stick out from the crowd and
        grow your business.
      </h2>
      <div className="flex flex-wrap items-start justify-center w-full max-w-5xl">
        <div className="w-full md:w-1/2 p-4 my-10 bg-gray-200 rounded-md shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-black">
                Name
              </label>
              <input
                type="text"
                name="name"
                onChange={(e) => setEnteredName(e.target.value)}
                value={enteredName}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-black">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={enteredEmail}
                onChange={(e) => setEnteredEmail(e.target.value)}
                className="mt-1 block w-full p-3 rounded-md border border-gray-300"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-black">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={enteredPhone}
                onChange={(e) => setEnteredPhone(e.target.value)}
                className="mt-1 block w-full p-3 rounded-md border border-gray-300"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-black">
                Message
              </label>
              <textarea
                name="message"
                value={enteredMessage}
                onChange={(e) => setEnteredMessage(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        {/* Uncomment and adjust the image section as needed */}
        {/* <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          <Image
            src="/office.webp" // Ensure the path is correct
            alt="Office image"
            width={500}
            height={500}
            className="rounded-md"
          />
        </div> */}
      </div>
      <p className="mt-6 text-center">
        Prefer a call? No problem. In case we cannot answer the phone, use the
        email form for a callback request.
        <br />
        +20 1000 581 080
      </p>
    </div>
  );
}
