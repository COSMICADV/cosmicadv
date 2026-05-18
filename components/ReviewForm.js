'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/COSMIC+advertising+solutions/@30.0055535,31.4698295,17z/data=!3m1!4b1!4m6!3m5!1s0x1458413b331675d1:0xbefede3201b5db8b!8m2!3d30.0055535!4d31.4698295!16s%2Fg%2F1tttj01k?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D';

const LOCATIONS = [
  'United Arab Emirates',
  'Saudi Arabia',
  'Kuwait',
  'Qatar',
  'Bahrain',
  'Oman',
  'Egypt',
  'United States',
  'United Kingdom',
  'Other',
];

function PersonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-gray-400 shrink-0">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-gray-400 shrink-0">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-gray-400 shrink-0">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-gray-400 shrink-0">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 shrink-0 pointer-events-none">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );
}

function SuccessModal() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center text-center">
        {/* Checkmark */}
        <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        <h3 className="text-xl font-bold text-black mb-2">Thank you!</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          Your review has been submitted and will appear after approval. We truly appreciate you taking the time to share your experience with COSMiC.
        </p>

        <div className="flex flex-col gap-3 w-full">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-900 transition-all duration-200 active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Review us on Google
          </a>

          <button
            onClick={() => router.push('/')}
            className="w-full py-3 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200 active:scale-95"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ReviewForm() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [stars, setStars] = useState(5);
  const [words, setWords] = useState('');
  const [showModal, setShowModal] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const loadingToast = toast.loading('Submitting...');
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, title, company, location, stars, words }),
      });
      const data = await res.json().catch(() => ({ message: 'Invalid response' }));
      if (!res.ok) {
        toast.error(data.message || 'Something went wrong', { id: loadingToast });
        return;
      }
      toast.dismiss(loadingToast);
      setName('');
      setTitle('');
      setCompany('');
      setLocation('');
      setStars(5);
      setWords('');
      setShowModal(true);
    } catch (err) {
      toast.error(err.message || 'Failed to submit. Please try again.', { id: loadingToast });
    }
  }

  const inputClass =
    'w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition';

  return (
    <>
      <Toaster position="top-center" />
      {showModal && <SuccessModal />}

      {/* Header */}
      <div className="flex items-start gap-3 mb-1">
        <div className="w-1 rounded-full bg-black self-stretch min-h-[2.5rem]" />
        <div>
          <h2 className="text-xl font-bold text-black">Leave a review</h2>
          <p className="text-sm text-gray-500 mt-0.5">Share your experience with COSMiC.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <div className="relative flex items-center">
            <span className="absolute left-3"><PersonIcon /></span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className={inputClass}
              required
            />
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <div className="relative flex items-center">
            <span className="absolute left-3"><BriefcaseIcon /></span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Marketing Manager, CEO"
              className={inputClass}
              required
            />
          </div>
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <div className="relative flex items-center">
            <span className="absolute left-3"><BuildingIcon /></span>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. COSMiC, BrightWay"
              className={inputClass}
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <div className="relative flex items-center">
            <span className="absolute left-3 z-10"><PinIcon /></span>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 transition appearance-none"
              required
            >
              <option value="" disabled>e.g. United States, UAE</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <span className="absolute right-3"><ChevronIcon /></span>
          </div>
        </div>

        {/* Star rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            How would you rate our service?
          </label>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setStars(n)}
                className={`text-4xl sm:text-5xl focus:outline-none transition-transform active:scale-95 hover:scale-110 ${
                  n <= stars ? 'text-black' : 'text-gray-200'
                }`}
                aria-label={`${n} star${n > 1 ? 's' : ''}`}
              >
                ★
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{stars} out of 5</p>
        </div>

        {/* Review text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What do you say about us?
          </label>
          <textarea
            value={words}
            onChange={(e) => setWords(e.target.value)}
            rows={4}
            placeholder="Share your thoughts..."
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition resize-none"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-900 transition-all duration-200 active:scale-95"
        >
          <SendIcon />
          Share Your Feedback
        </button>
      </form>
    </>
  );
}
