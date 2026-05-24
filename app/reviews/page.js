'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function StarDisplay({ stars }) {
  return (
    <span className="text-amber-500" aria-label={`${stars} out of 5 stars`}>
      {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
    </span>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.ok ? res.json() : [])
      .then(setReviews)
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white pt-28 pb-16 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10">
          <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">
            ← Back to home
          </Link>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 text-center text-gray-800">
          All Reviews
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading reviews…</p>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <article
                key={r._id}
                className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="mb-3">
                  <p className="text-black font-semibold">{r.name}</p>
                  {r.title && <p className="text-sm text-gray-500">{r.title}</p>}
                  {r.company && <p className="text-sm text-gray-500">{r.company}</p>}
                  {r.location && <p className="text-sm text-gray-400">{r.location}</p>}
                </div>
                <StarDisplay stars={r.stars} />
                <p className="text-gray-700 mt-3 leading-relaxed">&ldquo;{r.words}&rdquo;</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
