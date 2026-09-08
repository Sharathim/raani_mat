import React, { useState, useEffect, useMemo } from 'react';
import { AdminLayout } from '../components/admin/AdminLayout';
import { StatsCard } from '../components/admin/StatsCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { getRegistrations } from '../services/registrationService';
import { REGISTRATION_STATUS } from '../utils/constants';
import {
  Users,
  Calendar,
  Clock,
  HeartHandshake,
  Camera
} from 'lucide-react';

export function AdminDashboardPage() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load registrations from Firestore/Storage
  const loadData = async (showRefreshSpinner = false) => {
    if (showRefreshSpinner) setIsRefreshing(true);
    setError(null);

    try {
      const list = await getRegistrations();
      setRegistrations(list || []);
    } catch (err) {
      console.error('Failed to load registrations:', err);
      setError(err.message || 'Failed to load registration statistics.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute Real Statistics
  const stats = useMemo(() => {
    const total = registrations.length;
    const today = new Date().toISOString().split('T')[0];

    const todayCount = registrations.filter((r) => {
      if (!r.createdAt) return false;
      const createdDate = typeof r.createdAt === 'string'
        ? r.createdAt.split('T')[0]
        : r.createdAt.toDate ? r.createdAt.toDate().toISOString().split('T')[0] : '';
      return createdDate === today;
    }).length;

    const pending = registrations.filter((r) => !r.status || r.status === REGISTRATION_STATUS.NEW).length;
    const contacted = registrations.filter((r) => r.status === REGISTRATION_STATUS.CONTACTED).length;
    const shortlisted = registrations.filter((r) => r.status === REGISTRATION_STATUS.SHORTLISTED).length;
    const withPhotos = registrations.filter((r) => Boolean(r.photoUrl)).length;

    return {
      total,
      todayCount,
      pending,
      contacted,
      shortlisted,
      withPhotos
    };
  }, [registrations]);

  return (
    <AdminLayout
      onRefresh={() => loadData(true)}
      isRefreshing={isRefreshing}
    >
      <div className="container">
        {/* Error Notification */}
        <ErrorBanner message={error} onDismiss={() => setError(null)} />

        {loading ? (
          <div className="admin-loading-container">
            <LoadingSpinner text="Loading dashboard metrics..." fullPage={false} />
          </div>
        ) : (
          /* Statistics Cards Grid ONLY - NO CANDIDATE LIST, NO SEARCH, NO FAB */
          <div className="admin-metrics-grid">
            <StatsCard
              title="Total Profiles"
              count={stats.total}
              icon={Users}
              color="var(--maroon-900)"
              highlight={true}
              subtitle="All Registered"
            />
            <StatsCard
              title="Registered Today"
              count={stats.todayCount}
              icon={Calendar}
              color="var(--gold-800)"
              subtitle="Today"
            />
            <StatsCard
              title="New Profiles"
              count={stats.pending}
              icon={Clock}
              color="#1d4ed8"
              subtitle="Pending Review"
            />
            <StatsCard
              title="Shortlisted"
              count={stats.shortlisted}
              icon={HeartHandshake}
              color="#7e22ce"
              subtitle="In Active Process"
            />
            <StatsCard
              title="With Photos"
              count={stats.withPhotos}
              icon={Camera}
              color="var(--success)"
              subtitle={`${stats.total ? Math.round((stats.withPhotos / stats.total) * 100) : 0}% of Total`}
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
