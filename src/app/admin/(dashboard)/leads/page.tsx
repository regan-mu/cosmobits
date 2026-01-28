'use client';

import { useCallback, useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import LeadsTable from './LeadsTable';
import LeadDrawer from './LeadDrawer';
import type { Lead, LeadWithHistory, Pagination } from './types';
import { statusLabels } from './types';

function LeadsContent() {
  const searchParams = useSearchParams();
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const [selectedLead, setSelectedLead] = useState<LeadWithHistory | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', pagination.page.toString());
      params.set('limit', pagination.limit.toString());
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);

      const response = await fetch(`/api/admin/leads?${params}`);
      const data = await response.json();
      
      setLeads(data.leads || []);
      setPagination(data.pagination || pagination);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, search, statusFilter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value === 'all' ? '' : value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleLeadClick = async (lead: Lead) => {
    try {
      const response = await fetch(`/api/admin/leads/${lead.id}`);
      const fullLead = await response.json();
      setSelectedLead(fullLead);
      setDrawerOpen(true);
    } catch (error) {
      console.error('Failed to fetch lead details:', error);
    }
  };

  const handleLeadUpdate = () => {
    fetchLeads();
    // Refresh the selected lead
    if (selectedLead) {
      handleLeadClick(selectedLead);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('');
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const hasFilters = search || statusFilter;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 
            className="text-2xl font-bold text-primary-dark"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Leads
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and track your potential customers
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {pagination.total} total leads
        </div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name, email, company..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter || 'all'} onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2 text-gray-400" />
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {Object.entries(statusLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <LeadsTable
          leads={leads}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
          onLeadClick={handleLeadClick}
          statusLabels={statusLabels}
        />
      </motion.div>

      {/* Lead Drawer */}
      <LeadDrawer
        lead={selectedLead}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedLead(null);
        }}
        onUpdate={handleLeadUpdate}
        statusLabels={statusLabels}
      />
    </div>
  );
}

export default function LeadsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <LeadsContent />
    </Suspense>
  );
}
