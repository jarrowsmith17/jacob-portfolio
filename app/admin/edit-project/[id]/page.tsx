'use client';

import { useEffect, useState, use } from 'react'; // 1. Import 'use'
import { useRouter } from 'next/navigation';
import { HiArrowLeft, HiTrash } from 'react-icons/hi';
import Link from 'next/link';

// 2. Type 'params' as a Promise
export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  // 3. Unwrap the params using 'use()'
  const { id } = use(params); 
  
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    repoLink: '',
    liveLink: '',
    techStack: '',
  });

  useEffect(() => {
    const fetchProject = async () => {
      // 4. Use the unwrapped 'id' variable here
      const res = await fetch(`/api/projects/${id}`);
      if (!res.ok) {
        alert("Project not found");
        router.push('/admin');
        return;
      }
      const data = await res.json();
      
      setFormData({
        ...data,
        liveLink: data.liveLink || '',
        techStack: data.techStack.join(', '),
      });
      setLoading(false);
    };
    fetchProject();
  }, [id, router]); // 5. Dependency is now 'id'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Use 'id' here
    const res = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      alert('Failed to update');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    // Use 'id' here
    const res = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.push('/admin');
      router.refresh();
    }
  };

  if (loading) return <div className="p-8 text-center">Loading project data...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 bg-white rounded-full text-slate-600 hover:text-blue-600 shadow-sm">
              <HiArrowLeft />
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Edit Project</h1>
          </div>
          <button 
            onClick={handleDelete}
            className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <HiTrash /> Delete Project
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Project Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea
                name="description"
                required
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                required
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tech Stack</label>
              <input
                type="text"
                name="techStack"
                required
                value={formData.techStack}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">GitHub Repo</label>
                <input
                  type="url"
                  name="repoLink"
                  required
                  value={formData.repoLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Live Demo</label>
                <input
                  type="url"
                  name="liveLink"
                  value={formData.liveLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Update Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}