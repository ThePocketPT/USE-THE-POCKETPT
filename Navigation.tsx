import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { siteContent } from '@/content/siteContent';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { brand, navigation } = siteContent;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-[#353539]/95 backdrop-blur-md py-3 lg:py-4'
            : 'bg-transparent py-4 lg:py-6'
        }`}
      >
        <div className="w-full px-4 lg:px-12 flex items-center justify-between">
          <button
            onClick={() => scrollToSection('section-1')}
            className="font-display font-bold text-lg lg:text-xl tracking-tight text-[#eaeaea] hover:text-[#FFD895] transition-colors"
          >
            {brand.name}
          </button>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navigation.links.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href.replace('#', ''))}
                className="text-sm font-medium text-[#b9b9b9] hover:text-[#eaeaea] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 xl:px-6 py-2.5 bg-[#FFD895] text-[#1F1F23] font-semibold text-sm rounded-lg hover:scale-105 transition-transform"
            >
              {navigation.cta}
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#eaeaea]"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[99] bg-[#353539] transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {navigation.links.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href.replace('#', ''))}
              className="text-xl font-display font-semibold text-[#eaeaea] hover:text-[#FFD895] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="mt-4 px-8 py-4 bg-[#FFD895] text-[#1F1F23] font-semibold rounded-lg"
          >
            {navigation.cta}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
