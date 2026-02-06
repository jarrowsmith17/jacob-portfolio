import Link from 'next/link';
import { HiLocationMarker } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col items-start">
        
        {/* Location Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
          <HiLocationMarker className="mr-1" />
          Based in the UK
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-4">
          Hi, I'm <span className="text-blue-600">Jacob Arrowsmith</span>.
        </h1>
        
        {/* Bio Description */}
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-8 leading-relaxed">
          A Computer Science Graduate passionate about building robust software and intuitive frontend experiences. 
          Currently specializing in the <span className="font-semibold text-slate-800">SAP</span> and <span className="font-semibold text-slate-800">Microsoft Power Platform Development.</span>
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/#projects" 
            className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            View Projects
          </Link>
          <div className="flex gap-4 items-center pl-0 sm:pl-4">
            <a href="https://github.com/jarrowsmith17" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 transition-colors">
              <FaGithub size={30} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-700 transition-colors">
              <FaLinkedin size={30} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}