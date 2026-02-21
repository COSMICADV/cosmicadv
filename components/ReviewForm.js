'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ReviewForm() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [stars, setStars] = useState(3);
  const [words, setWords] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const loadingToast = toast.loading('Submitting...');
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, title, stars, words }),
      });
      const data = await res.json().catch(() => ({ message: 'Invalid response' }));
      if (!res.ok) {
        toast.error(data.message || 'Something went wrong', { id: loadingToast });
        return;
      }
      toast.success(data.message || 'Thank you! Your review will appear after approval.', {
        id: loadingToast,
      });
      setName('');
      setTitle('');
      setStars(3);
      setWords('');
    } catch (err) {
      toast.error(err.message || 'Failed to submit. Please try again.', { id: loadingToast });
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Toaster position="top-center" />
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Leave a review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Marketing Manager, CEO"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How would you rate our service?
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setStars(n)}
                className={`text-2xl focus:outline-none transition transform hover:scale-110 ${
                  n <= stars ? 'text-amber-500' : 'text-gray-300'
                }`}
                aria-label={`${n} star${n > 1 ? 's' : ''}`}
              >
                ★
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">{stars} out of 5</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What do you say about us?
          </label>
          <textarea
            value={words}
            onChange={(e) => setWords(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-all duration-300"
        >
          Submit review
        </button>
      </form>
    </div>
  );
}
