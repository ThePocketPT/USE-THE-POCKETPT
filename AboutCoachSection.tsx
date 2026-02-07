import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';
import { siteContent } from '@/content/siteContent';

gsap.registerPlugin(ScrollTrigger);

const AboutCoachSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { coach } = siteContent;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { x: '-60vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { x: '40vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
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
      id="about"
      className="relative bg-[#353539] py-20 lg:py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative warm-tint">
            <img
              src={coach.image}
              alt={coach.name}
              className="w-full h-[500px] lg:h-[600px] object-cover grayscale rounded-lg"
              loading="lazy"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-[#353539]/90 backdrop-blur-sm p-4 rounded-lg">
              <p className="font-display font-bold text-[#eaeaea] text-lg">{coach.name}</p>
              <p className="text-[#FFD895] text-sm">{coach.title}</p>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <span className="font-mono text-xs tracking-widest text-[#FFD895] uppercase mb-4 block">
              YOUR COACH
            </span>
            <h2 className="font-display font-black text-[#eaeaea] text-4xl lg:text-5xl mb-6">
              MEET {coach.name.toUpperCase()}
            </h2>
            
            <div className="space-y-4 mb-8">
              {coach.bio.map((paragraph, index) => (
                <p key={index} className="text-[#b9b9b9] leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="space-y-3 mb-8">
              {coach.credentials.map((credential, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check size={18} className="text-[#FFD895] flex-shrink-0" />
                  <span className="text-[#eaeaea]">{credential}</span>
                </div>
              ))}
            </div>

            <button
              onClick={scrollToContact}
              className="btn-primary flex items-center gap-2"
            >
              {coach.cta}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCoachSection;
