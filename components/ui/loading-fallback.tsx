export function LoadingFallback() {
  return (
    <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='relative'>
        <div className='w-12 h-12 border-4 border-gray-300 border-t-pink-600 rounded-full animate-spin'></div>
        <div className='absolute inset-0 w-12 h-12 border-4 border-transparent border-t-purple-400 rounded-full animate-spin animation-delay-150'></div>
      </div>
    </div>
  );
}