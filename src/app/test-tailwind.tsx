export default function TestTailwind() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Tailwind CSS Test
      </h1>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg shadow-lg">
        <p className="text-lg">
          If you can see this styled box with gradient background, 
          Tailwind CSS is working correctly!
        </p>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-100 p-4 rounded border border-red-300">
          <h3 className="font-semibold text-red-800">Red Box</h3>
          <p className="text-red-600">This should be red themed</p>
        </div>
        <div className="bg-green-100 p-4 rounded border border-green-300">
          <h3 className="font-semibold text-green-800">Green Box</h3>
          <p className="text-green-600">This should be green themed</p>
        </div>
        <div className="bg-blue-100 p-4 rounded border border-blue-300">
          <h3 className="font-semibold text-blue-800">Blue Box</h3>
          <p className="text-blue-600">This should be blue themed</p>
        </div>
      </div>
    </div>
  );
} 