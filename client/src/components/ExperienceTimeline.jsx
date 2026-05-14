import { useLayoutEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MilestoneNode = ({ entry }) => {
  const { period, designation, organization, highlights, certificateLink } = entry;

  return (
    // Mobile par extra left space (pl-10) ko kam karke pl-6 kiya hai
    <div className="career-node-item relative pl-6 sm:pl-10 py-6 md:py-8 group">
      
      {/* Visual Timeline Anchor (Adjusted top position to match new padding) */}
      <div className="absolute top-8 md:top-10 left-[-9.5px] w-5 h-5 rounded-full bg-secondary ring-4 ring-background group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-sm"></div>
      
      <span className="text-xs font-bold tracking-[0.15em] text-secondary/60 uppercase font-mono block mb-1">
        {period}
      </span>

      {/* Designation: Standard size (text-xl/2xl) instead of extremely large text-3xl */}
      {certificateLink ? (
        <a href={certificateLink} target="_blank" rel="noopener noreferrer" className="block w-fit group/link">
          <h3 className="mt-1 text-xl md:text-2xl font-black text-primary tracking-tight leading-tight group-hover/link:text-primary/70 transition-colors flex items-center gap-2">
            {designation}
            <svg className="w-4 h-4 md:w-5 md:h-5 opacity-0 group-hover/link:opacity-100 transition-opacity text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </h3>
        </a>
      ) : (
        <h3 className="mt-1 text-xl md:text-2xl font-black text-primary tracking-tight leading-tight group-hover:text-primary/80 transition-colors">
          {designation}
        </h3>
      )}

      <p className="mt-1.5 text-base md:text-lg font-bold text-secondary italic opacity-80">{organization}</p>
      
      {highlights && highlights.length > 0 && (
        <ul className="mt-4 space-y-3">
          {highlights.map((bullet, i) => (
            <li key={i} className="text-secondary/80 text-sm md:text-base leading-relaxed flex items-start">
              <span className="mr-3 mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0"></span>
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ExperienceTimeline = ({ history = [] }) => {
  const rootContainer = useRef(null);

  const workHistory = useMemo(() => 
    history.filter(item => item.category === 'corporate'), 
  [history]);
  
  const studyHistory = useMemo(() => 
    history.filter(item => item.category === 'academic'), 
  [history]);

  useLayoutEffect(() => {
    const animationContext = gsap.context(() => {
      const nodes = gsap.utils.toArray('.career-node-item');
      
      nodes.forEach((node) => {
        gsap.from(node, {
          x: -30,
          opacity: 0,
          duration: 0.8, // Thoda smooth aur fast kiya hai
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: 'top 85%', // Screen mein thoda jaldi appear hoga
            toggleActions: "play none none none"
          }
        });
      });
    }, rootContainer);

    return () => animationContext.revert();
  }, [history]);

  return (
    // max-w-4xl added to keep timeline compact on big screens
     <section ref={rootContainer} id="experience" className="container mx-auto max-w-4xl pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      
      {/* CAREER MILESTONES SECTION */}
      {workHistory.length > 0 && (
        <div className="mb-20 md:mb-24">
          <header className="mb-8 md:mb-12">
            {/* Heading text-5xl se text-3xl/4xl kar diya gaya hai */}
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-primary uppercase">
              Career Milestones
            </h2>
            <div className="h-1 w-16 bg-primary/20 mt-3 rounded-full"></div>
          </header>
          
          <div className="relative border-l-[3px] border-secondary/20 ml-2">
            {workHistory.map((item, index) => (
              <MilestoneNode key={`work-${index}`} entry={item} />
            ))}
          </div>
        </div>
      )}

      {/* ACADEMIC JOURNEY SECTION */}
      {studyHistory.length > 0 && (
        <div>
          <header className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-primary uppercase">
              Academic Journey
            </h2>
            <div className="h-1 w-16 bg-primary/20 mt-3 rounded-full"></div>
          </header>
          
          <div className="relative border-l-[3px] border-secondary/20 ml-2">
            {studyHistory.map((item, index) => (
              <MilestoneNode key={`study-${index}`} entry={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ExperienceTimeline;
