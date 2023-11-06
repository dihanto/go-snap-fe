export default function SkeletonLoader() {
  return (
    <div className="w-4/6 mx-auto">
      {[1, 2, 3].map((index) => (
        <div key={index} className="bg-slate-50 pb-3 text-left text-sm animate-pulse">
          <div className="w-[500px] mx-auto">
            <div className="h-4 bg-gray-300 rounded-lg"></div>
          </div>
          <div className="flex items-center justify-center w-[500px] h-[500px] bg-gray-300 mx-auto">
          </div>
          <div className="w-[500px] mx-auto">
            <div className="h-4 bg-gray-300 rounded-lg"></div>
          </div>
          <div className="border-b border-slate-300 w-[500px] mx-auto">
            <div className="h-2 bg-gray-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
