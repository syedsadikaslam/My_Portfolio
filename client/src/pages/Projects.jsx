

import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import ProjectsSection from '@/components/ProjectsSection';


export default function ProjectsPage() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-background overflow-x-hidden"
    >
      <Helmet>
        <title>Projects | Sadik Aslam</title>
        <meta name="description" content="A showcase of production-ready Full Stack systems, Cloud Architecture, and AI-driven applications by Sadik Aslam." />
        <meta name="keywords" content="Projects, Full Stack, Cloud Architecture, AI applications, React, Node.js, MongoDB, Sadik Aslam Portfolio" />
        <meta property="og:title" content="Projects | Sadik Aslam" />
        <meta property="og:site_name" content="Sadik Aslam" />
        <meta property="og:description" content="A showcase of production-ready Full Stack systems, Cloud Architecture, and AI-driven applications by Sadik Aslam." />
        <meta property="og:url" content="https://www.sadikaslam.in/projects" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects | Sadik Aslam" />
        <meta name="twitter:description" content="A showcase of production-ready Full Stack systems, Cloud Architecture, and AI-driven applications by Sadik Aslam." />
        <link rel="canonical" href="https://www.sadikaslam.in/projects" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Projects | Sadik Aslam",
            "url": "https://www.sadikaslam.in/projects",
            "description": "A showcase of production-ready Full Stack systems, Cloud Architecture, and AI-driven applications by Sadik Aslam."
          })}
        </script>
      </Helmet>
      
      <div className="relative pt-10">
        <ProjectsSection />
      </div>
    </motion.main>
  );
}