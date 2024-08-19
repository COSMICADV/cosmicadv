function DigitalMarketing() {
  return (
    <div className="flex flex-col min-h-screen gap-12 px-8 md:px-24 lg:px-36 py-16 text-black bg-white">
      {/* Heading */}
      <div className="text-start">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight my-8">
          Digital Marketing
        </h2>
      </div>

      {/* Sections */}
      <div className="space-y-12">
        {/* Section 1 */}
        <div className="space-y-6 max-w-2xl">
          <h3 className="text-2xl md:text-3xl font-semibold">
            Audience-Focused Strategy
          </h3>
          <p className="text-lg md:text-xl leading-relaxed text-black">
            We create strategies that resonate with your target audience,
            ensuring you reach the right people with the right message.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-6 max-w-2xl">
          <h3 className="text-2xl md:text-3xl font-semibold">
            Competitive Analysis
          </h3>
          <p className="text-lg md:text-xl leading-relaxed text-black">
            We scan competitors to help you stand out, making your digital
            marketing efforts more effective.
          </p>
        </div>

        {/* Section 3 */}
        <div className="space-y-6 max-w-2xl">
          <h3 className="text-2xl md:text-3xl font-semibold">Key Services</h3>
          <ul className="list-none space-y-2 text-lg md:text-xl text-black">
            <li>01. Digital strategy</li>
            <li>02. Social media marketing</li>
            <li>03. Content creation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DigitalMarketing;
