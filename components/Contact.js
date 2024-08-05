'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Contact() {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-black">
      <div className="w-full max-w-xs p-4 mt-8 flex items-center justify-center">
        {/* <Image src={'/COSMIC.svg'} width={200} height={100} alt="COSMIC ADV" /> */}
        <h1 className="text-4xl font-bold mb-5 text-white">Contact Us</h1>
      </div>
      <div className="w-full max-w-md p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={(e) => setEnteredName(e.target.value)}
              value={enteredName}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-300">
              Message
            </label>
            <textarea
              name="message"
              value={enteredMessage}
              onChange={(e) => setEnteredMessage(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
