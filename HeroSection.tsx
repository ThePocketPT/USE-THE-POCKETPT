import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import TrustBar from '@/components/TrustBar';
import { siteContent } from '@/content/siteContent';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const yellowWipeRef = useRef<HTMLDivElement>(null);
  const { hero } = siteContent;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        photoRef.current,
        { opacity: 0, x: '-6vw' },
        { opacity: 1, x: 0, duration: 0.9 },
        0
      );

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.4 },
        0.3
      );

      const words = headlineRef.current?.querySelectorAll('.headline-word');
      if (words) {
        tl.fromTo(
          words,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.04 },
          0.2
        );
      }

      tl.fromTo(
        subheadRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.5
      );

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.6
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          pinSpacing: true,
          onLeaveBack: () => {
            gsap.set([photoRef.current, headlineRef.current, subheadRef.current, ctaRef.current, badgeRef.current], {
              opacity: 1, x: 0, y: 0
            });
            gsap.set(yellowWipeRef.current, { x: '100vw' });
          }
        },
      });

      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        subheadRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        badgeRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        photoRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        yellowWipeRef.current,
        { x: '100vw' },
        { x: 0, ease: 'power2.out' },
        0.78
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="section-1"
        className="section-pinned bg-[#353539] z-10"
      >
        {/* Left Photo Panel */}
        <div
          ref={photoRef}
          className="absolute left-0 top-0 w-full lg:w-[52vw] h-[50vh] lg:h-full warm-tint"
        >
          <img
            src="/hero_gym_woman.jpg"
            alt="Online fitness coaching with ThePocketPT"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#353539] via-transparent to-transparent lg:to-[#353539]/30" />
        </div>

        {/* Right Content Panel */}
        <div className="absolute left-0 lg:left-[52vw] top-[50vh] lg:top-0 w-full lg:w-[48vw] h-[50vh] lg:h-full bg-[#353539] flex flex-col justify-center px-6 lg:px-12 pt-8 lg:pt-0">
          <div
            ref={badgeRef}
            className="mb-4 lg:mb-6"
          >
            <span className="font-mono text-xs tracking-widest text-[#FFD895] uppercase">
              {hero.badge}
            </span>
            <div className="w-12 h-0.5 bg-[#FFD895] mt-2" />
          </div>

          <div ref={headlineRef} className="mb-4 lg:mb-8">
            <h1 className="font-display font-black text-[#eaeaea] uppercase leading-[0.92] tracking-tight">
              {hero.headline.map((line, index) => (
                <span
                  key={index}
                  className={`headline-word block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl ${
                    index === hero.headline.length - 1 ? 'accent-yellow' : ''
                  }`}
                >
                  {line}
                </span>
              ))}
            </h1>
          </div>

          <p
            ref={subheadRef}
            className="text-[#b9b9b9] text-sm lg:text-base max-w-md mb-6 lg:mb-10 leading-relaxed"
          >
            {hero.subheadline}
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-primary flex items-center justify-center gap-2 text-sm lg:text-base py-3 lg:py-4"
            >
              {hero.primaryCta}
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-[#b9b9b9] hover:text-[#FFD895] transition-colors font-medium flex items-center justify-center sm:justify-start gap-2 text-sm lg:text-base"
            >
              {hero.secondaryCta}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div
          ref={yellowWipeRef}
          className="absolute inset-0 bg-[#FFD895] z-20 pointer-events-none"
          style={{ transform: 'translateX(100vw)' }}
        />
      </section>

      <TrustBar />
    </>
  );
};

export default HeroSection;
