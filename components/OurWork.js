import CustomerLogos from './CustomerLogos';

function OurWork() {
  return (
    <section className="flex flex-col h-screen justify-center items-center bg-gray-100">
      <div className="mx-2 p-5 flex flex-col justify-center items-center w-full">
        <h1 className="font-extrabold text-[75px] text-black text-center">
          Our areas of expertise
        </h1>
        {/* <p className="text-white font-bold font-mono text-center text-2xl mt-5 max-w-6xl">
          We boost the marketing and brand performance of B2B companies and
          semi-public organisations with strategic branding, digital design and
          campaigns. Make your company stick out from the crowd, communicate
          with greater impact, and take the next step towards growth!
        </p> */}
        <CustomerLogos />
      </div>
    </section>
  );
}

export default OurWork;
