import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatementSectionProps {
  id: string;
  headline: string;
  headlineHighlight: string;
  body: string;
  cta: string;
  image: string;
  imagePosition: 'left' | 'right';
  zIndex: number;
}

const StatementSection = ({
  id,
  headline,
  headlineHighlight,
  body,
  cta,
  image,
  imagePosition,
  zIndex,
}: StatementSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isImageLeft = imagePosition === 'left';
      const imageEnterX = isImageLeft ? '-60vw' : '60vw';
      const headlineEnterX = isImageLeft ? '40vw' : '-40vw';
      const imageExitX = isImageLeft ? '-18vw' : '18vw';
      const headlineExitX = isImageLeft ? '18vw' : '-18vw';

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
        { x: imageEnterX, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: headlineEnterX, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: headlineExitX, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: imageExitX, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power2.in' },
        0.74
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [imagePosition]);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isImageLeft = imagePosition === 'left';

  return (
    <section
      ref={sectionRef}
      id={id}
      className="section-pinned bg-[#353539]"
      style={{ zIndex }}
    >
      <div
        ref={imageRef}
        className={`absolute top-0 w-full lg:w-[52vw] h-[45vh] lg:h-full warm-tint ${
          isImageLeft ? 'left-0' : 'right-0'
        }`}
      >
        <img
          src={image}
          alt={headline}
          className="w-full h-full object-cover grayscale"
          loading="lazy"
        />
        <div
          className={`absolute inset-0 ${
            isImageLeft
              ? 'bg-gradient-to-t lg:bg-gradient-to-l from-[#353539] via-transparent to-transparent lg:to-transparent'
              : 'bg-gradient-to-t lg:bg-gradient-to-r from-[#353539] via-transparent to-transparent lg:to-transparent'
          }`}
        />
      </div>

      <div
        className={`absolute top-[45vh] lg:top-0 h-[55vh] lg:h-full bg-[#353539] flex flex-col justify-center px-6 lg:px-12 ${
          isImageLeft
            ? 'left-0 lg:left-[52vw] w-full lg:w-[48vw]'
            : 'left-0 w-full lg:w-[48vw]'
        }`}
      >
        <h2
          ref={headlineRef}
          className="font-display font-black text-[#eaeaea] uppercase leading-[0.95] tracking-tight text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-2 lg:mb-4"
        >
          {headline}
        </h2>
        <h2 className="font-display font-black accent-yellow uppercase leading-[0.95] tracking-tight text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 lg:mb-8">
          {headlineHighlight}
        </h2>

        <p
          ref={bodyRef}
          className="text-[#b9b9b9] text-sm lg:text-base max-w-md mb-6 lg:mb-10 leading-relaxed"
        >
          {body}
        </p>

        <button
          ref={ctaRef}
          onClick={scrollToContact}
          className="btn-primary w-fit flex items-center gap-2 text-sm lg:text-base py-3 lg:py-4"
        >
          {cta}
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default StatementSection;
