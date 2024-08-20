import Image from 'next/image';

function Card({ image, title, description }) {
  return (
    <div className="w-full max-w-[250px] mx-auto shadow-md rounded-lg overflow-hidden bg-white">
      <div className="p-4 md:p-6">
        <div className="flex justify-center mb-4">
          <Image
            src={image}
            alt={title}
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
        <h2 className="text-xl font-bold mb-2 text-center md:text-left">
          {title}
        </h2>
        <p className="text-gray-700 text-center md:text-left mb-4">
          {description}
        </p>
        <div className="text-center md:text-left">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all w-full md:w-auto">
            Read more
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
