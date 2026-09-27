'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

/**
 * reCAPTCHA v3 for the contact form only, so Google's script loads on the
 * page that has the form rather than on every page.
 */
export default function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      scriptProps={{ async: true, defer: true, appendTo: 'head' }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
