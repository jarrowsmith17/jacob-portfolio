'use client';

import { useRef } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  repoLink: string;
  liveLink: string | null;
  techStack: string[];
}

export default function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll Handler
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -400 : 400; // Scroll by one card width
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (projects.length === 0) {
    return <div className="text-center text-slate-500">No projects added yet.</div>;
  }

  return (
    <div className="relative group">
      
      {/* Left Arrow Button */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 p-3 bg-white/90 shadow-lg rounded-full text-slate-700 hover:text-blue-600 hover:scale-110 transition-all hidden md:group-hover:block"
      >
        <HiChevronLeft size={24} />
      </button>

      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 px-4 sm:px-0 scrollbar-hide scroll-smooth"
      >
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="snap-center shrink-0 w-[85vw] md:w-[450px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full"
          >
            
            {/* Image */}
            <div className="h-56 bg-slate-200 relative">
              <img 
                src={project.imageUrl || "https://placehold.co/600x400"} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
              </div>
              
              {/* Description - Forced to 3 lines max */}
              <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium border border-blue-100">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <a 
                  href={project.repoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
                >
                  <FaGithub size={16} /> Code
                </a>

                {project.liveLink && (
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
                  >
                    <FaExternalLinkAlt size={12} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow Button */}
      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 p-3 bg-white/90 shadow-lg rounded-full text-slate-700 hover:text-blue-600 hover:scale-110 transition-all hidden md:group-hover:block"
      >
        <HiChevronRight size={24} />
      </button>

    </div>
  );
}