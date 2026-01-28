// Shared types for admin lead management

export interface StatusHistory {
  id: string;
  status: string;
  comment: string | null;
  emailSubject: string | null;
  emailBody: string | null;
  updatedBy: string | null;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  service: string;
  message: string;
  emailSent: boolean;
  currentStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadWithHistory extends Lead {
  statusHistory: StatusHistory[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const statusLabels: Record<string, string> = {
  POTENTIAL_LEAD: 'Potential Lead',
  FOLLOW_UP_EMAIL_SENT: 'Follow Up Sent',
  DISCOVERY_CALL_BOOKED: 'Discovery Call',
  SUCCESSFUL_CLOSURE: 'Successful',
  FAILED_CLOSURE: 'Failed',
};
