export default function SkeletonLoader() {
    return (
      <div className='w-[1000px]'>
        {[1, 2, 3].map((placeholder, index) => (
          <div key={index} className='bg-slate-50 pb-3 text-left text-sm'>
            <div className='w-[500px] mx-auto'>
              {/* User placeholder */}
            </div>
            <div className='flex items-center justify-center w-[500px] h-[500px] bg-gray-300 mx-auto'>
              {/* Image placeholder */}
            </div>
            <div className='w-[500px] mx-auto'>
              {/* Like and comment placeholders */}
            </div>
            <div className='border-b border-slate-300 w-[500px] mx-auto'></div>
          </div>
        ))}
      </div>
    );
  }