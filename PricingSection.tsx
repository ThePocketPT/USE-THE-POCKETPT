import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, Star, AlertCircle, Mail, MessageCircle, Instagram, Calendar } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { siteContent } from '@/content/siteContent';

gsap.registerPlugin(ScrollTrigger);

const PricingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    goals: '',
  });
  const { pricing, faq, contact, brand, footer } = siteContent;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = pricingRef.current?.querySelectorAll('.pricing-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: pricingRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      const faqItems = faqRef.current?.querySelectorAll('.faq-item');
      if (faqItems) {
        gsap.fromTo(
          faqItems,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: faqRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      gsap.fromTo(
        contactRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePlanSelect = (planName: string) => {
    setDialogMessage(`You've selected the ${planName}. We'll contact you at ${formData.email || 'your email'} shortly to get started!`);
    setShowDialog(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Free Consultation Request - ThePocketPT');
    const body = encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nGoals: ${formData.goals}`
    );
    window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
    setDialogMessage("Thanks for your interest! We'll be in touch within 24 hours to schedule your free call.");
    setShowDialog(true);
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative bg-[#353539] py-20 lg:py-32"
      style={{ zIndex: 100 }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div ref={pricingRef} className="text-center mb-12 lg:mb-16">
          <span className="font-mono text-xs tracking-widest text-[#FFD895] uppercase mb-4 block">
            INVESTMENT
          </span>
          <h2 className="font-display font-black text-[#eaeaea] text-3xl lg:text-5xl mb-4">
            {pricing.title}
          </h2>
          <p className="text-[#b9b9b9] text-base lg:text-lg max-w-xl mx-auto mb-6">
            {pricing.subtitle}
          </p>
          <div className="flex items-center justify-center gap-2 text-[#FFD895] text-sm">
            <Star size={16} className="fill-[#FFD895]" />
            <span>{pricing.guarantee}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {pricing.plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card rounded-xl p-5 lg:p-8 relative ${
                plan.highlighted
                  ? 'bg-[#FFD895] text-[#1F1F23] md:scale-105 shadow-xl'
                  : 'bg-[#3a3a3e] text-[#eaeaea] border border-[#4a4a4e]'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1F1F23] text-[#FFD895] px-4 py-1 rounded-full text-xs font-semibold">
                  {plan.badge}
                </div>
              )}
              <h3 className="font-display font-bold text-lg lg:text-xl mb-1">{plan.name}</h3>
              <div className="font-display font-black text-3xl lg:text-4xl mb-2">{plan.price}</div>
              <p className={`text-xs lg:text-sm mb-4 lg:mb-6 ${plan.highlighted ? 'text-[#2B2B30]' : 'text-[#b9b9b9]'}`}>
                {plan.description}
              </p>
              <ul className="space-y-2 lg:space-y-3 mb-6 lg:mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 lg:gap-3">
                    <Check
                      size={16}
                      className={`mt-0.5 flex-shrink-0 ${
                        plan.highlighted ? 'text-[#1F1F23]' : 'text-[#FFD895]'
                      }`}
                    />
                    <span className="text-xs lg:text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePlanSelect(plan.name)}
                className={`w-full py-2.5 lg:py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-105 text-sm lg:text-base ${
                  plan.highlighted
                    ? 'bg-[#1F1F23] text-[#FFD895]'
                    : 'bg-[#FFD895] text-[#1F1F23]'
                }`}
              >
                {plan.cta}
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-[#b9b9b9] text-xs lg:text-sm mb-16 lg:mb-24">
          <AlertCircle size={16} className="text-[#FFD895]" />
          <span>{pricing.urgency}</span>
        </div>

        <div ref={faqRef} className="mb-16 lg:mb-24">
          <h2 className="font-display font-black text-[#eaeaea] text-2xl lg:text-4xl text-center mb-8 lg:mb-10">
            {faq.title}
          </h2>
          <Accordion type="single" collapsible className="max-w-2xl mx-auto">
            {faq.items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="faq-item border-b border-[#4a4a4e]"
              >
                <AccordionTrigger className="text-[#eaeaea] hover:text-[#FFD895] py-4 lg:py-5 text-left text-sm lg:text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#b9b9b9] pb-4 lg:pb-5 text-sm lg:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div ref={contactRef} id="contact" className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-24">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#FFD895] uppercase mb-4 block">
              GET IN TOUCH
            </span>
            <h2 className="font-display font-black text-[#eaeaea] text-2xl lg:text-4xl mb-4">
              {contact.title}
            </h2>
            <p className="text-[#b9b9b9] mb-6 lg:mb-8 text-sm lg:text-base">
              {contact.subtitle}
            </p>
            <div className="space-y-3 lg:space-y-4">
              <a
                href={`mailto:${brand.email}`}
                className="flex items-center gap-3 text-[#eaeaea] hover:text-[#FFD895] transition-colors text-sm lg:text-base"
              >
                <Mail size={18} />
                {brand.email}
              </a>
              <a
                href={brand.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#eaeaea] hover:text-[#FFD895] transition-colors text-sm lg:text-base"
              >
                <MessageCircle size={18} />
                WhatsApp: {brand.phone}
              </a>
              <a
                href={footer.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#eaeaea] hover:text-[#FFD895] transition-colors text-sm lg:text-base"
              >
                <Instagram size={18} />
                {brand.instagram}
              </a>
            </div>
            <a
              href={contact.calendly.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-[#FFD895] hover:underline text-sm lg:text-base"
            >
              <Calendar size={18} />
              {contact.calendly.buttonText}
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-4">
            <div className="grid sm:grid-cols-2 gap-3 lg:gap-4">
              <Input
                type="text"
                placeholder={contact.form.firstName}
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="bg-[#3a3a3e] border-[#4a4a4e] text-[#eaeaea] placeholder:text-[#6a6a6e] focus:border-[#FFD895] focus:ring-[#FFD895] h-10 lg:h-12 text-sm"
              />
              <Input
                type="text"
                placeholder={contact.form.lastName}
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="bg-[#3a3a3e] border-[#4a4a4e] text-[#eaeaea] placeholder:text-[#6a6a6e] focus:border-[#FFD895] focus:ring-[#FFD895] h-10 lg:h-12 text-sm"
              />
            </div>
            <Input
              type="email"
              placeholder={contact.form.email}
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-[#3a3a3e] border-[#4a4a4e] text-[#eaeaea] placeholder:text-[#6a6a6e] focus:border-[#FFD895] focus:ring-[#FFD895] h-10 lg:h-12 text-sm"
            />
            <Input
              type="tel"
              placeholder={contact.form.phone}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-[#3a3a3e] border-[#4a4a4e] text-[#eaeaea] placeholder:text-[#6a6a6e] focus:border-[#FFD895] focus:ring-[#FFD895] h-10 lg:h-12 text-sm"
            />
            <Textarea
              placeholder={contact.form.goals}
              rows={4}
              value={formData.goals}
              onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
              className="bg-[#3a3a3e] border-[#4a4a4e] text-[#eaeaea] placeholder:text-[#6a6a6e] focus:border-[#FFD895] focus:ring-[#FFD895] resize-none text-sm"
            />
            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 text-sm lg:text-base py-3 lg:py-4"
            >
              {contact.form.submit}
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        <footer className="pt-8 lg:pt-12 border-t border-[#4a4a4e]">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <p className="font-display font-bold text-[#eaeaea] text-lg mb-2">{brand.name}</p>
              <p className="text-[#b9b9b9] text-sm">{footer.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {footer.links.slice(0, 5).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#b9b9b9] hover:text-[#FFD895] text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex justify-center md:justify-end gap-4">
              <a
                href={footer.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#b9b9b9] hover:text-[#FFD895] transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href={footer.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#b9b9b9] hover:text-[#25D366] transition-colors"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href={footer.socials.email}
                className="text-[#b9b9b9] hover:text-[#FFD895] transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-[#6a6a6e] text-xs mb-4">
            {footer.links.slice(5).map((link) => (
              <a key={link.label} href={link.href} className="hover:text-[#FFD895] transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-center text-[#6a6a6e] text-xs">
            {footer.copyright}
          </p>
        </footer>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-[#3a3a3e] border-[#4a4a4e] text-[#eaeaea] max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display text-lg lg:text-xl">Application Received</DialogTitle>
            <DialogDescription className="text-[#b9b9b9] text-sm">
              {dialogMessage}
            </DialogDescription>
          </DialogHeader>
          <button
            onClick={() => setShowDialog(false)}
            className="btn-primary w-full mt-4 text-sm lg:text-base py-3"
          >
            Got it
          </button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PricingSection;
