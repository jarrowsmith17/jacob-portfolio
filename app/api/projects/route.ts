import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route'; // Import the options we just exported
import { prisma } from '@/app/lib/prisma';

export async function POST(req: Request) {
  // 1. Check if the user is logged in
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    
    // 2. Destructure the fields
    const { title, description, imageUrl, repoLink, liveLink, techStack } = body;

    // 3. Save to Database
    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        repoLink,
        liveLink: liveLink || null, // Handle empty string as null
        // 4. Split the comma-separated string into an array (e.g. "React, Node" -> ["React", "Node"])
        techStack: techStack.split(',').map((t: string) => t.trim()),
      },
    });

    return NextResponse.json(project);
    
  } catch (error) {
    console.error('Project creation failed:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}