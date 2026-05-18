import ReviewForm from '@/components/ReviewForm';

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 md:px-12 py-20 overflow-hidden">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left column */}
        <div className="relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-black text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.09 6.26L20 9.27l-4.91 4.73 1.18 6.73L12 17.77l-4.27 3.96L8.91 14 4 9.27l5.91-.01z"/>
            </svg>
            WE VALUE YOUR FEEDBACK
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-black mb-6">
            Your opinion<br />
            helps us<br />
            <span className="text-gray-400">grow.</span>
          </h1>

          {/* Divider with asterisk */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px bg-gray-300 w-32"></div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 shrink-0">
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/>
            </svg>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-base leading-relaxed max-w-sm">
            At COSMiC, we&apos;re committed to delivering exceptional service. Your feedback helps us improve, innovate, and continue creating impactful solutions.
          </p>

          {/* Background wave decoration */}
          <div className="absolute -bottom-16 -left-12 opacity-10 pointer-events-none select-none" aria-hidden="true">
            <svg width="320" height="200" viewBox="0 0 320 200" fill="none">
              {[0,20,40,60,80,100].map((offset, i) => (
                <path
                  key={i}
                  d={`M0 ${100 + offset} Q80 ${60 + offset} 160 ${100 + offset} T320 ${100 + offset}`}
                  stroke="black"
                  strokeWidth="1.5"
                  fill="none"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Right column — form card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
          <ReviewForm />
          <p className="mt-5 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Your feedback is private and secure.
          </p>
        </div>

      </div>
    </div>
  );
}
