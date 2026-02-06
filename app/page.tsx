import Hero from './components/Hero';
import Skills from './components/Skills';
import ProjectsCarousel from './components/ProjectCarousel'; // 1. Import our new component
import { prisma } from './lib/prisma'; // Import the file we just made

// 4. By default, Next.js pages are Server Components, so we can run async DB code directly here.
export default async function Home() {
  
  // 5. Fetch projects from the database, ordered by creation date
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="min-h-screen">
      <Hero />
      <Skills />
      
      <section id="projects" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:text-center">
            <h2 className="text-3xl font-bold text-slate-900">Featured Projects</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              A selection of my recent work, ranging from web applications to hardware integration.
            </p>
          </div>

          {/* 6. Pass the fetched data into the Client Component */}
          <ProjectsCarousel projects={projects} />
          
        </div>
      </section>
    </div>
  );
}