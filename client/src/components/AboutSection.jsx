

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Link } from 'react-router-dom';
import ProjectPreview from "./ProjectPreview";
import AIButton from "@/components/ui/AIButton";

gsap.registerPlugin(ScrollTrigger);

// Data Objects
const TECH_STACK = [
  { label: "React", icon: "/logos/react.svg" },
  { label: "Node.js", icon: "/logos/nodejs.svg" },
  { label: "Express", icon: "/logos/express.svg" },
  { label: "MongoDB", icon: "/logos/mongodb.svg" },
  { label: "PostgreSQL", icon: "/logos/postgresql.svg" },
  { label: "JavaScript", icon: "/logos/js.svg" },
  { label: "Postman", icon: "/logos/postman.svg" },
  { label: "Tailwind", icon: "/logos/tailwind.svg" },
  { label: "Python", icon: "/logos/python.svg" },
  { label: "Java", icon: "/logos/java.svg" },
  { label: "Git & GitHub", icon: "/logos/git.svg" },
  { label: "Next.js", icon: "/logos/nextjs.svg" },
  { label: "Docker", icon: "/logos/docker.svg" },
  { label: "Kubernetes", icon: "/logos/kubernetes.svg" },
  { label: "Vercel", icon: "/logos/vercel.svg" },
  { label: "Render", icon: "/logos/render.svg" },
  { label: "Voiceflow", icon: "/logos/voiceflow.svg" },
  { label: "Cloudinary", icon: "/logos/cloudinary.svg" },
];

const CAREER_TIMELINE = [
  {
    period: "2021",
    description: "Started my journey into web development, building foundational projects with React and Node.js.",
  },
  {
    period: "2023",
    description: "Began taking on freelance work, successfully delivering e-commerce sites and portfolio pages for clients.",
  },
  {
    period: "2023+",
    description: "Secured internships annually, gaining hands-on experience in both Full-Stack and Machine Learning environments.",
  },
];

const ACADEMIC_CREDENTIALS = [
  { title: "Build and Deploy Workshop", provider: "GeeksforGeeks", url: "https://drive.google.com/file/d/1xSjd2IVNJbFm69E0u_SumlRbhRDW5O8y/view?usp=drive_link" },
  { title: "Full Stack Web Development With MERN STACK & GenAl", provider: "Udemy", url: "https://www.udemy.com/certificate/UC-34322bb4-d487-4557-b64a-b1f21a552937/" },
  { title: "Data Structures and Algorithms in C ", provider: "Infosys Springboard", url: "https://infyspringboard.onwingspan.com/assets/common/pdfjs-2.14.305-dist/web/viewer.html?file=https%3A%2F%2Finfyspringboard.onwingspan.com%2Fpublic-assets%2Finfosysheadstart%2Fcert%2Flex_auth_01317717336104140852_shared%2F1-1f690ab0-9d71-4647-9fb1-8c5388f5c6b2.pdf#page=1" },
  { title: "C PROGRAMMING ", provider: "HCL GUVI", url: "https://www.guvi.in/share-certificate/eE2G9I653612N69t7V" },
  { title: "PYTHON PROGRAMMING ", provider: " HCL GUVI", url: "https://www.guvi.in/share-certificate/5V81hH5l83D6o313m9" },
  { title: "Data Analysis using Excel", provider: "Capgemini", url: "http://www.edubridgeindia.com/certificate-detail?enrollment_number=EBEON1124956270" },
  { title: " Data Analysis With Python ", provider: "IBM", url: "https://www.coursera.org/account/accomplishments/verify/TBNXA768FCDB" },
  { title: "DIPLOMA IN FINANCIAL ACCOUNTING", provider: "CHARLES COMPUTER LAB", url: "https://drive.google.com/file/d/1Av_tm4SnNIm-EoeGkrsKQJCWqvZRKUnk/view" },
  { title: "SPOKEN ENGLISH ", provider: "Josh Talks", url: "https://drive.google.com/file/d/1BbJn20FuLpSsEE7WIBKvaa5tX-Um_5Ud/view" },
];

const AboutSection = () => {
  const mainWrapper = useRef(null);
  const avatarContainerRef = useRef(null);

  useLayoutEffect(() => {
    let context = gsap.context(() => {
      gsap.from(".reveal-item", {
        opacity: 0,
        y: 60,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: mainWrapper.current,
          start: "top 80%",
        },
      });

      gsap.to(".tech-card", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: { each: 0.1, from: "random" },
      });
    }, mainWrapper);
    return () => context.revert();
  }, []);

  return (
    <section
      ref={mainWrapper}
      id="about"
      className="relative py-20 px-5 lg:px-12 bg-zinc-50 dark:bg-[#050505] overflow-hidden transition-colors duration-700"
    >
      {/* Background Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-center">
          {/* 1. Intro Block */}
              <div className="reveal-item order-1 space-y-8">
            <h2 className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.9]">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                Me.
              </span>
            </h2>
            <p className="text-1xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              I'm a Computer Science Engineering student specializing in Full
              Stack Development and AI/ML. I have strengthened my skills through
              a certification in MERN Stack and Generative AI (GenAI), applying
              this knowledge to develop dynamic web applications.{" "}
              <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                MERN Stack
              </span>{" "}
              power with{" "}
              <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                GenAI
              </span>{" "}
              intelligence.
            </p>
          </div>

          {/* 2. Central Avatar Card (Updated) */}
          <div className="reveal-item order-3 lg:order-2 flex flex-col items-center">
            <div
              ref={avatarContainerRef}
              className="relative w-[300px] h-[450px] group"
            >
              {/* Decorative Outer Rings */}
              <div className="absolute -inset-4 border border-primary/20 rounded-[3rem] group-hover:scale-105 transition-transform duration-700 z-0" />

              <div className="relative w-full h-full z-10">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>

                {/* Main Image Container (Replaced ElectricBorder) */}
                <div className="relative w-full h-full overflow-hidden rounded-[40px] bg-zinc-200 dark:bg-[#020202] border border-zinc-200 dark:border-zinc-800 shadow-2xl transition-all duration-500 group-hover:border-primary/50">
                  {/* Lighting Overlays */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.1),transparent_60%)] z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/5 z-20 pointer-events-none" />

                  {/* Image */}
                  <div className="relative w-full h-full animate-soft-float">
                    <img
                      src="/profile2.png"
                      alt="Sadik Aslam"
                      style={{ objectFit: "contain", objectPosition: "top" }}
                      className="transition-all duration-700 brightness-[0.9] contrast-110 group-hover:brightness-110 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Inner Glass Shadow */}
                  <div className="absolute inset-0 rounded-[40px] border border-white/10 z-30 pointer-events-none" />
                </div>

                {/* Counter Badge */}
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-zinc-900 p-3 rounded-xl shadow-xl border border-zinc-100 dark:border-zinc-800 z-50 transform transition-all duration-500 group-hover:translate-y-[-5px]">
                  <p className="text-2xl font-black text-primary leading-none">6+</p>
                  <p className="text-[8px] font-bold uppercase tracking-tighter text-zinc-400 mt-0.5">
                    Deployed Apps
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Journey Timeline */}
          <div className="reveal-item order-2 lg:order-3">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-10">
              Milestones
            </h3>
            <div className="space-y-12">
              {CAREER_TIMELINE.map((item, idx) => (
                <div
                  key={idx}
                  className="relative pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 group"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 group-hover:border-primary transition-colors" />
                  <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    {item.period}
                  </span>
                  <p className="mt-2 text-zinc-800 dark:text-zinc-200 font-bold leading-tight group-hover:text-primary transition-colors">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Showcase & Projects */}
        <div className="reveal-item mt-20 text-center">
          <h3 className="text-4xl font-black text-zinc-900 dark:text-white mb-10 mt-15 tracking-tight">
            CRAFTED PROJECTS
          </h3>
          <ProjectPreview />
          <div className="mt-12 space-y-8">
            <Link to="/projects"
              className="group text-lg font-bold text-zinc-500 hover:text-primary transition-all flex items-center justify-center gap-2"
            >
              Explore Complete Archive
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <AIButton>
              <Link to="/services"
                className="inline-block px-12 py-5 bg-primary text-white font-black rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                HIRE ME NOW
              </Link>
            </AIButton>
          </div>
        </div>

        {/* 5. Toolkit Grid */}
        <div className="reveal-item mt-20">
          <h3 className="text-center text-4xl font-black text-zinc-900 dark:text-white mb-5">
            Standardized Toolkit
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {TECH_STACK.map((tool, i) => (
              <div
                key={i}
                className="tech-card flex flex-col items-center p-6 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 hover:border-primary/40 transition-all shadow-sm"
              >
                <div className="relative w-12 h-12 mb-4">
                  <img src={tool.icon} alt={tool.label} className="absolute inset-0 w-full h-full object-contain" />
                </div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
                  {tool.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Certifications */}
        <div className="reveal-item mt-20 pb-0">
          <h3 className="text-center text-4xl font-black text-zinc-900 dark:text-white mb-5">
            CERTIFICATIONS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACADEMIC_CREDENTIALS.map((cert, index) => (
              <a
                key={index}
                href={cert.url}
                target="_blank"
                className="group relative p-8 rounded-[2rem] bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-white/20 dark:border-white/5 hover:bg-primary transition-all duration-500 overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-white/20">
                    <svg className="w-5 h-5 text-primary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-black text-zinc-900 dark:text-zinc-100 group-hover:text-white transition-colors leading-tight mb-2">
                    {cert.title}
                  </h4>
                  <p className="text-xs font-bold text-zinc-500 dark:text-zinc-500 group-hover:text-white/70 tracking-widest uppercase">
                    {cert.provider}
                  </p>
                </div>
                <span className="absolute bottom-[-20%] right-[-5%] text-9xl font-black text-black/5 dark:text-white/5 group-hover:text-white/10 transition-colors">
                  0{index + 1}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
