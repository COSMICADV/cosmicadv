import Image from 'next/image';

function AboutPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold  mb-12">About Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="mb-4">
              Our mission is to provide exceptional services that help our
              clients achieve their business goals. We strive for excellence in
              every project we undertake, ensuring the highest level of
              satisfaction for our clients.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <p>
              We are committed to integrity, innovation, and quality. Our team
              is dedicated to upholding these values in everything we do,
              ensuring we deliver top-notch solutions to our clients.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src="/office.webp"
              width={500}
              height={500}
              alt="About Us Image"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-md bg-white">
              <Image
                src="/path-to-team-member1.jpg"
                width={150}
                height={150}
                alt="Team Member 1"
                className="rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600">CEO</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-md bg-white">
              <Image
                src="/path-to-team-member2.jpg"
                width={150}
                height={150}
                alt="Team Member 2"
                className="rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p className="text-gray-600">CTO</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-md bg-white">
              <Image
                src="/path-to-team-member3.jpg"
                width={150}
                height={150}
                alt="Team Member 3"
                className="rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">Alice Johnson</h3>
              <p className="text-gray-600">COO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
