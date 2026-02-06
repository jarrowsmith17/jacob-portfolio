import { prisma } from '@/app/lib/prisma';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function BlogListPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24"> {/* pt-24 to push below navbar */}
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Blog</h1>
        <p className="text-slate-600 mb-12">Thoughts, tutorials, and updates.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-200 group h-full flex flex-col">
                
                {/* Image */}
                <div className="h-48 bg-slate-200 overflow-hidden relative">
                   {post.coverImage ? (
                      <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   ) : (
                      <div className="w-full h-full bg-slate-300 flex items-center justify-center text-slate-400">No Image</div>
                   )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">
                    {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 line-clamp-3 text-sm">
                    {post.content.slice(0, 150)}...
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 text-slate-500">No posts published yet.</div>
        )}
      </div>
    </div>
  );
}