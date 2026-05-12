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

    // Step 1: Initial Reveal
    tl.to(".preloader-logo", {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "expo.out"
    });

    // Step 2: Continuous Ring Rotation
    tl.to(".preloader-ring", {
      rotate: 360,
      duration: 2,
      repeat: -1,
      ease: "none"
    }, 0);

    // Step 3: Text Stagger Reveal
    tl.to(".preloader-text", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      onStart: () => setLoadingText("SYSTEMS READY...")
    }, "-=0.5");

    // Step 4: Split Exit Animation
    tl.to(".preloader-panel-top", {
      y: "-100%",
      duration: 1.2,
      ease: "expo.inOut"
    }, "+=0.3");
    tl.to(".preloader-panel-bottom", {
      y: "100%",
      duration: 1.2,
      ease: "expo.inOut"
    }, "<");
    
    // Fade out elements just before panels move
    tl.to(".preloader-content", {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      ease: "power2.in"
    }, "-=1");

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div className="preloader-container fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
      {/* Split Panels */}
      <div className="preloader-panel-top absolute inset-x-0 top-0 h-1/2 bg-zinc-950 border-b border-white/5"></div>
      <div className="preloader-panel-bottom absolute inset-x-0 bottom-0 h-1/2 bg-zinc-950 border-t border-white/5"></div>

      <div className="preloader-content relative z-10 flex flex-col items-center">
        {/* Logo with Rotating Ring */}
        <div className="preloader-logo relative w-40 h-40 mb-10 opacity-0 scale-90">
          {/* Animated Ring */}
          <div className="preloader-ring absolute -inset-4 border border-dashed border-primary/40 rounded-full"></div>
          <div className="preloader-ring absolute -inset-2 border-2 border-primary/20 rounded-full border-t-primary"></div>
          
          <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full animate-pulse"></div>
          
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="relative z-10 w-full h-full object-contain" 
          />
        </div>

        {/* Loading Text */}
        <div className="preloader-text opacity-0 translate-y-4 flex flex-col items-center">
          <div className="flex items-center space-x-3 mb-3">
            <span className="h-px w-8 bg-primary/40"></span>
            <span className="text-[12px] tracking-[0.5em] font-black text-white uppercase">
              Sadik Aslam
            </span>
            <span className="h-px w-8 bg-primary/40"></span>
          </div>
          
          <p className="text-xs font-medium text-white/60 tracking-[0.2em] uppercase h-4">
            {loadingText}
          </p>
          
          {/* Digital Progress Bar */}
          <div className="w-64 h-[2px] bg-white/5 mt-8 relative overflow-hidden rounded-full">
            <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-scan"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scan {
          animation: scan 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
