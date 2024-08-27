'use client';
function AboutUs() {
  return (
    <div className="min-h-screen bg-white p-8" id="aboutus">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center text-gray-800">
          About Us
        </h1>

        {/* Our Story Card */}
        <div className="mb-12 p-8 bg-white rounded-lg">
          <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Since our founding in 1998, COSMiC Agency has been a regional leader
            in creative solutions, serving businesses across the Middle East.
            Our deep understanding of the local market, combined with over two
            decades of experience, enables us to offer services that are both
            innovative and tailored to the unique needs of our clients.
          </p>
        </div>

        {/* Our Expertise Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="p-8 bg-white shadow-md rounded-lg text-center">
            <FaPaintBrush className="text-4xl text-gray-700 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2">Creative Design</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe in the power of creativity to transform brands. Our
              team of experienced designers works closely with clients to craft
              visually stunning and strategically sound designs that resonate
              with their target audiences.
            </p>
          </div>

          <div className="p-8 bg-white shadow-md rounded-lg text-center">
            <FaBullhorn className="text-4xl text-gray-700 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2">Digital Marketing</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              In the digital age, staying connected with your audience is key.
              Our digital marketing strategies are designed to amplify your
              brand&apos;s presence online, driving engagement and delivering
              measurable results.
            </p>
          </div>

          <div className="p-8 bg-white shadow-md rounded-lg text-center">
            <FaCalendarAlt className="text-4xl text-gray-700 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2">Event Management</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              From concept to execution, we manage every aspect of your event to
              ensure a seamless experience. Whether it&apos;s a corporate event,
              product launch, or a brand activation, we bring your vision to
              life with precision and flair.
            </p>
          </div>

          <div className="p-8 bg-white shadow-md rounded-lg text-center">
            <FaPrint className="text-4xl text-gray-700 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2">
              Digital Print Division
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Quality is at the heart of everything we do. Our in-house digital
              print division ensures that all your printed materials meet the
              highest standards, from business cards to large-scale banners.
            </p>
          </div>
        </div> */}

        {/* Why Choose Us Card */}
        <div className="p-8 bg-white rounded-lg">
          <h2 className="text-3xl font-semibold mb-4">Why Choose Us?</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            With over 25 years of experience, COSMiC has built a reputation for
            excellence and innovation. Our multidisciplinary team is dedicated
            to helping your business succeed by providing tailored solutions
            that meet your unique needs.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            At COSMiC, we don&apos;t just create; we elevate. Let us help you
            take your brand to the next level.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
