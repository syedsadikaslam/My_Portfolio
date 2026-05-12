

import { useLayoutEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

   
const MilestoneNode = ({ entry }) => {
  // Added certificateLink here
  const { period, designation, organization, highlights, certificateLink } = entry;

  return (
    <div className="career-node-item relative pl-10 sm:pl-16 py-10 group">
      {/* Visual Timeline Anchor */}
      <div className="absolute top-12 left-[-8px] w-4 h-4 rounded-full bg-secondary ring-4 ring-background group-hover:bg-primary group-hover:scale-125 transition-all duration-700 shadow-sm"></div>
      
      <span className="text-[10px] font-black tracking-[0.2em] text-secondary/50 uppercase font-mono">
        {period}
      </span>

      {/* Designation: Made it clickable if certificateLink exists */}
      {certificateLink ? (
        <a href={certificateLink} target="_blank" rel="noopener noreferrer" className="block w-fit group/link">
          <h3 className="mt-2 text-3xl font-black text-primary tracking-tight leading-none group-hover/link:text-primary/70 transition-colors flex items-center gap-2">
            {designation}
            <svg className="w-5 h-5 opacity-0 group-hover/link:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </h3>
        </a>
      ) : (
        <h3 className="mt-2 text-3xl font-black text-primary tracking-tight leading-none group-hover:text-primary/80 transition-colors">
          {designation}
        </h3>
      )}

      <p className="mt-2 text-lg font-bold text-secondary italic opacity-90">{organization}</p>
      
      {highlights && highlights.length > 0 && (
        <ul className="mt-6 space-y-4">
          {highlights.map((bullet, i) => (
            <li key={i} className="text-secondary/70 text-sm leading-relaxed flex items-start">
              <span className="mr-4 mt-2 w-1.5 h-1.5 rounded-full bg-primary/20 flex-shrink-0"></span>
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
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: node,
            start: 'top 90%',
            toggleActions: "play none none none"
          }
        });
      });
    }, rootContainer);

    return () => animationContext.revert();
  }, [history]);

  return (
     <section ref={rootContainer} id="experience" className="container mx-auto pt-10 pb-20 px-6 lg:px-12">
      {/* CAREER MILESTONES SECTION */}
      {workHistory.length > 0 && (
        <div className="mb-32">
          <header className="mb-16">
            <h2 className="text-5xl font-black tracking-tighter text-primary uppercase">
              Career Milestones
            </h2>
            <div className="h-1 w-24 bg-primary/10 mt-4 rounded-full"></div>
          </header>
          
          <div className="relative border-l-2 border-secondary/10 ml-1">
            {workHistory.map((item, index) => (
              <MilestoneNode key={`work-${index}`} entry={item} />
            ))}
          </div>
        </div>
      )}

      {/* ACADEMIC JOURNEY SECTION */}
      {studyHistory.length > 0 && (
        <div>
          <header className="mb-16">
            <h2 className="text-5xl font-black tracking-tighter text-primary uppercase">
              Academic Journey
            </h2>
            <div className="h-1 w-24 bg-primary/10 mt-4 rounded-full"></div>
          </header>
          
          <div className="relative border-l-2 border-secondary/10 ml-1">
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
