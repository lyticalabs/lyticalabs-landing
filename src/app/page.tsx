import { HeroBackground } from '@/components/marketing/HeroBackground';
import { HeroSection } from '@/components/marketing/HeroSection';
import { StatsSection } from '@/components/marketing/StatsSection';
import { FeaturesSection } from '@/components/marketing/FeaturesSection';
import { HowItWorksSection } from '@/components/marketing/HowItWorksSection';
import { ProductShowcaseSection } from '@/components/marketing/ProductShowcaseSection';
import { IntegrationsSection } from '@/components/marketing/IntegrationsSection';
import { UseCasesSection } from '@/components/marketing/UseCasesSection';
import { CTASection } from '@/components/marketing/CTASection';
import { MarketingChromeProvider } from '@/components/marketing/MarketingChromeProvider';
import { MarketingShell } from '@/components/marketing/MarketingShell';

export default function Home() {
  return (
    <MarketingChromeProvider>
      <MarketingShell>
        <main className="relative min-h-screen w-full overflow-x-clip bg-black text-white">
          <HeroBackground />
          <div className="relative z-10">
            <HeroSection />
            <StatsSection />
            <FeaturesSection />
            <HowItWorksSection />
            <ProductShowcaseSection />
            <IntegrationsSection />
            <UseCasesSection />
            <CTASection />
          </div>
        </main>
      </MarketingShell>
    </MarketingChromeProvider>
  );
}