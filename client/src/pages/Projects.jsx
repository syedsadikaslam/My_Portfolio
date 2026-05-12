

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
        <link rel="canonical" href="https://www.sadikaslam.in/projects" />
      </Helmet>
      
      <div className="relative pt-10">
        <ProjectsSection />
      </div>
    </motion.main>
  );
}