'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Mail,
  Phone,
  Building2,
  Calendar,
  Send,
  Loader2,
  User,
  History,
  FileText,
  CheckCircle,
  Circle,
} from 'lucide-react';
import { LeadStatus } from '@/generated/prisma/enums';
import type { LeadWithHistory } from './types';

// Dynamic import for rich text editor to avoid SSR issues
const RichTextEditor = dynamic(
  () => import('@/components/editor/RichTextEditor'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-50 rounded-lg border border-gray-200 bg-gray-50 animate-pulse" />
    ),
  }
);

interface LeadDrawerProps {
  lead: LeadWithHistory | null;
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
  statusLabels: Record<string, string>;
}

const statusColors: Record<string, string> = {
  [LeadStatus.POTENTIAL_LEAD]: 'bg-blue-500',
  [LeadStatus.FOLLOW_UP_EMAIL_SENT]: 'bg-yellow-500',
  [LeadStatus.DISCOVERY_CALL_BOOKED]: 'bg-purple-500',
  [LeadStatus.SUCCESSFUL_CLOSURE]: 'bg-green-500',
  [LeadStatus.FAILED_CLOSURE]: 'bg-red-500',
};

const statusOrder: string[] = [
  LeadStatus.POTENTIAL_LEAD,
  LeadStatus.FOLLOW_UP_EMAIL_SENT,
  LeadStatus.DISCOVERY_CALL_BOOKED,
  LeadStatus.SUCCESSFUL_CLOSURE,
];

export default function LeadDrawer({
  lead,
  open,
  onClose,
  onUpdate,
  statusLabels,
}: LeadDrawerProps) {
  const [activeTab, setActiveTab] = useState('details');
  const [newStatus, setNewStatus] = useState('');
  const [statusComment, setStatusComment] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  
  const toggleCardExpansion = (id: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  
  // Check if text is longer than 2 lines (approximately 120 characters)
  const isTextLong = (text: string | null) => {
    if (!text) return false;
    return text.length > 120 || text.split('\n').length > 2;
  };

  if (!lead) return null;

  const handleStatusUpdate = async () => {
    if (!newStatus) {
      toast.error('Please select a status');
      return;
    }

    setUpdatingStatus(true);
    try {
      const response = await fetch(`/api/admin/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          comment: statusComment || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      toast.success('Status updated successfully');
      setNewStatus('');
      setStatusComment('');
      onUpdate();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleSendEmail = async () => {
    if (!emailSubject || !emailMessage) {
      toast.error('Please fill in subject and message');
      return;
    }

    setSendingEmail(true);
    try {
      const response = await fetch(`/api/admin/leads/${lead.id}/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: emailSubject,
          message: emailMessage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      toast.success('Email sent successfully');
      setEmailSubject('');
      setEmailMessage('');
      onUpdate();
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email');
    } finally {
      setSendingEmail(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy 'at' h:mm a");
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl p-0 flex flex-col bg-white">
        <SheetHeader className="px-6 py-4 border-b bg-linear-to-r from-primary-dark to-primary-light">
          <SheetTitle className="text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <User className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-semibold">{lead.name}</p>
              <p className="text-sm text-white/70 font-normal">{lead.email}</p>
            </div>
          </SheetTitle>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-4 mx-6 mt-4">
            <TabsTrigger value="details" className="text-xs sm:text-sm">
              <FileText className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Details</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="text-xs sm:text-sm">
              <History className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Timeline</span>
            </TabsTrigger>
            <TabsTrigger value="status" className="text-xs sm:text-sm">
              <CheckCircle className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Status</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="text-xs sm:text-sm">
              <Mail className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Email</span>
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 px-6 py-4">
            {/* Details Tab */}
            <TabsContent value="details" className="mt-0 space-y-6">
              {/* Current Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Current Status</span>
                <Badge className={`${statusColors[lead.currentStatus]} text-white border-0`}>
                  {statusLabels[lead.currentStatus]}
                </Badge>
              </div>

              <Separator />

              {/* Contact Info */}
              <div className="space-y-4">
                <h4 className="font-semibold text-primary-dark">Contact Information</h4>
                
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${lead.email}`} className="text-accent hover:underline">
                      {lead.email}
                    </a>
                  </div>
                  
                  {lead.phone && (
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <a href={`tel:${lead.phone}`} className="text-gray-700 hover:text-accent">
                        {lead.phone}
                      </a>
                    </div>
                  )}
                  
                  {lead.company && (
                    <div className="flex items-center gap-3 text-sm">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{lead.company}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">
                      Submitted {formatDateTime(lead.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Service & Message */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary-dark mb-2">Service Interested</h4>
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                    {lead.service}
                  </Badge>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary-dark mb-2">Message</h4>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">
                    {lead.message}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="mt-0">
              <div className="space-y-1">
                {lead.statusHistory.map((entry, index) => {
                  const isExpanded = expandedCards.has(entry.id);
                  const hasLongComment = isTextLong(entry.comment);
                  const hasEmailBody = !!entry.emailBody;
                  const showExpandButton = hasLongComment || hasEmailBody;
                  
                  return (
                    <div key={entry.id} className="relative pl-6 pb-6">
                      {/* Line */}
                      {index < lead.statusHistory.length - 1 && (
                        <div className="absolute left-2.5 top-4 bottom-0 w-0.5 bg-gray-200" />
                      )}
                      
                      {/* Dot */}
                      <div className={`absolute left-0 top-1 w-5 h-5 rounded-full ${statusColors[entry.status]} flex items-center justify-center`}>
                        <Circle className="w-2 h-2 text-white fill-white" />
                      </div>
                      
                      {/* Content */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {statusLabels[entry.status]}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            {formatDateTime(entry.createdAt)}
                          </span>
                        </div>
                        
                        {entry.comment && (
                          <div className="text-sm text-gray-700">
                            {isExpanded || !hasLongComment ? (
                              <p className="whitespace-pre-wrap">{entry.comment}</p>
                            ) : (
                              <p className="line-clamp-2">{entry.comment}</p>
                            )}
                          </div>
                        )}
                        
                        {/* Email Content - only shown when expanded and email exists */}
                        {isExpanded && hasEmailBody && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="flex items-center gap-1.5 mb-2">
                              <Mail className="w-3.5 h-3.5 text-accent" />
                              <span className="text-xs font-medium text-accent">Email Sent</span>
                            </div>
                            {entry.emailSubject && (
                              <p className="text-xs font-medium text-gray-600 mb-1">
                                Subject: {entry.emailSubject}
                              </p>
                            )}
                            <div 
                              className="text-sm text-gray-600 prose prose-sm max-w-none bg-white rounded p-2 border border-gray-100"
                              dangerouslySetInnerHTML={{ __html: entry.emailBody || '' }}
                            />
                          </div>
                        )}
                        
                        {/* Expand/Collapse button */}
                        {showExpandButton && (
                          <button
                            onClick={() => toggleCardExpansion(entry.id)}
                            className="text-xs text-accent hover:text-accent/80 mt-2 font-medium transition-colors"
                          >
                            {isExpanded ? 'See less' : hasEmailBody ? 'See more (email sent)' : 'See more'}
                          </button>
                        )}
                        
                        {entry.updatedBy && (
                          <p className="text-xs text-gray-400 mt-2">
                            by {entry.updatedBy}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Status Update Tab */}
            <TabsContent value="status" className="mt-0 space-y-6">
              <div>
                <h4 className="font-semibold text-primary-dark mb-4">Update Lead Status</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      New Status
                    </label>
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(statusLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Comment (optional)
                    </label>
                    <Textarea
                      placeholder="Add a note about this status change..."
                      value={statusComment}
                      onChange={(e) => setStatusComment(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={handleStatusUpdate}
                    disabled={!newStatus || updatingStatus}
                    className="w-full bg-primary-dark hover:bg-primary-medium"
                  >
                    {updatingStatus ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Update Status
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Status Pipeline Visualization */}
              <div>
                <h4 className="font-semibold text-primary-dark mb-4">Pipeline Progress</h4>
                <div className="space-y-2">
                  {statusOrder.map((status, index) => {
                    const currentIndex = statusOrder.findIndex(s => s === lead.currentStatus);
                    const isCompleted = currentIndex >= 0 && currentIndex >= index;
                    const isCurrent = lead.currentStatus === status;
                    
                    return (
                      <div
                        key={status}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          isCurrent
                            ? 'bg-accent/10 border border-accent/30'
                            : isCompleted
                            ? 'bg-green-50'
                            : 'bg-gray-50'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            isCompleted ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4 text-white" />
                          ) : (
                            <Circle className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className={`text-sm ${isCurrent ? 'font-medium text-accent' : 'text-gray-600'}`}>
                          {statusLabels[status]}
                        </span>
                      </div>
                    );
                  })}
                  
                  {lead.currentStatus === LeadStatus.FAILED_CLOSURE && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
                      <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                        <Circle className="w-4 h-4 text-white fill-white" />
                      </div>
                      <span className="text-sm font-medium text-red-600">
                        {statusLabels[LeadStatus.FAILED_CLOSURE]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Email Tab */}
            <TabsContent value="email" className="mt-0 space-y-6">
              <div>
                <h4 className="font-semibold text-primary-dark mb-4">
                  Send Email to {lead.name}
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Subject
                    </label>
                    <Input
                      placeholder="Email subject..."
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Message
                    </label>
                    <RichTextEditor
                      value={emailMessage}
                      onChange={setEmailMessage}
                      placeholder="Write your message..."
                    />
                  </div>

                  <Button
                    onClick={handleSendEmail}
                    disabled={!emailSubject || !emailMessage || sendingEmail}
                    className="w-full bg-accent hover:bg-accent/90"
                  >
                    {sendingEmail ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Email
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500">
                  <strong>Note:</strong> Emails will be sent from{' '}
                  <span className="text-accent">hello@cosmobits.tech</span> and will be 
                  logged in the lead&apos;s timeline.
                </p>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
