import { BOOKING } from '@/lib/contact';

type Props = {
  className?: string;
  onClick?: () => void;
};

/** The one primary action, "Book a consultation" (spec 8.3). */
export default function BookingLink({ className = 'cb-btn', onClick }: Props) {
  if (BOOKING.external) {
    return (
      <a href={BOOKING.href} target="_blank" rel="noopener" className={className} onClick={onClick}>
        Book a consultation
        <span className="cb-sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <a href={BOOKING.href} className={className} onClick={onClick}>
      Book a consultation
    </a>
  );
}
