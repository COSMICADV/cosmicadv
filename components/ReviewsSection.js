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

export default function ReviewsSection() {
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
    <div className="min-h-screen bg-white py-12 px-4 md:px-8" id="reviews">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center text-gray-800">
          What our clients say
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto font-medium">
          Real feedback from people we&apos;ve worked with.
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Loading reviews…</p>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {reviews.map((r) => (
              <article
                key={r._id}
                className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm font-regular"
              >
                <div className="flex items-center gap-2 mb-3">
                  <StarDisplay stars={r.stars} />
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed font-regular">&ldquo;{r.words}&rdquo;</p>
                <div>
                  <p className=" text-black font-regular">{r.name}</p>
                  <p className="text-sm text-gray-500 font-regular">{r.title}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mb-12">No reviews yet. Be the first to leave one.</p>
        )}

        {/* <div className="text-center pt-8">
          <Link
            href="/review"
            className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-all duration-300"
          >
            Leave a review
          </Link>
        </div> */}
      </div>
    </div>
  );
}
