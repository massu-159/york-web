import { Skeleton } from '@/components/ui/skeleton';
import { PORTFOLIO_TEXTS } from '@/lib/constants/texts';

export default function NoPortfolio() {
  return (
    <div className='relative overflow-hidden rounded-lg shadow-lg'>
      <div className='relative w-full h-[250px] overflow-hidden'></div>
      <Skeleton className='absolute inset-0 w-full h-full' />
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='text-center'>
          <h3 className='text-xl font-semibold mb-2'>{PORTFOLIO_TEXTS.NO_PORTFOLIO.TITLE}</h3>
          <p className='text-sm'>{PORTFOLIO_TEXTS.NO_PORTFOLIO.SUBTITLE}</p>
        </div>
      </div>
    </div>
  );
}
