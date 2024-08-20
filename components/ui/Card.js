import Image from 'next/image';

function Card({ image, title, description }) {
  return (
    <div className="w-full max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="object-cover w-full h-48"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800 text-center">
          {title}
        </h2>
        <p className="text-gray-600 mb-4 text-center">{description}</p>
        <div className="text-center">
          {/* <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300">
            Read More
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Card;
