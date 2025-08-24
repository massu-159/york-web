import { Skeleton } from '@/components/ui/skeleton';

export default function NoPortfolio() {
  return (
    <div className='relative overflow-hidden rounded-lg shadow-lg'>
      <div className='relative w-full h-[250px] overflow-hidden'></div>
      <Skeleton className='absolute inset-0 w-full h-full' />
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='text-center'>
          <h3 className='text-xl font-semibold mb-2'>In progress ...</h3>
          <p className='text-sm'>随時追加予定</p>
        </div>
      </div>
    </div>
  );
}
