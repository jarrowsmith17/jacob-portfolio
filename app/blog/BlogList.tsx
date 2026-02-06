'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

// 1. Change 'string' to 'string | undefined' or add a '?'
interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  coverImage: string | null;
  category?: string; // <--- Add the question mark here
  createdAt: string;
}

export default function BlogList({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState('All');

  // 2. Add a fallback so it defaults to "General" if missing
  const categories = ['All', ...Array.from(new Set(posts.map(post => post.category || 'General')))];

  const filteredPosts = filter === 'All' 
    ? posts 
    : posts.filter(post => (post.category || 'General') === filter);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === cat 
                ? 'bg-slate-900 text-white' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-200 group h-full flex flex-col">
              
              <div className="h-48 bg-slate-200 overflow-hidden relative">
                 {post.coverImage ? (
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 ) : (
                    <div className="w-full h-full bg-slate-300 flex items-center justify-center text-slate-400">No Image</div>
                 )}
                 <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                   {post.category}
                 </span>
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

      {filteredPosts.length === 0 && (
        <div className="text-center py-20 text-slate-500">No posts found for this category.</div>
      )}
    </div>
  );
}