import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import AdminOutgoingEmail from '@/emails/AdminOutgoingEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/admin/leads/[id]/email - Send email to lead
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { subject, message } = body;

  if (!subject || !message) {
    return NextResponse.json(
      { error: 'Subject and message are required' },
      { status: 400 }
    );
  }

  try {
    // Get the lead
    const lead = await prisma.contactSubmission.findUnique({
      where: { id },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Render email template to HTML
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cosmobits.tech';
    const emailHtml = await render(
      AdminOutgoingEmail({
        recipientName: lead.name,
        subject,
        message,
        baseUrl,
      })
    );

    // Send email
    const { error: emailError } = await resend.emails.send({
      from: 'CosmoBits Technologies <hello@cosmobits.tech>',
      to: lead.email,
      subject,
      html: emailHtml,
    });

    if (emailError) {
      console.error('Email error:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Add a note to the status history about the email sent, including the email content
    await prisma.statusUpdate.create({
      data: {
        contactId: id,
        status: lead.currentStatus,
        comment: `Email sent: "${subject}"`,
        emailSubject: subject,
        emailBody: message,
        updatedBy: session.user.email || 'Admin',
      },
    });

    // Update the lead's updatedAt
    await prisma.contactSubmission.update({
      where: { id },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
