import { prisma } from '@/app/lib/prisma';
import BlogList from './BlogList'; 

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  // Safe Serialization: Convert Date objects to strings before passing to Client Component
  const serializedPosts = posts.map(post => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
  }));

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Blog</h1>
        <p className="text-slate-600 mb-8">Thoughts, tutorials, and updates.</p>
        
        <BlogList posts={serializedPosts} />
        
      </div>
    </div>
  );
}