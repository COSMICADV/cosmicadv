function BrandIdentity() {
  return (
    <div className="flex flex-col min-h-screen gap-12 px-8 md:px-24 lg:px-36 py-16 text-black bg-white">
      {/* Heading */}
      <div className="text-start">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight my-8">
          Brand Identity
        </h2>
      </div>

      {/* Sections */}
      <div className="space-y-12">
        {/* Section 1 */}
        <div className="space-y-6 max-w-2xl">
          <h3 className="text-2xl md:text-3xl font-semibold">
            Build Your Brand
          </h3>
          <p className="text-lg md:text-xl leading-relaxed text-black">
            We help define the core of your brand, ensuring your unique essence
            is felt and remembered by your audience.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-6 max-w-2xl">
          <h3 className="text-2xl md:text-3xl font-semibold">Stand Out</h3>
          <p className="text-lg md:text-xl leading-relaxed text-black">
            From logos to messaging, we create a cohesive identity that leaves
            an unmistakable imprint in the market.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BrandIdentity;
