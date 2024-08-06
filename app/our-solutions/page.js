const solutions = [
  {
    title: 'Define brand belief',
    description:
      'Create a clear and consistent brand identity that resonates with your target audience.',
  },
  {
    title: 'Define brand belief',
    description:
      'Create a clear and consistent brand identity that resonates with your target audience.',
  },
  {
    title: 'Define brand belief',
    description:
      'Create a clear and consistent brand identity that resonates with your target audience.',
  },
  {
    title: 'Define brand belief',
    description:
      'Create a clear and consistent brand identity that resonates with your target audience.',
  },
  {
    title: 'Define brand belief',
    description:
      'Create a clear and consistent brand identity that resonates with your target audience.',
  },
];

function Solutions() {
  return (
    <div className="min-h-screen px-36">
      <h1 className="text-[75px] font-bold font-mono text-center my-12">
        Our Solutions
      </h1>
      <div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:grid-cols-4">
          {solutions.map((solution, index) => (
            <div key={index} className="flex flex-col items-center p-5">
              <h2 className="text-3xl font-bold text-gray-800">
                {solution.title}
              </h2>
              <p className="text-gray-700 text-lg">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Solutions;
