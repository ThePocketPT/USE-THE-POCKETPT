import { Phone, MessageCircle } from 'lucide-react';
import { siteContent } from '@/content/siteContent';

const StickyMobileCta = () => {
  const { stickyCta, brand } = siteContent;

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-[#1F1F23] border-t border-[#4a4a4e] md:hidden">
      <div className="flex">
        <button
          onClick={scrollToContact}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#FFD895] text-[#1F1F23] font-semibold"
        >
          <Phone size={18} />
          {stickyCta.bookCall}
        </button>
        <a
          href={brand.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#25D366] text-white font-semibold"
        >
          <MessageCircle size={18} />
          {stickyCta.whatsapp}
        </a>
      </div>
    </div>
  );
};

export default StickyMobileCta;
