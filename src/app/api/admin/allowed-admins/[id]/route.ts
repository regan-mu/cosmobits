import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { UserRole } from '@/generated/prisma/enums';

// DELETE /api/admin/allowed-admins/[id] - Remove an allowed admin (SUPER_ADMIN only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if user is SUPER_ADMIN
  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (currentUser?.role !== UserRole.SUPER_ADMIN) {
    return NextResponse.json(
      { error: 'Only super admins can remove team members' },
      { status: 403 }
    );
  }

  const { id } = await params;

  try {
    // Check if exists
    const existing = await prisma.allowedAdmin.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Allowed admin not found' },
        { status: 404 }
      );
    }

    // Prevent removing the super admin
    const superAdminEmail = process.env.CONTACT_EMAIL;
    if (existing.email === superAdminEmail) {
      return NextResponse.json(
        { error: 'Cannot remove the super admin' },
        { status: 403 }
      );
    }

    await prisma.allowedAdmin.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing allowed admin:', error);
    return NextResponse.json(
      { error: 'Failed to remove allowed admin' },
      { status: 500 }
    );
  }
}
