import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { prisma } from '@/app/lib/prisma';

// 1. GET: Fetch a single project
export async function GET(
  req: Request,
  // Fix: Type 'params' as a Promise
  { params }: { params: Promise<{ id: string }> } 
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Fix: Await params before using it
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id: parseInt(id) },
  });

  return NextResponse.json(project);
}

// 2. PUT: Update the project
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params; // Fix: Await here
  const body = await req.json();
  const { title, description, imageUrl, repoLink, liveLink, techStack } = body;

  const updatedProject = await prisma.project.update({
    where: { id: parseInt(id) },
    data: {
      title,
      description,
      imageUrl,
      repoLink,
      liveLink: liveLink || null,
      techStack: typeof techStack === 'string' ? techStack.split(',').map((t: string) => t.trim()) : techStack,
    },
  });

  return NextResponse.json(updatedProject);
}

// 3. DELETE: Remove the project
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params; // Fix: Await here

  await prisma.project.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ success: true });
}