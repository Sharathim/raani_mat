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
  UserCheck,
  User,
  Heart,
  CheckCircle2
} from 'lucide-react';

export function AdminDashboardPage() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load registrations from Firestore/Storage
  const loadData = async () => {
    setError(null);

    try {
      const list = await getRegistrations();
      setRegistrations(list || []);
    } catch (err) {
      console.error('Failed to load registrations:', err);
      setError(err.message || 'Failed to load registration statistics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute Statistics
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

    const newProfiles = registrations.filter((r) => !r.status || r.status === REGISTRATION_STATUS.NEW).length;
    const reviewed = registrations.filter((r) => r.status === REGISTRATION_STATUS.REVIEWED).length;
    const groom = registrations.filter((r) => r.gender === 'Male').length;
    const bride = registrations.filter((r) => r.gender === 'Female').length;
    const completed = registrations.filter((r) => r.status === REGISTRATION_STATUS.COMPLETED).length;

    return {
      total,
      todayCount,
      newProfiles,
      reviewed,
      groom,
      bride,
      completed
    };
  }, [registrations]);

  return (
    <AdminLayout>
      <div className="container">
        {/* Error Notification */}
        <ErrorBanner message={error} onDismiss={() => setError(null)} />

        {loading ? (
          <div className="admin-loading-container">
            <LoadingSpinner text="Loading dashboard metrics..." fullPage={false} />
          </div>
        ) : (
          /* Statistics Cards Grid */
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
              count={stats.newProfiles}
              icon={Clock}
              color="#1d4ed8"
              subtitle="Pending Review"
            />
            <StatsCard
              title="Reviewed Profiles"
              count={stats.reviewed}
              icon={UserCheck}
              color="#b45309"
              subtitle="Active Profiles"
            />
            <StatsCard
              title="Completed Profiles"
              count={stats.completed}
              icon={CheckCircle2}
              color="var(--success)"
              subtitle="Completed"
            />
            <StatsCard
              title="Groom"
              count={stats.groom}
              icon={User}
              color="#0284c7"
              subtitle="Male Profile"
            />
            <StatsCard
              title="Bride"
              count={stats.bride}
              icon={Heart}
              color="#db2777"
              subtitle="Female Profile"
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
