

import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Mail, Globe, Wrench, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const PROFESSIONAL_OFFERINGS = [
  {
    name: "Website Development",
    Graphic: Globe,
    info: "I design and develop fully responsive, fast, and SEO-optimized websites using modern technologies like Next.js and Tailwind CSS. Each site is built with immense focus on detail, ensuring seamless user experience and performance.",
    modalDesc: "High-performance, SEO-optimized websites built with complete ownership, security, and scalability in mind.",
    workflow: [
      "Requirement Analysis.",
      "UI/UX Design & Prototyping.",
      "Frontend & Backend Development.",
      "Testing & SEO Optimization.",
      "Deployment & Handover.",
      "Post-launch Support."
    ]
  },
  {
    name: "Consultancy",
    Graphic: Mail,
    info: "Get personalized digital consultancy on your online presence, website optimization, or project idea — your first session is absolutely free. If you purchase a website, consultancy remains free for future discussions too.",
    modalDesc: "Focused sessions with clear outcomes — no vague theory.",
    workflow: [
      "Optional NDA.",
      "Problem discussion.",
      "Deep analysis.",
      "Solution strategy.",
      "Actionable roadmap.",
      "Follow-up support."
    ]
  },
  {
    name: "Software Issue Fixing",
    Graphic: Wrench,
    info: "I troubleshoot and resolve software-related issues on laptops and computers, including system errors, slow performance, installation problems, and software conflicts. With years of experience, I provide precise, practical solutions to get your systems running smoothly.",
    modalDesc: "Debugging and fixing system issues, performance problems, and software errors.",
    workflow: [
      "Issue Diagnosis.",
      "Root Cause Analysis.",
      "Performance Tuning.",
      "Bug Fixing & Patching.",
      "System Verification.",
      "Future Prevention Tips."
    ]
  },
];

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null);
  const containerNode = useRef(null);
  const actionAreaRef = useRef(null);

  // 2️⃣ Refactored Animation Engine
  useLayoutEffect(() => {
    const animationCtx = gsap.context(() => {
      // Logic for service card reveals
      gsap.fromTo(
        '.reveal-service-card',
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: containerNode.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Unique approach for interactive icon states
      const featureIcons = gsap.utils.toArray('.visual-icon-wrapper');
      featureIcons.forEach((icon) => {
        const hoverAnim = gsap.to(icon, { 
          scale: 1.15, 
          rotate: 8, 
          duration: 0.4, 
          paused: true, 
          ease: 'back.out(2)' 
        });
        
        icon.addEventListener('mouseenter', () => hoverAnim.play());
        icon.addEventListener('mouseleave', () => hoverAnim.reverse());
      });

      // Outreach section motion
      gsap.from(actionAreaRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        scrollTrigger: {
          trigger: actionAreaRef.current,
          start: 'top 95%',
        },
      });
    }, containerNode);

    return () => animationCtx.revert();
  }, []);

  return (
    <section ref={containerNode} className="container mx-auto py-32 px-4 sm:px-6 lg:px-8">
      {/* Intro Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black tracking-tight text-primary mb-4 uppercase">
          My Services
        </h2>
        <div className="h-1 w-16 bg-primary/20 mx-auto mb-6 rounded-full" />
        <p className="text-secondary max-w-2xl mx-auto text-lg leading-relaxed italic">
          Over the years, I’ve worked with immense focus, passion, and dedication
          to create digital solutions that truly help people. Your first consultancy
          is always <span className="font-bold text-primary not-italic underline decoration-primary/20">free</span>.
        </p>
      </div>

      {/* Offerings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {PROFESSIONAL_OFFERINGS.map((item, idx) => {
          const Visual = item.Graphic;
          return (
            <div
              key={idx}
              className="reveal-service-card group bg-white border border-zinc-100 rounded-3xl p-10 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:bg-primary/[0.03] flex flex-col items-center text-center"
            >
              <div className="mb-6 visual-icon-wrapper p-4 bg-zinc-50 rounded-2xl group-hover:bg-white transition-colors">
                <Visual className="w-12 h-12 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-extrabold text-primary mb-4 uppercase tracking-wide">
                {item.name}
              </h3>
              <p className="text-secondary text-sm leading-relaxed font-medium mb-6 flex-grow">
                {item.info}
              </p>
              <button 
                onClick={() => setSelectedService(item)}
                className="mt-auto flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
              >
                View Process <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Engagement Block */}
      <div ref={actionAreaRef} className="mt-24 text-center bg-zinc-50/50 py-16 rounded-[2rem] border border-zinc-100">
        <h3 className="text-3xl font-black text-primary mb-4 tracking-tight">
          Ready to book your free consultancy?
        </h3>
        <p className="text-secondary mb-10 max-w-lg mx-auto font-medium">
          I’m available on weekends (Saturday & Sunday). Connect with me directly
          via email or secure your slot using the form below.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link to="https://docs.google.com/forms/d/e/1FAIpQLSe7wYmNWGFWes-8lDIEtuTWKSuXBzQxMI-MJT84j3JkNfPN8A/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:brightness-110 transition-all active:scale-95"
          >
            Book Appointment
          </Link>
          <Link to="mailto:mdsadiksadik464@gmail.com"
            className="px-10 py-4 border-2 border-primary text-primary rounded-2xl font-black hover:bg-primary hover:text-white transition-all active:scale-95"
          >
            Email Me
          </Link>
        </div>
      </div>

      {/* Services Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5 text-secondary" />
              </button>

              <div className="p-8 sm:p-10 overflow-y-auto">
                <div className="flex items-center gap-5 mb-6">
                  <div className="p-4 bg-zinc-100 rounded-2xl">
                    <selectedService.Graphic className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-3xl font-black text-primary">{selectedService.name}</h2>
                </div>
                
                <div className="border-l-4 border-zinc-200 pl-4 py-1 mb-10">
                  <p className="text-secondary text-lg font-medium">
                    {selectedService.modalDesc}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-xs font-bold tracking-widest text-primary uppercase mb-6">The Workflow</h4>
                  <div className="space-y-3">
                    {selectedService.workflow.map((step, i) => (
                      <div key={i} className="flex items-center gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        <span className="text-secondary font-semibold">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:px-10 sm:py-6 bg-zinc-50 border-t border-zinc-100 flex justify-end shrink-0">
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSe7wYmNWGFWes-8lDIEtuTWKSuXBzQxMI-MJT84j3JkNfPN8A/viewform?usp=header"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-[#222] hover:bg-black text-white rounded-xl font-bold transition-all shadow-md active:scale-95 flex items-center justify-center w-full sm:w-auto"
                >
                  Book This Service
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export const metadata = {
  title: 'Services - Sadik Aslam',
  description: 'Explore the expert digital services provided by Sadik Aslam, including full-stack development and technical consultancy.',
};