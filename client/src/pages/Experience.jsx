

import { Helmet } from 'react-helmet-async';
import ExperienceTimeline from '@/components/ExperienceTimeline';
 
const CAREER_HISTORY = [
  {
    category: 'corporate',
    period: 'Sep 2023 – Mar 2024',
    designation: 'IT Manager',
    organization: 'TCS iON',
    certificateLink: 'https://drive.google.com/file/d/1WS3EZ3xMxdSuI8u2oiRqTJ74R4KvPJbx/view?usp=drive_link',
    highlights: [
      'Orchestrated technical lab operations during high-stakes examinations, maintaining 100% academic compliance and integrity standards.',
      'Administered critical IT infrastructure including network troubleshooting and hardware maintenance to facilitate seamless digital assessments.'
    ]
  },
  {
    category: 'corporate',
    period: 'Aug 2023 - Oct 2023',
    designation: 'AI/ML Engineer & Data Science Associate',
    organization: 'YBI Foundation',
    certificateLink: 'https://drive.google.com/file/d/1x0I85kuO1Fb4T8OTXPueV49mcXUgKnDb/view?usp=drive_link',
    highlights: [
      'Architected end-to-end machine learning pipelines involving complex data preprocessing, advanced feature engineering, and model validation using Scikit-Learn.'
    ]
  },
  {
    category: 'corporate',
    period: 'Sep 2024 - Oct 2024',
    designation: 'MERN Full Stack Development Intern',
    organization: 'Softpro India Computer Technologies Pvt. Ltd.',
    certificateLink: 'https://drive.google.com/file/d/13ELsEb4LuudqEthG4BULXVYQ9e6qnyVV/view?usp=drive_link',
    highlights: [
      'Successfully completed a 45-day intensive Summer Internship focused on MERN Full Stack Development.',
      'Developed scalable web applications using MongoDB, Express.js, React.js, and Node.js.',
      'Achieved an "A+" (Very Good) grade for technical proficiency and project execution during the program.'
    ]
  },
  {
  category: 'corporate',
  period: 'Mar 2026 - Till Date', 
  designation: 'Full-Stack Developer',
  organization: 'Zidio Bangalore',
  certificateLink: 'https://drive.google.com/file/d/1qSGnzUKxiJIU_mZsMans1k3_cASyZQbv/view?usp=drivesdk',
  highlights: [
    'Developing and maintaining scalable web applications utilizing the complete MERN stack (MongoDB, Express.js, React.js, Node.js).',
    'Designing and integrating robust RESTful APIs to seamlessly connect interactive React front-ends with Node.js/Express back-ends.',
    'Collaborating with the team to implement modern UI/UX designs and optimizing database queries in MongoDB for enhanced application performance.'
  ] 
  },
 
  {
    category: 'academic',
    period: 'Sep 2022 - Oct 2026',
    designation: 'B.Tech in Computer Science & Engineering',
    organization: 'Dr. A. P. J. Abdul Kalam Technical University, Lucknow',
    highlights: [
      'Serving as Lead Full Stack Engineer & System Architect for major aggregator platform projects.'
    ]
  },
  {
    category: 'academic',
    period: 'Apr 2018 - May 2020',
    designation: 'Higher Secondary Education (Class XII)',
    organization: 'Hasanpur College Samastipur',
    highlights: []
  },
  {
    category: 'academic',
    period: 'Apr 2019 - Mar 2020',
    designation: 'Secondary School Education (Class X)',
    organization: 'SKJP High School Samastipur',
    highlights: []
  }
];

export default function ExperiencePage() {
  
  return (
    <main className="min-h-screen bg-background pt-10 pb-20">
      <Helmet>
        <title>Experience | Sadik Aslam</title>
        <meta name="description" content="Professional journey and academic milestones of Sadik Aslam. From IT Management to Full-Stack Engineering." />
        <link rel="canonical" href="https://www.sadikaslam.in/experience" />
      </Helmet>
      <ExperienceTimeline history={CAREER_HISTORY} />
    </main>
  );
}
