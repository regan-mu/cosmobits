import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { render } from '@react-email/components';
import UserConfirmationEmail from '@/emails/UserConfirmationEmail';
import AdminNotificationEmail from '@/emails/AdminNotificationEmail';
import prisma from '@/lib/prisma';
import { LeadStatus } from '@/generated/prisma/enums';

// This runs server-side only - RESEND_API_KEY is never exposed to the client
const resend = new Resend(process.env.RESEND_API_KEY);

// Verify reCAPTCHA token with Google
async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number }> {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY!,
      response: token,
    }),
  });

  const data = await response.json();
  return { success: data.success && data.score >= 0.5, score: data.score };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, phone, service, message, recaptchaToken } = body;

    // Validate reCAPTCHA token
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification required' },
        { status: 400 }
      );
    }

    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaResult.success) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to database first - this is the priority
    let contactSubmission;
    try {
      contactSubmission = await prisma.contactSubmission.create({
        data: {
          name,
          email,
          company: company || null,
          phone: phone || null,
          service,
          message,
          currentStatus: LeadStatus.POTENTIAL_LEAD,
          // Create initial status history entry
          statusHistory: {
            create: {
              status: LeadStatus.POTENTIAL_LEAD,
              comment: 'New contact form submission received',
            },
          },
        },
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save your information. Please try again.' },
        { status: 500 }
      );
    }

    // Format submission timestamp
    const submittedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Africa/Nairobi',
    }).format(new Date());

    // Try to send emails - but don't fail if email sending fails
    let emailSent = false;
    let emailError: string | null = null;

    try {
      // Render email templates
      const adminEmailHtml = await render(
        AdminNotificationEmail({
          name,
          email,
          company,
          phone,
          service,
          message,
          submittedAt,
        })
      );

      // Use BASE_URL env var for email assets, fallback to production URL
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cosmobits.tech';

      const userEmailHtml = await render(
        UserConfirmationEmail({
          name,
          service,
          baseUrl,
        })
      );

      // Send notification email to admin
      const { error: adminEmailError } = await resend.emails.send({
        from: 'CosmoBits Contact <hello@cosmobits.tech>',
        to: process.env.CONTACT_EMAIL || 'hello@cosmobits.tech',
        replyTo: email,
        subject: `New Contact: ${service} - ${name}`,
        html: adminEmailHtml,
      });

      if (adminEmailError) {
        console.error('Admin email error:', adminEmailError);
        emailError = adminEmailError.message;
      } else {
        // Only send user confirmation if admin email succeeded
        const { error: userEmailError } = await resend.emails.send({
          from: 'CosmoBits Technologies <hello@cosmobits.tech>',
          to: email,
          subject: 'Thank you for contacting CosmoBits Technologies',
          html: userEmailHtml,
        });

        if (userEmailError) {
          console.error('User email error:', userEmailError);
          emailError = userEmailError.message;
        } else {
          emailSent = true;
        }
      }
    } catch (emailErr) {
      console.error('Email sending error:', emailErr);
      emailError = emailErr instanceof Error ? emailErr.message : 'Unknown email error';
    }

    // Update the contact submission with email status
    try {
      await prisma.contactSubmission.update({
        where: { id: contactSubmission.id },
        data: {
          emailSent,
          emailError,
        },
      });
    } catch (updateError) {
      // Log but don't fail - the submission was already saved
      console.error('Failed to update email status:', updateError);
    }

    // Return success - the important thing is that data was saved
    return NextResponse.json(
      { 
        success: true, 
        id: contactSubmission.id,
        emailSent,
        message: emailSent 
          ? 'Your message has been sent successfully!' 
          : 'Your information has been saved. We will contact you soon.',
      },
      { status: 200 }
    );
  } catch (error) {
    // Log the actual error for debugging but return a generic message
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
