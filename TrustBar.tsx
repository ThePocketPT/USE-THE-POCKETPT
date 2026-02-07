import { siteContent } from '@/content/siteContent';

const TrustBar = () => {
  const { trustBar } = siteContent;

  return (
    <div className="w-full bg-[#2a2a2e] border-y border-[#4a4a4e]">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-8">
          {trustBar.items.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="font-display font-black text-2xl md:text-3xl text-[#FFD895]">
                {item.value}
              </span>
              <span className="text-[#b9b9b9] text-sm md:text-base">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
