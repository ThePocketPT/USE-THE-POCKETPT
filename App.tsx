import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import StickyMobileCta from './components/StickyMobileCta';
import HeroSection from './sections/HeroSection';
import HowItWorksSection from './sections/HowItWorksSection';
import TestimonialsSection from './sections/TestimonialsSection';
import AboutCoachSection from './sections/AboutCoachSection';
import StatementSection from './sections/StatementSection';
import SupportSection from './sections/SupportSection';
import YellowImpactSection from './sections/YellowImpactSection';
import LeadMagnetSection from './sections/LeadMagnetSection';
import PricingSection from './sections/PricingSection';
import { siteContent } from './content/siteContent';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { statements, seo } = siteContent;

  useEffect(() => {
    document.title = seo.title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seo.description);
    }

    const timer = setTimeout(() => {
      setupGlobalSnap();
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const setupGlobalSnap = () => {
    const pinned = ScrollTrigger.getAll()
      .filter(st => st.vars.pin)
      .sort((a, b) => a.start - b.start);
    
    const maxScroll = ScrollTrigger.maxScroll(window);
    if (!maxScroll || pinned.length === 0) return;

    const pinnedRanges = pinned.map(st => ({
      start: st.start / maxScroll,
      end: (st.end ?? st.start) / maxScroll,
      center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
    }));

    ScrollTrigger.create({
      snap: {
        snapTo: (value: number) => {
          const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
          if (!inPinned) return value;
          
          const target = pinnedRanges.reduce((closest, r) =>
            Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
          pinnedRanges[0]?.center ?? 0);
          
          return target;
        },
        duration: { min: 0.15, max: 0.35 },
        delay: 0,
        ease: "power2.out"
      }
    });
  };

  return (
    <div ref={mainRef} className="relative bg-[#353539]">
      <div className="grain-overlay" />
      
      <Navigation />
      
      <main>
        <HeroSection />
        
        <HowItWorksSection />
        
        <TestimonialsSection />
        
        <AboutCoachSection />
        
        {statements.map((statement, index) => (
          <StatementSection
            key={statement.id}
            id={statement.id}
            headline={statement.headline}
            headlineHighlight={statement.headlineHighlight}
            body={statement.body}
            cta={statement.cta}
            image={statement.image}
            imagePosition={statement.imagePosition}
            zIndex={20 + index * 10}
          />
        ))}
        
        <SupportSection />
        
        <YellowImpactSection />
        
        <LeadMagnetSection />
        
        <PricingSection />
      </main>
      
      <StickyMobileCta />
    </div>
  );
}

export default App;
