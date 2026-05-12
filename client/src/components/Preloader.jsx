import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
  const [loadingText, setLoadingText] = useState("INITIATING SYSTEMS...");

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Initial state
    tl.set(".preloader-logo", { scale: 0.8, opacity: 0 });
    tl.set(".preloader-text", { opacity: 0, y: 10 });

    // Step 1: Logo Reveal
    tl.to(".preloader-logo", {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power4.out"
    });

    // Step 2: Pulse effect
    tl.to(".preloader-logo", {
      scale: 1.05,
      filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))",
      duration: 0.6,
      repeat: 1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Step 3: Text reveal
    tl.to(".preloader-text", {
      opacity: 1,
      y: 0,
      duration: 0.4,
      onStart: () => setLoadingText("CRAFTING EXCELLENCE...")
    }, "-=0.3");

    // Step 4: Final Exit
    tl.to(".preloader-container", {
      y: "-100%",
      duration: 0.8,
      ease: "expo.inOut",
      delay: 0.3
    });

    // Cleanup
    return () => tl.kill();
  }, [onComplete]);

  return (
    <div className="preloader-container fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
      <div className="relative flex flex-col items-center">
        {/* Logo with Glow */}
        <div className="preloader-logo relative w-24 h-24 mb-6">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="relative z-10 w-full h-full object-contain brightness-110" 
          />
        </div>

        {/* Loading Text */}
        <div className="preloader-text flex flex-col items-center">
          <span className="text-[10px] tracking-[0.3em] font-black text-white/40 mb-2 uppercase">
            Sadik Aslam
          </span>
          <p className="text-sm font-bold text-white tracking-widest uppercase">
            {loadingText}
          </p>
          
          {/* Progress Bar */}
          <div className="w-48 h-[1px] bg-white/10 mt-6 relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-full bg-primary animate-progress-slide"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress-slide {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(-30%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress-slide {
          animation: progress-slide 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
