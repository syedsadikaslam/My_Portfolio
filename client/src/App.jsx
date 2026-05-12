import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import CodeCraft from './pages/CodeCraft';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Services from './pages/Services';

function App() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/codecraft" element={<CodeCraft />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
