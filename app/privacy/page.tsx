import { PRIVACY_POLICY_TEXTS } from '@/lib/constants/policy';

export default function PrivacyPolicy() {
  const renderSection = (section: any, index: number) => {
    return (
      <section key={index} className='space-y-4'>
        <h2 className='text-2xl font-semibold text-foreground'>
          {section.HEADING}
        </h2>
        <div className='text-muted-foreground leading-relaxed space-y-4'>
          <p>{section.TEXT}</p>
          
          {section.ITEMS && (
            <ul className='ml-6 space-y-2'>
              {section.ITEMS.map((item: string, itemIndex: number) => (
                <li key={itemIndex} className='list-disc'>{item}</li>
              ))}
            </ul>
          )}
          
          {section.SUB_ITEMS && (
            <ul className='ml-10 space-y-2'>
              {section.SUB_ITEMS.map((item: string, itemIndex: number) => (
                <li key={itemIndex} className='list-disc'>{item}</li>
              ))}
            </ul>
          )}
          
          {section.ADDITIONAL_TEXT && (
            <p>{section.ADDITIONAL_TEXT}</p>
          )}
          
          {section.EXCEPTION_ITEMS && (
            <ul className='ml-6 space-y-2'>
              {section.EXCEPTION_ITEMS.map((item: string, itemIndex: number) => (
                <li key={itemIndex} className='list-disc'>{item}</li>
              ))}
            </ul>
          )}
          
          {section.ADDITIONAL_TEXTS && (
            <div className='space-y-4'>
              {section.ADDITIONAL_TEXTS.map((text: string, textIndex: number) => (
                <p key={textIndex}>{text}</p>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  };

  return (
    <main className='min-h-screen bg-background'>
      <div className='container mx-auto px-6 py-16'>
        <h1 className='text-4xl font-bold text-foreground mb-8'>
          {PRIVACY_POLICY_TEXTS.TITLE}
        </h1>
        
        <p className='text-muted-foreground leading-relaxed mb-12'>
          {PRIVACY_POLICY_TEXTS.INTRODUCTION}
        </p>

        <div className='space-y-12'>
          {Object.values(PRIVACY_POLICY_TEXTS.SECTIONS).map(renderSection)}
        </div>
      </div>
    </main>
  );
}