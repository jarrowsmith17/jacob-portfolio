import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/app/lib/prisma';
import Link from 'next/link';
import { HiPencilAlt, HiDocumentText } from 'react-icons/hi';
import { authOptions } from '../api/auth/[...nextauth]/route';
import LogoutButton from '@/app/components/LogoutButton'; // <--- 1. IMPORT THIS

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  // 1. Fetch Projects AND Blogs
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  const blogs = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          
          <div className="flex items-center gap-3">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 text-sm text-slate-600">
              Admin: <span className="font-bold text-slate-900 ml-1">{session.user?.name}</span>
            </div>
            {/* 2. ADD BUTTON HERE */}
            <LogoutButton /> 
          </div>
        </div>

        {/* --- Action Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link href="/admin/add-project" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-blue-500 transition-all group">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600">Add New Project</h2>
                <HiPencilAlt className="text-slate-300 group-hover:text-blue-500 text-2xl" />
            </div>
            <p className="text-slate-500">Upload a new portfolio item.</p>
          </Link>

          <Link href="/admin/write-blog" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-green-500 transition-all group">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-green-600">Write Blog Post</h2>
                <HiDocumentText className="text-slate-300 group-hover:text-green-500 text-2xl" />
            </div>
            <p className="text-slate-500">Create a new tutorial or draft.</p>
          </Link>
        </div>

        {/* --- Blog Posts Section --- */}
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Blog Posts</h2>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-12">
          {blogs.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No blog posts found.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {blogs.map((post) => (
                <div key={post.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  
                  {/* Left Side: Icon and Title Info */}
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${post.published ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                      <HiDocumentText size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{post.title}</h3>
                      <p className="text-xs text-slate-500 flex gap-2">
                        <span>{post.published ? 'Published' : 'Draft'}</span>
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Button Group Wrapper */}
                  <div className="flex items-center gap-2"> 
                    <Link href={`/blog/${post.id}`} className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-white hover:text-blue-600 hover:border-blue-300 transition-all shadow-sm">
                      Preview
                    </Link>
                    <Link href={`/admin/edit-blog/${post.id}`} className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-white hover:text-blue-600 hover:border-blue-300 transition-all shadow-sm">
                      Edit
                    </Link>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- Projects Section --- */}
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Projects</h2>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {projects.length === 0 ? (
             <div className="p-8 text-center text-slate-500">No projects found.</div>
          ) : (
             projects.map((project) => (
                <div key={project.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-4">
                    <img src={project.imageUrl || 'https://placehold.co/100'} alt="" className="w-12 h-12 rounded-lg object-cover bg-slate-200 border border-slate-200" />
                    <h3 className="font-semibold text-slate-900">{project.title}</h3>
                  </div>
                  <Link href={`/admin/edit-project/${project.id}`} className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-white hover:text-blue-600 hover:border-blue-300 transition-all shadow-sm">
                    Edit
                  </Link>
                </div>
             ))
          )}
        </div>
        
      </div>
    </div>
  );
}