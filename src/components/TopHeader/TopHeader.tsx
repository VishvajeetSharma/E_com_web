import {
  IoLocationOutline,
  IoChevronDown,
  IoCubeOutline,
} from "react-icons/io5";

const TopHeader = () => {
  const offers = [
    " Free Shipping on Orders Above ₹2,999",
    " Get 20% Off on First Order | Code: FIRST20",
    " Easy Returns Within 30 Days",
    " Pay Later with Simple & Afterpay",
    " Join Loyalty Program & Earn Points",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .marquee-wrapper {
          overflow: hidden;
          white-space: nowrap;
          position: relative;
        }
        
        .marquee-content {
          display: inline-block;
          animation: marquee 25s linear infinite;
        }
        
        .marquee-content:hover {
          animation-play-state: paused;
        }
        
        @keyframes pulse-light {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        .pulse-icon {
          animation: pulse-light 2s ease-in-out infinite;
        }
      `}</style>

      <div className="relative overflow-hidden bg-linear-to-r from-[#da067a] via-[#c2178b] to-[#a847c5] py-0">
        {/* Location Badge - Floating Left */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
          <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-lg">
            <IoLocationOutline size={13} className="text-white" />
            <span className="font-['Inter'] text-white text-[0.7rem] font-semibold tracking-tight">
              Mumbai, MH
            </span>
            <IoChevronDown size={10} className="text-white/70" />
          </div>
        </div>

        {/* Marquee Scrolling Text */}
        <div className="marquee-wrapper w-full">
          <div className="marquee-content">
            {[...offers, ...offers].map((offer, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 mx-8 font-['Inter'] text-white text-[0.75rem] lg:text-[0.85rem] font-medium tracking-wide"
              >
                <IoCubeOutline size={13} className="text-pink-200 pulse-icon" />
                <span className="bg-linear-to-r from-white to-pink-100 bg-clip-text text-transparent">
                  {offer}
                </span>
                <span className="text-white/20 text-lg">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Gradient Overlays for smooth fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-[#da067a] to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-[#a847c5] to-transparent pointer-events-none"></div>
      </div>
    </>
  );
};

export default TopHeader;