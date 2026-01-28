import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { LeadStatus } from '@/generated/prisma/enums';

// GET /api/admin/leads/[id] - Get single lead with full history
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const lead = await prisma.contactSubmission.findUnique({
      where: { id },
      include: {
        statusHistory: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json(lead);
  } catch (error) {
    console.error('Error fetching lead:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lead' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/leads/[id] - Update lead status with comment
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { status, comment } = body;

  // Validate status
  if (!Object.values(LeadStatus).includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  try {
    // Update lead and create status history entry
    const lead = await prisma.contactSubmission.update({
      where: { id },
      data: {
        currentStatus: status,
        statusHistory: {
          create: {
            status,
            comment: comment || null,
            updatedBy: session.user.email || 'Admin',
          },
        },
      },
      include: {
        statusHistory: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    );
  }
}
