import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Check } from 'lucide-react';
import { siteContent } from '@/content/siteContent';

gsap.registerPlugin(ScrollTrigger);

const SupportSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { support, brand } = siteContent;

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
        },
      });

      scrollTl.fromTo(
        imageRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        contentRef.current,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        contentRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="support"
      className="section-pinned bg-[#353539]"
      style={{ zIndex: 80 }}
    >
      <div
        ref={imageRef}
        className="absolute top-0 w-full lg:w-[52vw] h-[45vh] lg:h-full warm-tint right-0"
      >
        <img
          src={support.image}
          alt="Ben - Head Coach at ThePocketPT"
          className="w-full h-full object-cover grayscale"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#353539] via-transparent to-transparent lg:to-transparent" />
      </div>

      <div
        ref={contentRef}
        className="absolute top-[45vh] lg:top-0 h-[55vh] lg:h-full bg-[#353539] flex flex-col justify-center px-6 lg:px-12 left-0 w-full lg:w-[48vw]"
      >
        <h2 className="font-display font-black text-[#eaeaea] uppercase leading-[0.95] tracking-tight text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-2 lg:mb-4">
          {support.headline}
        </h2>
        <h2 className="font-display font-black accent-yellow uppercase leading-[0.95] tracking-tight text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 lg:mb-8">
          {support.headlineHighlight}
        </h2>

        <p className="text-[#b9b9b9] text-sm lg:text-base max-w-md mb-4 lg:mb-6 leading-relaxed">
          {support.body}
        </p>

        <div className="space-y-2 lg:space-y-3 mb-6 lg:mb-8">
          {support.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 lg:gap-3">
              <Check size={16} className="text-[#FFD895] flex-shrink-0" />
              <span className="text-[#eaeaea] text-sm lg:text-base">{feature}</span>
            </div>
          ))}
        </div>

        <a
          href={brand.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-fit flex items-center gap-2 text-sm lg:text-base py-3 lg:py-4"
        >
          <MessageCircle size={16} />
          {support.cta}
        </a>
      </div>
    </section>
  );
};

export default SupportSection;
