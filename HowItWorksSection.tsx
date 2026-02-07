import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { siteContent } from '@/content/siteContent';

gsap.registerPlugin(ScrollTrigger);

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const { howItWorks } = siteContent;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const steps = stepsRef.current?.querySelectorAll('.step-card');
      if (steps) {
        gsap.fromTo(
          steps,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative bg-[#353539] py-20 lg:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-widest text-[#FFD895] uppercase mb-4 block">
            THE PROCESS
          </span>
          <h2 className="font-display font-black text-[#eaeaea] text-4xl lg:text-5xl mb-4">
            {howItWorks.title}
          </h2>
          <p className="text-[#b9b9b9] text-lg max-w-xl mx-auto">
            {howItWorks.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="grid md:grid-cols-3 gap-8 mb-12">
          {howItWorks.steps.map((step, index) => (
            <div
              key={index}
              className="step-card bg-[#3a3a3e] border border-[#4a4a4e] rounded-xl p-8 relative"
            >
              <span className="font-display font-black text-6xl text-[#FFD895]/20 absolute top-4 right-4">
                {step.number}
              </span>
              <div className="relative z-10">
                <h3 className="font-display font-bold text-[#eaeaea] text-xl mb-4">
                  {step.title}
                </h3>
                <p className="text-[#b9b9b9] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={scrollToContact}
            className="btn-primary inline-flex items-center gap-2"
          >
            {howItWorks.cta}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
