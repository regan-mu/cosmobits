'use client';

import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ChevronRight, Mail, MailX, Building2 } from 'lucide-react';
import { LeadStatus } from '@/generated/prisma/enums';
import type { Lead, Pagination as PaginationData } from './types';

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
  pagination: PaginationData;
  onPageChange: (page: number) => void;
  onLeadClick: (lead: Lead) => void;
  statusLabels: Record<string, string>;
}

const statusColors: Record<string, string> = {
  [LeadStatus.POTENTIAL_LEAD]: 'bg-blue-100 text-blue-700 border-blue-200',
  [LeadStatus.FOLLOW_UP_EMAIL_SENT]: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  [LeadStatus.DISCOVERY_CALL_BOOKED]: 'bg-purple-100 text-purple-700 border-purple-200',
  [LeadStatus.SUCCESSFUL_CLOSURE]: 'bg-green-100 text-green-700 border-green-200',
  [LeadStatus.FAILED_CLOSURE]: 'bg-red-100 text-red-700 border-red-200',
};

export default function LeadsTable({
  leads,
  loading,
  pagination,
  onPageChange,
  onLeadClick,
  statusLabels,
}: LeadsTableProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a');
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">No leads found</h3>
        <p className="text-gray-500">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50">
            <TableHead className="font-semibold text-primary-dark">Contact</TableHead>
            <TableHead className="font-semibold text-primary-dark">Service</TableHead>
            <TableHead className="font-semibold text-primary-dark">Status</TableHead>
            <TableHead className="font-semibold text-primary-dark">Email</TableHead>
            <TableHead className="font-semibold text-primary-dark">Date</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow
              key={lead.id}
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => onLeadClick(lead)}
            >
              <TableCell>
                <div>
                  <p className="font-medium text-gray-900">{lead.name}</p>
                  <p className="text-sm text-gray-500">{lead.email}</p>
                  {lead.company && (
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3 h-3" />
                      {lead.company}
                    </p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-700">{lead.service}</span>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`${statusColors[lead.currentStatus]} border font-medium`}
                >
                  {statusLabels[lead.currentStatus]}
                </Badge>
              </TableCell>
              <TableCell>
                {lead.emailSent ? (
                  <span className="flex items-center gap-1.5 text-green-600 text-sm">
                    <Mail className="w-4 h-4" />
                    Sent
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                    <MailX className="w-4 h-4" />
                    Not sent
                  </span>
                )}
              </TableCell>
              <TableCell>
                <div>
                  <p className="text-sm text-gray-700">{formatDate(lead.createdAt)}</p>
                  <p className="text-xs text-gray-400">{formatTime(lead.createdAt)}</p>
                </div>
              </TableCell>
              <TableCell>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="border-t border-gray-100 px-4 py-3">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => onPageChange(Math.max(1, pagination.page - 1))}
                  className={pagination.page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  const current = pagination.page;
                  return page === 1 || page === pagination.totalPages || 
                    (page >= current - 1 && page <= current + 1);
                })
                .map((page, index, array) => {
                  const prevPage = array[index - 1];
                  const showEllipsis = prevPage && page - prevPage > 1;
                  
                  return (
                    <PaginationItem key={page}>
                      {showEllipsis && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                      <PaginationLink
                        onClick={() => onPageChange(page)}
                        isActive={page === pagination.page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => onPageChange(Math.min(pagination.totalPages, pagination.page + 1))}
                  className={pagination.page >= pagination.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
