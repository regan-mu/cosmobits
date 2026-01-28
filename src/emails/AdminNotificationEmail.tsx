import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Button,
} from '@react-email/components';

interface AdminNotificationEmailProps {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  message: string;
  submittedAt: string;
}

export default function AdminNotificationEmail({
  name,
  email,
  company,
  phone,
  service,
  message,
  submittedAt,
}: AdminNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Contact: {service} - {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={headerBadge}>🔔 NEW INQUIRY</Text>
            <Heading style={headerTitle}>{service}</Heading>
            <Text style={headerSubtitle}>from {name}</Text>
          </Section>

          {/* Priority Banner */}
          <Section style={priorityBanner}>
            <Text style={priorityText}>
              ⏰ Submitted on {submittedAt} • Respond within 24 hours
            </Text>
          </Section>

          {/* Contact Details */}
          <Section style={content}>
            <Heading style={sectionHeading}>Contact Details</Heading>
            
            <Section style={detailsGrid}>
              <Section style={detailRow}>
                <Text style={detailLabel}>👤 Name</Text>
                <Text style={detailValue}>{name}</Text>
              </Section>
              
              <Section style={detailRow}>
                <Text style={detailLabel}>📧 Email</Text>
                <Text style={detailValue}>{email}</Text>
              </Section>
              
              {company && (
                <Section style={detailRow}>
                  <Text style={detailLabel}>🏢 Company</Text>
                  <Text style={detailValue}>{company}</Text>
                </Section>
              )}
              
              {phone && (
                <Section style={detailRow}>
                  <Text style={detailLabel}>📞 Phone</Text>
                  <Text style={detailValue}>{phone}</Text>
                </Section>
              )}
              
              <Section style={detailRow}>
                <Text style={detailLabel}>🎯 Service</Text>
                <Text style={detailValue}>{service}</Text>
              </Section>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Message */}
          <Section style={content}>
            <Heading style={sectionHeading}>Message</Heading>
            <Section style={messageBox}>
              <Text style={messageText}>{message}</Text>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Quick Actions */}
          <Section style={actionsSection}>
            <Heading style={sectionHeading}>Quick Actions</Heading>
            <Section style={buttonGroup}>
              <Button style={primaryButton} href={`mailto:${email}?subject=Re: Your inquiry about ${service} - CosmoBits Technologies`}>
                Reply to {name}
              </Button>
              <Button style={secondaryButton} href={`tel:${phone || ''}`}>
                Call {phone ? 'Now' : 'N/A'}
              </Button>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              This email was sent from the CosmoBits website contact form.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#1a1a2e',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: '20px',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  maxWidth: '600px',
  borderRadius: '12px',
  overflow: 'hidden' as const,
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
};

const header = {
  backgroundColor: '#150F33',
  padding: '30px 40px',
  textAlign: 'center' as const,
};

const headerBadge = {
  backgroundColor: '#A855F7',
  color: '#ffffff',
  fontSize: '11px',
  fontWeight: 'bold',
  padding: '6px 12px',
  borderRadius: '20px',
  display: 'inline-block',
  margin: '0 0 12px 0',
  letterSpacing: '1px',
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
};

const headerSubtitle = {
  color: '#C496C4',
  fontSize: '16px',
  margin: '0',
};

const priorityBanner = {
  backgroundColor: '#fef3c7',
  padding: '12px 20px',
  borderLeft: '4px solid #f59e0b',
};

const priorityText = {
  color: '#92400e',
  fontSize: '13px',
  fontWeight: '500',
  margin: '0',
};

const content = {
  padding: '30px 40px',
};

const sectionHeading = {
  color: '#150F33',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
};

const detailsGrid = {
  backgroundColor: '#f8f6fc',
  borderRadius: '8px',
  padding: '20px',
};

const detailRow = {
  marginBottom: '12px',
};

const detailLabel = {
  color: '#6b7280',
  fontSize: '12px',
  margin: '0 0 4px 0',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const detailValue = {
  color: '#150F33',
  fontSize: '16px',
  fontWeight: '500',
  margin: '0',
};

const divider = {
  borderColor: '#e6ebf1',
  margin: '0',
};

const messageBox = {
  backgroundColor: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '20px',
};

const messageText = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const actionsSection = {
  padding: '30px 40px',
  backgroundColor: '#f8f6fc',
};

const buttonGroup = {
  textAlign: 'center' as const,
};

const primaryButton = {
  backgroundColor: '#A855F7',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 'bold',
  padding: '14px 28px',
  borderRadius: '8px',
  textDecoration: 'none',
  display: 'inline-block',
  marginRight: '12px',
  marginBottom: '12px',
};

const secondaryButton = {
  backgroundColor: '#150F33',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 'bold',
  padding: '14px 28px',
  borderRadius: '8px',
  textDecoration: 'none',
  display: 'inline-block',
  marginBottom: '12px',
};

const footer = {
  padding: '20px 40px',
  textAlign: 'center' as const,
  backgroundColor: '#f3f4f6',
};

const footerText = {
  color: '#9ca3af',
  fontSize: '12px',
  margin: '0',
};
