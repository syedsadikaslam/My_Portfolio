

import { Helmet } from 'react-helmet-async';
import ServicesSection from '@/components/ServicesSection';


export default function ServicesPage() {
  return (
    <motion.main 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-background relative overflow-x-hidden"
    >
      <Helmet>
        <title>Services | Sadik Aslam</title>
        <meta name="description" content="Expert Full Stack development and AI consulting services by Sadik Aslam. Build scalable and intelligent solutions." />
        <link rel="canonical" href="https://www.sadikaslam.in/services" />
      </Helmet>
      
      <div className="relative z-10 py-12">
        <ServicesSection />
      </div>

      <div className="fixed inset-0 bg-gradient-to-b from-background via-zinc-50/10 to-background pointer-events-none -z-10" />
    </motion.main>
  );
}