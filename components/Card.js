// components/Card.js
import Image from 'next/image';

function Card({ image, title, description }) {
  return (
    <div className="max-w-[250px] mx-auto shadow-md rounded-lg overflow-hidden">
      <div className="p-6 bg-white">
        <div className="mb-4 items-center justify-center">
          <Image src={image} alt="TEST" width={200} height={200} />
        </div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all">
          Read more
        </button>
      </div>
    </div>
  );
}

export default Card;
