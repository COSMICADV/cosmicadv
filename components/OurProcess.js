function OurProcess() {
  return (
    <section id="process">
      <div className="w-full bg-black">
        <div className="min-h-screen w-[90%] md:w-[80%] flex flex-col items-center justify-center gap-5 mx-auto py-10 md:py-0">
          <h1
            className="text-4xl md:text-5xl font-bold self-start underline underline-offset-8 mb-8 text-white"
            style={{ textDecorationColor: '#ED1C24' }}
          >
            Our Process
          </h1>
          <div className="flex flex-col items-center justify-center">
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-7 p-5 md:p-10">
              <li className="p-5 md:p-10 text-xl md:text-2xl font-semibold">
                <p className="text-white">
                  1. We define your brand strategy and
                  <span className="text-[#ED1C24]">
                    {' '}
                    create your brand story
                  </span>
                  , brand values, and key principles.
                </p>
              </li>
              <li className="p-5 md:p-10 text-xl md:text-2xl font-semibold">
                <p className="text-white">
                  2. We create your brand communications and content, including
                  your
                  <span className="text-[#ED1C24]">
                    {' '}
                    website and brand guidelines
                  </span>
                  .
                </p>
              </li>
              <li className="p-5 md:p-10 text-xl md:text-2xl font-semibold">
                <p className="text-white">
                  3. We design your
                  <span className="text-[#ED1C24]"> brand identity</span> with a
                  clear tone-of-voice and unique visual design.
                </p>
              </li>
              <li className="p-5 md:p-10 text-xl md:text-2xl font-semibold">
                <p className="text-white">
                  4. With digital-first campaigns, we{' '}
                  <span className="text-[#ED1C24]"> build brand awareness</span>{' '}
                  and grow business results.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurProcess;
