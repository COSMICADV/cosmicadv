function OurProcess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 w-[80%] mx-auto">
      <h1
        className="text-5xl font-bold self-start underline underline-offset-8 mb-6 ml-20"
        style={{ textDecorationColor: '#ED1C24' }}
      >
        Our Process
      </h1>
      <div className="flex flex-col items-center justify-center">
        <ol className="grid grid-cols-2 gap-7 p-10">
          <li className="p-10 text-2xl font-semibold">
            <p>
              1. We define your brand strategy and
              <span className="text-[#ED1C24]"> create your brand story</span>,
              brand values and key principles.
            </p>
          </li>
          <li className="p-10 text-2xl font-semibold">
            <p>
              2. We create your brand communications and content including your
              <span className="text-[#ED1C24]">
                {' '}
                website and brand guidelines
              </span>
              .
            </p>
          </li>
          <li className="p-10 text-2xl font-semibold">
            <p>
              3. We design your
              <span className="text-[#ED1C24]"> brand identity</span> with a
              clear tone-of-voice and unique visual design.
            </p>
          </li>
          <li className="p-10 text-2xl font-semibold">
            <p>
              4. With digital-first campaigns we{' '}
              <span className="text-[#ED1C24]"> build brand awareness</span> and
              grow business results.
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default OurProcess;
