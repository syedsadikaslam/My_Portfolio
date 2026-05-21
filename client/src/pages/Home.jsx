

import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  // Structured Data for Google Search
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sadik Aslam",
    "alternateName": ["Sadik", "Sadik Aslam"],
    "url": "https://www.sadikaslam.in",
    "image": "https://www.sadikaslam.in/profile.png",
    "jobTitle": "Full-Stack Engineer & AI/ML Specialist",
    "description": "Official engineering portfolio of Sadik Aslam. Showcasing production-ready Full Stack systems, Cloud Architecture, and AI-driven applications like InternX.",
    "sameAs": [
      "https://github.com/syedsadikaslam", 
      "https://linkedin.com/in/Md-Sadik-9104a2252",
      "https://sadikaslam.vercel.app"
    ],
    "knowsAbout": ["Full Stack Development", "MERN Stack", "Cloud Engineering", "Next.js", "AI Integration", "React.js", "Node.js", "Express.js", "MongoDB", "Generative AI"]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sadik Aslam",
    "alternateName": ["Sadik Aslam Portfolio", "Sadik Aslam Website"],
    "url": "https://www.sadikaslam.in/"
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://www.sadikaslam.in/",
    "name": "Sadik Aslam | Full-Stack Engineer & AI/ML Specialist",
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": "https://www.sadikaslam.in/profile.png"
    }
  };

  return (
    <>
      <Helmet>
        <title>Sadik Aslam | Full-Stack Engineer & AI/ML Specialist</title>
        <meta name="description" content="Explore the official portfolio of Sadik Aslam, a Full-Stack Engineer specializing in MERN, Cloud, and AI applications." />
        <link rel="canonical" href="https://www.sadikaslam.in/" />
        <meta property="og:site_name" content="Sadik Aslam" />
        <meta property="og:image" content="https://www.sadikaslam.in/profile.png" />
        <meta name="twitter:image" content="https://www.sadikaslam.in/profile.png" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(webPageJsonLd)}
        </script>
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col w-full overflow-x-hidden bg-background"
      >
        {/* 2. Semantic Structure: main tag helps Google understand core content */}
        <main>
          {/* Ensure HeroSection has an <h1> with the name "Sadik" or "Sadik Aslam" */}
          <HeroSection />

          <div className="relative z-10">
            <AboutSection />

            <section className="reviews-scroll-container" aria-label="Client Reviews">
              <ReviewsSection />
            </section>

            <ContactSection />
          </div>
        </main>

        {/* 3. Visual Background Layer */}
        <div 
          className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-b from-transparent via-zinc-50/5 to-transparent" 
          aria-hidden="true"
        />
      </motion.div>
    </>
  );
}
