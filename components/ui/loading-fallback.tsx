export function LoadingFallback() {
  return (
    <div className='w-full h-full relative'>
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='absolute w-24 h-24 bg-pink-500/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ripple opacity-0'></div>
        <div className='absolute w-24 h-24 bg-pink-500/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ripple opacity-0 [animation-delay:2s]'></div>
        <div className='absolute w-24 h-24 bg-pink-500/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ripple opacity-0 [animation-delay:4s]'></div>
      </div>
    </div>
  );
}
