import React from 'react';

// 1. Define the interface for our data structure
interface SkillCategory {
  title: string;
  skills: string[];
}

export default function Skills() {
  // 2. Type the array as 'SkillCategory[]'
  const skillCategories: SkillCategory[] = [
    {
      title: "Languages",
      skills: ["JavaScript (ES6+)", "Python", "Java", "C++", "SQL"]
    },
    {
      title: "Frontend",
      skills: ["React.js", "Next.js", "Tailwind CSS", "HTML5 & CSS3", "Bootstrap"]
    },
    {
      title: "Backend & DB",
      skills: ["Node.js", "Express", "PostgreSQL (Supabase)", "MongoDB", "Prisma"]
    },
    {
      title: "Tools & Misc",
      skills: ["SAP PO","SAP Portal" ,"Microsoft Power Platform","Git & GitHub", "Linux", "VS Code", "Agile Methodologies",]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Technical Skills</h2>
          <p className="mt-2 text-slate-600">The technologies I work with.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category) => (
            <div key={category.title} className="bg-slate-50 rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-blue-600 mb-4 border-b border-slate-200 pb-2">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center text-slate-700 text-sm">
                    {/* Decorative dot using Tailwind */}
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}