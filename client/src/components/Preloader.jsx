import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
  const [loadingText, setLoadingText] = useState("INITIATING...");

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Initial state
    tl.set(".preloader-logo-half", { opacity: 0, scale: 0.8 });
    tl.set(".preloader-text", { opacity: 0, y: 10 });

    // Step 1: Initial Reveal
    tl.to(".preloader-logo-half", {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "expo.out"
    });

    // Step 2: Text Stagger Reveal
    tl.to(".preloader-text", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      onStart: () => setLoadingText("SYSTEMS READY...")
    }, "-=0.5");

    // Step 3: Split Exit Animation (The "Cut Through Logo" effect)
    tl.to(".preloader-panel-top", {
      y: "-100%",
      duration: 1.5,
      ease: "expo.inOut"
    }, "+=0.5");
    tl.to(".preloader-panel-bottom", {
      y: "100%",
      duration: 1.5,
      ease: "expo.inOut"
    }, "<");

    // Move text with the bottom panel
    tl.to(".preloader-text", {
      opacity: 0,
      y: 50,
      duration: 0.5
    }, "-=1.2");

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div className="preloader-container fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-none">
      
      {/* Top Panel with Top Half of Logo */}
      <div className="preloader-panel-top absolute inset-x-0 top-0 h-1/2 bg-white flex items-end justify-center overflow-hidden border-b border-zinc-100">
         <div className="preloader-logo-half relative w-48 h-48 translate-y-1/2">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-full h-full object-contain" 
              style={{ clipPath: 'inset(0 0 50% 0)' }}
            />
         </div>
      </div>

      {/* Bottom Panel with Bottom Half of Logo */}
      <div className="preloader-panel-bottom absolute inset-x-0 bottom-0 h-1/2 bg-white flex flex-col items-center justify-start overflow-hidden">
         <div className="preloader-logo-half relative w-48 h-48 -translate-y-1/2">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-full h-full object-contain" 
              style={{ clipPath: 'inset(50% 0 0 0)' }}
            />
         </div>

         {/* Text Section (Fixed to bottom panel for movement) */}
         <div className="preloader-text mt-4 flex flex-col items-center">
            <span className="text-[10px] tracking-[0.4em] font-black text-zinc-900 uppercase">
              Sadik Aslam
            </span>
            <p className="text-[8px] font-bold text-zinc-400 tracking-[0.2em] uppercase mt-1">
              {loadingText}
            </p>
         </div>
      </div>

    </div>
  );
};

export default Preloader;
