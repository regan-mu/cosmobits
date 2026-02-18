import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface UserConfirmationEmailProps {
  name: string;
  service: string;
  baseUrl?: string;
}

export default function UserConfirmationEmail({
  name,
  service,
  baseUrl = 'https://cosmobits.tech',
}: UserConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for contacting CosmoBits Technologies</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src={`${baseUrl}/cosmobits-technologies-logo.png`}
              width="200"
              height="60"
              alt="CosmoBits Technologies"
              style={logoImage}
            />
          </Section>

          <Hr style={divider} />

          {/* Main Content */}
          <Section style={content}>
            <Heading style={heading}>Thank You, {name}!</Heading>
            
            <Text style={paragraph}>
              We&apos;ve received your inquiry about <strong>{service}</strong> and 
              appreciate you reaching out to CosmoBits Technologies.
            </Text>

            <Text style={paragraph}>
              Our team will review your message and get back to you within 
              <strong> 24 hours</strong>. We&apos;re excited about the possibility 
              of working together to transform your business with cutting-edge 
              technology solutions.
            </Text>

            <Section style={highlightBox}>
              <Text style={highlightText}>
                💡 While you wait, feel free to explore our AI solutions and 
                see how we&apos;ve helped businesses across Africa achieve digital 
                transformation.
              </Text>
            </Section>

            <Text style={paragraph}>
              If you have any urgent questions, don&apos;t hesitate to reach out directly:
            </Text>

            <Section style={contactBox}>
              <Text style={contactItem}>📧 hello@cosmobits.tech</Text>
              <Text style={contactItem}>📞 +254 700 000 000</Text>
              <Text style={contactItem}>📍 APA Arcade Level 1, Hurlingham, Nairobi</Text>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
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

const heading = {
  color: '#150F33',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
};

const paragraph = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 20px 0',
};

const highlightBox = {
  backgroundColor: '#f0e6f0',
  borderLeft: '4px solid #C496C4',
  padding: '16px 20px',
  margin: '24px 0',
  borderRadius: '0 8px 8px 0',
};

const highlightText = {
  color: '#150F33',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0',
};

const contactBox = {
  backgroundColor: '#f8f6fc',
  padding: '20px',
  borderRadius: '8px',
  margin: '20px 0',
};

const contactItem = {
  color: '#374151',
  fontSize: '14px',
  margin: '8px 0',
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
  fontSize: '14px',
};

const copyright = {
  color: '#9ca3af',
  fontSize: '12px',
  margin: '0',
};
