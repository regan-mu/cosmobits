import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface AdminOutgoingEmailProps {
  recipientName: string;
  subject: string;
  message: string;
  baseUrl?: string;
}

export default function AdminOutgoingEmail({
  recipientName,
  subject,
  message,
  baseUrl = 'https://cosmobits.tech',
}: AdminOutgoingEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src={`${baseUrl}/cosmobits-portrait.png`}
              width="150"
              height="100"
              alt="CosmoBits Technologies"
              style={logoImage}
            />
          </Section>

          <Hr style={divider} />

          {/* Main Content */}
          <Section style={content}>
            <Text style={greeting}>Dear {recipientName},</Text>
            
            {/* Render HTML content from rich text editor */}
            <div
              style={messageContainer}
              dangerouslySetInnerHTML={{ __html: message }}
            />
          </Section>

          <Hr style={divider} />

          {/* Footer - Same as UserConfirmationEmail */}
          <Section style={footer}>
            <Text style={footerText}>
              Best regards,
              <br />
              <strong>The CosmoBits Team</strong>
            </Text>
            <Text style={footerLinks}>
              <Link href="https://cosmobits.tech" style={link}>Website</Link>
              {' • '}
              <Link href="https://linkedin.com/company/cosmobits" style={link}>LinkedIn</Link>
              {' • '}
              <Link href="https://tiktok.com/@cosmobits" style={link}>TikTok</Link>
            </Text>
            <Text style={copyright}>
              © 2026 CosmoBits Technologies. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  maxWidth: '600px',
  borderRadius: '8px',
  overflow: 'hidden' as const,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const header = {
  backgroundColor: '#150F33',
  padding: '30px 40px',
  textAlign: 'center' as const,
};

const logoImage = {
  margin: '0 auto',
};

const divider = {
  borderColor: '#e6ebf1',
  margin: '0',
};

const content = {
  padding: '40px',
};

const greeting = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 20px 0',
};

const messageContainer = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
};

const footer = {
  padding: '30px 40px',
  textAlign: 'center' as const,
  backgroundColor: '#f8f6fc',
};

const footerText = {
  color: '#374151',
  fontSize: '14px',
  margin: '0 0 16px 0',
};

const footerLinks = {
  margin: '0 0 16px 0',
};

const link = {
  color: '#A855F7',
  textDecoration: 'none',
};

const copyright = {
  color: '#9ca3af',
  fontSize: '12px',
  margin: '0',
};
