import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ArrowRight } from 'lucide-react';
import { siteContent } from '@/content/siteContent';

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { testimonials } = siteContent;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
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
      id="results"
      className="relative bg-[#2a2a2e] py-20 lg:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-widest text-[#FFD895] uppercase mb-4 block">
            SUCCESS STORIES
          </span>
          <h2 className="font-display font-black text-[#eaeaea] text-4xl lg:text-5xl mb-4">
            {testimonials.title}
          </h2>
          <p className="text-[#b9b9b9] text-lg max-w-xl mx-auto">
            {testimonials.subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {testimonials.items.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card bg-[#353539] border border-[#4a4a4e] rounded-xl overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 warm-tint">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name}'s transformation`}
                  className="w-full h-full object-cover grayscale"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 bg-[#FFD895] text-[#1F1F23] px-3 py-1 rounded-full text-sm font-semibold">
                  {testimonial.result}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#FFD895] text-[#FFD895]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[#eaeaea] leading-relaxed mb-6 text-sm">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#4a4a4e] rounded-full flex items-center justify-center">
                    <span className="font-display font-bold text-[#eaeaea]">
                      {testimonial.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#eaeaea] text-sm">{testimonial.name}</p>
                    <p className="text-[#b9b9b9] text-xs">{testimonial.location}, {testimonial.age}</p>
                  </div>
                </div>
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
            Start Your Own Transformation
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
