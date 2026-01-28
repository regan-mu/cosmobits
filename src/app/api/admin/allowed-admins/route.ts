import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET /api/admin/allowed-admins - List all allowed admins
export async function GET() {
  const session = await auth();
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const allowedAdmins = await prisma.allowedAdmin.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(allowedAdmins);
  } catch (error) {
    console.error('Error fetching allowed admins:', error);
    return NextResponse.json(
      { error: 'Failed to fetch allowed admins' },
      { status: 500 }
    );
  }
}

// POST /api/admin/allowed-admins - Add a new allowed admin
export async function POST(request: NextRequest) {
  const session = await auth();
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { email, name } = body;

  if (!email) {
    return NextResponse.json(
      { error: 'Email is required' },
      { status: 400 }
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: 'Invalid email format' },
      { status: 400 }
    );
  }

  try {
    // Check if already exists
    const existing = await prisma.allowedAdmin.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'This email is already in the allowed list' },
        { status: 400 }
      );
    }

    const allowedAdmin = await prisma.allowedAdmin.create({
      data: {
        email: email.toLowerCase(),
        name: name || null,
        addedBy: session.user.email || 'Admin',
      },
    });

    return NextResponse.json(allowedAdmin, { status: 201 });
  } catch (error) {
    console.error('Error adding allowed admin:', error);
    return NextResponse.json(
      { error: 'Failed to add allowed admin' },
      { status: 500 }
    );
  }
}
