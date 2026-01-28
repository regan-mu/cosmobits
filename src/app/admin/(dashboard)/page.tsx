'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  UserCheck,
  PhoneCall,
  TrendingUp,
  TrendingDown,
  Clock,
} from 'lucide-react';
import { LeadStatus } from '@/generated/prisma/enums';

interface Stats {
  total: number;
  byStatus: Record<string, number>;
}

const statusConfig: Record<string, { label: string; icon: any; color: string }> = {
  [LeadStatus.POTENTIAL_LEAD]: {
    label: 'Potential Leads',
    icon: Users,
    color: 'bg-blue-500',
  },
  [LeadStatus.FOLLOW_UP_EMAIL_SENT]: {
    label: 'Follow Up Sent',
    icon: Clock,
    color: 'bg-yellow-500',
  },
  [LeadStatus.DISCOVERY_CALL_BOOKED]: {
    label: 'Calls Booked',
    icon: PhoneCall,
    color: 'bg-purple-500',
  },
  [LeadStatus.SUCCESSFUL_CLOSURE]: {
    label: 'Successful',
    icon: TrendingUp,
    color: 'bg-green-500',
  },
  [LeadStatus.FAILED_CLOSURE]: {
    label: 'Failed',
    icon: TrendingDown,
    color: 'bg-red-500',
  },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/admin/leads?limit=1000');
        const data = await response.json();
        
        const byStatus: Record<string, number> = {};
        Object.values(LeadStatus).forEach((status) => {
          byStatus[status] = 0;
        });
        
        data.leads?.forEach((lead: any) => {
          byStatus[lead.currentStatus] = (byStatus[lead.currentStatus] || 0) + 1;
        });
        
        setStats({
          total: data.pagination?.total || 0,
          byStatus,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const conversionRate = stats
    ? stats.total > 0
      ? ((stats.byStatus[LeadStatus.SUCCESSFUL_CLOSURE] / stats.total) * 100).toFixed(1)
      : '0'
    : '0';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 
          className="text-2xl font-bold text-primary-dark"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of your leads and conversion metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Leads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Leads</p>
              <p className="text-3xl font-bold text-primary-dark mt-1">
                {loading ? '...' : stats?.total || 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
          </div>
        </motion.div>

        {/* Conversion Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <p className="text-3xl font-bold text-primary-dark mt-1">
                {loading ? '...' : `${conversionRate}%`}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        {/* Pending Follow-ups */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Awaiting Follow-up</p>
              <p className="text-3xl font-bold text-primary-dark mt-1">
                {loading ? '...' : stats?.byStatus[LeadStatus.POTENTIAL_LEAD] || 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Status Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h2 
          className="text-lg font-semibold text-primary-dark mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Pipeline Overview
        </h2>
        
        <div className="space-y-4">
          {Object.entries(statusConfig).map(([status, config]) => {
            const count = stats?.byStatus[status] || 0;
            const percentage = stats?.total ? (count / stats.total) * 100 : 0;
            
            return (
              <div key={status} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg ${config.color}/10 flex items-center justify-center shrink-0`}>
                  <config.icon className={`w-5 h-5 ${config.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {config.label}
                    </span>
                    <span className="text-sm text-gray-500">
                      {loading ? '...' : count}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className={`h-full ${config.color} rounded-full`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-linear-to-br from-primary-dark to-primary-light rounded-2xl p-6 text-white"
      >
        <h2 
          className="text-lg font-semibold mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Quick Actions
        </h2>
        <p className="text-white/70 text-sm mb-4">
          Manage your leads efficiently
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/admin/leads"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
          >
            View All Leads
          </a>
          <a
            href="/admin/leads?status=POTENTIAL_LEAD"
            className="px-4 py-2 bg-accent hover:bg-accent-light rounded-lg text-sm font-medium transition-colors"
          >
            Follow Up Pending ({stats?.byStatus[LeadStatus.POTENTIAL_LEAD] || 0})
          </a>
        </div>
      </motion.div>
    </div>
  );
}
