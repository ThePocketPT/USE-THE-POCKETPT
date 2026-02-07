import { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { siteContent } from '@/content/siteContent';

gsap.registerPlugin(ScrollTrigger);

const LeadMagnetSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { leadMagnet, brand } = siteContent;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In production, this would integrate with Mailchimp/ConvertKit
      // For now, we'll just show success
      setSubmitted(true);
      
      // Optional: Send to your email
      window.location.href = `mailto:${brand.email}?subject=Free Meal Plan Request&body=Please send the free 7-day meal plan to: ${email}`;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#353539] py-16 lg:py-20"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="bg-gradient-to-r from-[#FFD895]/10 to-[#FFD895]/5 border border-[#FFD895]/30 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Mail size={20} className="text-[#FFD895]" />
                <span className="font-mono text-xs tracking-widest text-[#FFD895] uppercase">
                  FREE DOWNLOAD
                </span>
              </div>
              <h3 className="font-display font-bold text-[#eaeaea] text-2xl lg:text-3xl mb-3">
                {leadMagnet.title}
              </h3>
              <p className="text-[#b9b9b9] leading-relaxed">
                {leadMagnet.description}
              </p>
            </div>

            {/* Form */}
            <div>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder={leadMagnet.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-[#2a2a2e] border-[#4a4a4e] text-[#eaeaea] placeholder:text-[#6a6a6e] focus:border-[#FFD895] focus:ring-[#FFD895] h-12"
                  />
                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    {leadMagnet.cta}
                    <ArrowRight size={18} />
                  </button>
                </form>
              ) : (
                <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-lg p-6 text-center">
                  <Check size={32} className="text-[#25D366] mx-auto mb-3" />
                  <p className="text-[#eaeaea] font-semibold mb-1">Success!</p>
                  <p className="text-[#b9b9b9] text-sm">{leadMagnet.successMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnetSection;
