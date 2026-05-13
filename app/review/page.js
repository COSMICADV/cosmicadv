import Link from 'next/link';
import ReviewForm from '@/components/ReviewForm';

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-8 flex flex-col items-center justify-center" id="review-form">
      <div className="w-full max-w-lg pt-24">
        <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center text-gray-800">
          WE VALUE YOUR FEEDBACK
        </h1>
        <p className="text-gray-600 text-center mb-8">
          We'd love to hear about your experience with COSMiC. Sharing your genuine feedback helps us improve and helps others make informed choices. All reviews are reviewed before posting.
        </p>
        <ReviewForm />
        <p className="mt-8 text-center">
          <Link
            href="/#reviews"
            className="text-gray-600 hover:text-gray-800 underline"
          >
            ← Back to reviews
          </Link>
        </p>
      </div>
    </div>
  );
}
