import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { siteContent } from '@/content/siteContent';

gsap.registerPlugin(ScrollTrigger);

const YellowImpactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { yellowImpact } = siteContent;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
          pinSpacing: true,
        },
      });

      scrollTl.fromTo(
        bgRef.current,
        { x: '100vw' },
        { x: 0, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        contentRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        contentRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        bgRef.current,
        { y: 0, opacity: 1 },
        { y: '-20vh', opacity: 0, ease: 'power2.in' },
        0.75
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
      id="section-9"
      className="section-pinned"
      style={{ zIndex: 90 }}
    >
      <div
        ref={bgRef}
        className="absolute inset-0 bg-[#FFD895]"
        style={{ transform: 'translateX(100vw)' }}
      />

      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-full lg:w-[52vw] h-[45vh] lg:h-full warm-tint"
      >
        <img
          src={yellowImpact.image}
          alt="Get fit from home with ThePocketPT"
          className="w-full h-full object-cover grayscale"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#FFD895] via-transparent to-transparent lg:to-transparent" />
      </div>

      <div
        ref={contentRef}
        className="absolute top-[45vh] lg:top-0 left-0 lg:left-[52vw] w-full lg:w-[48vw] h-[55vh] lg:h-full flex flex-col justify-center px-6 lg:px-12"
      >
        <h2 className="font-display font-black text-[#1F1F23] uppercase leading-[0.95] tracking-tight text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-2 lg:mb-4">
          {yellowImpact.headline}
        </h2>
        <h2 className="font-display font-black text-[#1F1F23] uppercase leading-[0.95] tracking-tight text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 lg:mb-8">
          {yellowImpact.headlineHighlight}
        </h2>

        <p className="text-[#2B2B30] text-sm lg:text-base max-w-md mb-6 lg:mb-10 leading-relaxed">
          {yellowImpact.body}
        </p>

        <button
          onClick={scrollToContact}
          className="w-fit px-6 lg:px-8 py-3 lg:py-4 bg-[#1F1F23] text-[#FFD895] font-semibold rounded-lg hover:scale-105 transition-transform flex items-center gap-2 text-sm lg:text-base"
        >
          {yellowImpact.cta}
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default YellowImpactSection;
