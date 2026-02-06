import { prisma } from '@/app/lib/prisma';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';

// Validating params type for Next.js 15
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      
      {/* Hero Image Section */}
      <div className="h-[40vh] w-full bg-slate-900 relative">
        {post.coverImage && (
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover opacity-60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 pb-12">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-slate-300 hover:text-white mb-6 text-sm font-medium transition-colors">
              <HiArrowLeft className="mr-2" /> Back to Blog
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-slate-300">
              {format(new Date(post.createdAt), 'MMMM d, yyyy')}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section with MANUAL STYLE OVERRIDES */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <ReactMarkdown
          components={{
            // 1. Force Headers to be Big and Bold
            h1: (props) => <h1 className="text-3xl font-bold text-slate-900 mt-10 mb-4" {...props} />,
            h2: (props) => <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4 border-b pb-2 border-slate-200" {...props} />,
            h3: (props) => <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3" {...props} />,
            
            // 2. Force Lists to have Bullets/Numbers
            ul: (props) => <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-700" {...props} />,
            ol: (props) => <ol className="list-decimal pl-6 space-y-2 mb-6 text-slate-700" {...props} />,
            li: (props) => <li className="pl-1" {...props} />,
            
            // 3. Style Paragraphs and Links
            p: (props) => <p className="text-lg text-slate-700 leading-relaxed mb-6" {...props} />,
            a: (props) => <a className="text-blue-600 hover:underline font-medium hover:text-blue-800 transition-colors" target="_blank" {...props} />,
            
            // 4. Style Blockquotes
            blockquote: (props) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-xl text-slate-600 my-8 bg-slate-50 py-4 pr-4 rounded-r-lg" {...props} />,
            
            // 5. Style Code Blocks
            code: (props) => <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200" {...props} />,
            pre: (props) => <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto mb-6 border border-slate-800" {...props} />,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}