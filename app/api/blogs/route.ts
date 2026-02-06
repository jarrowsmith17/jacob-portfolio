import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';

// 1. GET: Fetch all published blogs (for the public list)
export async function GET() {
  const blogs = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(blogs);
}

// 2. POST: Create a new blog post (Admin only)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { title, slug, content, coverImage, published } = body;

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug, // We will generate this on the frontend
        content,
        coverImage,
        published: published || false,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}