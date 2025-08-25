import { PRIVACY_POLICY_TEXTS } from '@/lib/constants/policy';

export default function PrivacyPolicy() {
  return (
    <main className='min-h-screen bg-background'>
      <div className='container mx-auto px-6 py-16'>
        <h1 className='text-4xl font-bold text-foreground mb-8'>
          {PRIVACY_POLICY_TEXTS.TITLE}
        </h1>
        
        <p className='text-muted-foreground mb-12'>
          {PRIVACY_POLICY_TEXTS.LAST_UPDATED}
        </p>

        <div className='space-y-12'>
          {Object.values(PRIVACY_POLICY_TEXTS.SECTIONS).map((section, index) => (
            <section key={index} className='space-y-4'>
              <h2 className='text-2xl font-semibold text-foreground'>
                {section.TITLE}
              </h2>
              <div className='text-muted-foreground leading-relaxed whitespace-pre-line'>
                {section.CONTENT}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}