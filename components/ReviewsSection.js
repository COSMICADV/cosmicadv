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

function ReviewCard({ r }) {
  return (
    <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col">
      <StarDisplay stars={r.stars} />
      <p className="text-gray-700 mt-4 mb-6 text-lg leading-relaxed flex-1">&ldquo;{r.words}&rdquo;</p>
      <div>
        <p className="text-black font-semibold">{r.name}</p>
        {r.title && <p className="text-sm text-gray-500">{r.title}</p>}
        {r.company && <p className="text-sm text-gray-500">{r.company}</p>}
        {r.location && <p className="text-sm text-gray-400">{r.location}</p>}
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.ok ? res.json() : [])
      .then((data) => {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        const grouped = [];
        for (let i = 0; i < shuffled.length; i += 2) {
          grouped.push(shuffled.slice(i, i + 2));
        }
        setPairs(grouped);
        if (grouped.length > 1) {
          setCurrent(Math.floor(Math.random() * grouped.length));
        }
      })
      .catch(() => setPairs([]))
      .finally(() => setLoading(false));
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + pairs.length) % pairs.length);
  const next = () => setCurrent((c) => (c + 1) % pairs.length);

  return (
    <div className="bg-white py-12 px-4 md:px-8" id="reviews">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 text-center text-gray-800">
          Experiences that speak
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading reviews…</p>
        ) : pairs.length > 0 ? (
          <div className="relative">
            {/* Carousel track */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {pairs.map((pair, i) => (
                  <div key={i} className="min-w-full px-4 md:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {pair.map((r) => (
                        <ReviewCard key={r._id} r={r} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrows */}
            {pairs.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition"
                  aria-label="Previous reviews"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition"
                  aria-label="Next reviews"
                >
                  ›
                </button>
              </>
            )}

            {/* Dots */}
            {pairs.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {pairs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? 'bg-black' : 'bg-gray-300'}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500 mb-12">No reviews yet. Be the first to leave one.</p>
        )}

        <div className="text-center mt-10">
          <Link
            href="/reviews"
            className="inline-block border border-black text-black px-6 py-3 rounded-md hover:bg-black hover:text-white transition-all duration-300"
          >
            View all reviews
          </Link>
        </div>
      </div>
    </div>
  );
}
