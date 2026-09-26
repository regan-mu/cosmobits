import { CONTACT, TAGLINE } from '@/lib/contact';

const URL = 'https://www.cosmobits.tech';

/**
 * Organization + ProfessionalService JSON-LD (spec 9.3). `sameAs` lists only
 * the social profiles set in CONTACT.social; areaServed only what's confirmed.
 */
export default function StructuredData() {
  const sameAs = Object.values(CONTACT.social).filter(Boolean);
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${URL}/#org`,
        name: 'CosmoBits Technologies',
        alternateName: 'CosmoBits',
        url: URL,
        logo: `${URL}/cosmobits-technologies-logo.png`,
        slogan: TAGLINE,
        email: CONTACT.email,
        telephone: CONTACT.phoneE164,
        ...(sameAs.length ? { sameAs } : null),
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${URL}/#business`,
        name: 'CosmoBits Technologies',
        parentOrganization: { '@id': `${URL}/#org` },
        url: URL,
        image: `${URL}/og-image.png`,
        telephone: CONTACT.phoneE164,
        email: CONTACT.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: CONTACT.address.line1,
          addressLocality: `${CONTACT.address.area}, ${CONTACT.address.city}`,
          addressCountry: 'KE',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '18:00',
          },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '13:00' },
        ],
        areaServed: ['KE'],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
