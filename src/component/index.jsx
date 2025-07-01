/** @format */

const TailwindInit = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md text-center space-y-4">
        <h1 className="text-3xl font-bold text-blue-600">
          Tailwind Initialized
        </h1>
        <p className="text-gray-700 text-lg">
          You're now ready to build beautiful UIs with Tailwind CSS in React!
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default TailwindInit;
