import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/app/lib/prisma';
import Link from 'next/link';
import { HiPencilAlt, HiDocumentText } from 'react-icons/hi';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  // 1. Fetch Projects AND Blogs
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  const blogs = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm">
            Admin: <span className="font-semibold">{session.user?.name}</span>
          </div>
        </div>

        {/* --- Action Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link href="/admin/add-project" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-blue-500 transition-all group">
            <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600">Add New Project</h2>
            <p className="text-slate-500">Upload a new portfolio item.</p>
          </Link>

          <Link href="/admin/write-blog" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-green-500 transition-all group">
            <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-green-600">Write Blog Post</h2>
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
                <div key={post.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${post.published ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                      <HiDocumentText size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{post.title}</h3>
                      <p className="text-xs text-slate-500">
                        {post.published ? 'Published' : 'Draft'} • {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Link href={`/admin/edit-blog/${post.id}`} className="px-3 py-1.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- Projects Section --- */}
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Projects</h2>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* ... existing project list code ... */}
          {projects.map((project) => (
            <div key={project.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-4">
                <img src={project.imageUrl} alt="" className="w-10 h-10 rounded object-cover bg-slate-200" />
                <h3 className="font-semibold text-slate-900">{project.title}</h3>
              </div>
              <Link href={`/admin/edit-project/${project.id}`} className="px-3 py-1.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                Edit
              </Link>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}