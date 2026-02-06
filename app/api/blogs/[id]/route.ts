import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';

// 1. GET: Fetch single post for the edit form
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // Next.js 15 Promise type
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params; // Await params

  const post = await prisma.blogPost.findUnique({
    where: { id: parseInt(id) },
  });

  return NextResponse.json(post);
}

// 2. PUT: Update post (publish, edit content, etc)
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { title, slug, content, coverImage, published } = body;

  const updatedPost = await prisma.blogPost.update({
    where: { id: parseInt(id) },
    data: {
      title,
      slug,
      content,
      coverImage,
      published, // This toggles draft/live status
    },
  });

  return NextResponse.json(updatedPost);
}

// 3. DELETE: Remove post
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  await prisma.blogPost.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ success: true });
}