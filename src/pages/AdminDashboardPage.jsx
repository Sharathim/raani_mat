import React, { useState, useEffect, useMemo } from 'react';
import { AdminHeader } from '../components/admin/AdminHeader';
import { StatsCard } from '../components/admin/StatsCard';
import { SearchBar } from '../components/admin/SearchBar';
import { FilterBar } from '../components/admin/FilterBar';
import { RegistrationTable } from '../components/admin/RegistrationTable';
import { AdminProfileDrawer } from '../components/admin/AdminProfileDrawer';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { EmptyState } from '../components/common/EmptyState';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import {
  getRegistrations,
  updateRegistrationStatus,
  deleteRegistration
} from '../services/registrationService';
import { REGISTRATION_STATUS } from '../utils/constants';
import {
  Users,
  Calendar,
  Clock,
  HeartHandshake,
  Camera,
  Download,
  PlusCircle,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminDashboardPage() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Search, Filter & Sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [photoFilter, setPhotoFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Drawer Profile Preview
  const [selectedDrawerProfile, setSelectedDrawerProfile] = useState(null);

  // Deletion Modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load registrations from Firestore
  const loadData = async (showRefreshSpinner = false) => {
    if (showRefreshSpinner) setIsRefreshing(true);
    setError(null);

    try {
      const list = await getRegistrations();
      setRegistrations(list || []);
    } catch (err) {
      console.error('Failed to load registrations:', err);
      setError(err.message || 'Failed to load registration records.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle Status Update
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateRegistrationStatus(id, newStatus);
      // Update local state optimistically
      setRegistrations((prev) =>
        prev.map((reg) => (reg.id === id || reg.registrationId === id ? { ...reg, status: newStatus } : reg))
      );
      if (selectedDrawerProfile && (selectedDrawerProfile.id === id || selectedDrawerProfile.registrationId === id)) {
        setSelectedDrawerProfile((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      setError(err.message || 'Failed to update profile status.');
    }
  };

  // Handle Delete Confirmation
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      await deleteRegistration(deleteTarget.id || deleteTarget.registrationId);
      setRegistrations((prev) => prev.filter((r) => r.id !== deleteTarget.id && r.registrationId !== deleteTarget.id));
      if (selectedDrawerProfile && (selectedDrawerProfile.id === deleteTarget.id || selectedDrawerProfile.registrationId === deleteTarget.id)) {
        setSelectedDrawerProfile(null);
      }
      setDeleteTarget(null);
    } catch (err) {
      console.error('Failed to delete registration:', err);
      setError(err.message || 'Failed to delete profile record.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Compute Summary Statistics
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

  // Filtered & Sorted Registrations
  const filteredRegistrations = useMemo(() => {
    return registrations
      .filter((reg) => {
        // Search term matching (Name, Phone, Location, Occupation, ID)
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase().trim();
          const matchName = (reg.name || '').toLowerCase().includes(q);
          const matchPhone = (reg.phone || '').includes(q);
          const matchLocation = (reg.location || '').toLowerCase().includes(q);
          const matchOccupation = (reg.occupation || '').toLowerCase().includes(q);
          const matchId = (reg.registrationId || reg.id || '').toLowerCase().includes(q);

          if (!matchName && !matchPhone && !matchLocation && !matchOccupation && !matchId) {
            return false;
          }
        }

        // Status Filter
        if (statusFilter !== 'all') {
          if ((reg.status || REGISTRATION_STATUS.NEW) !== statusFilter) {
            return false;
          }
        }

        // Gender Filter
        if (genderFilter !== 'all') {
          if (reg.gender !== genderFilter) {
            return false;
          }
        }

        // Photo Filter
        if (photoFilter === 'withPhoto' && !reg.photoUrl) return false;
        if (photoFilter === 'noPhoto' && reg.photoUrl) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
          return dateB - dateA;
        }
        if (sortBy === 'oldest') {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
          return dateA - dateB;
        }
        if (sortBy === 'nameAsc') {
          return (a.name || '').localeCompare(b.name || '');
        }
        if (sortBy === 'nameDesc') {
          return (b.name || '').localeCompare(a.name || '');
        }
        return 0;
      });
  }, [registrations, searchTerm, statusFilter, genderFilter, photoFilter, sortBy]);

  // Export Filtered Registrations as CSV
  const handleExportCSV = () => {
    if (!filteredRegistrations.length) return;

    const headers = [
      'Registration ID',
      'Name',
      'Profile For',
      'Gender',
      'Age',
      'DOB',
      'Marital Status',
      'Phone',
      'Email',
      'Father Name',
      'Mother Name',
      'Siblings',
      'Birth Star',
      'Zodiac',
      'Lagnam',
      'Height',
      'Education',
      'Occupation',
      'Income',
      'Caste & Religion',
      'Location',
      'Native Place',
      'Status',
      'Expectations'
    ];

    const rows = filteredRegistrations.map((r) => [
      `"${r.registrationId || r.id || ''}"`,
      `"${(r.name || '').replace(/"/g, '""')}"`,
      `"${r.profileFor || ''}"`,
      `"${r.gender || ''}"`,
      `"${r.age || ''}"`,
      `"${r.dateOfBirth || ''}"`,
      `"${r.maritalStatus || ''}"`,
      `"${r.phone || ''}"`,
      `"${r.email || ''}"`,
      `"${(r.fatherName || '').replace(/"/g, '""')}"`,
      `"${(r.motherName || '').replace(/"/g, '""')}"`,
      `"${(r.siblings || '').replace(/"/g, '""')}"`,
      `"${r.birthStar || ''}"`,
      `"${r.zodiacSign || ''}"`,
      `"${r.lagnam || ''}"`,
      `"${r.height || ''}"`,
      `"${(r.education || '').replace(/"/g, '""')}"`,
      `"${(r.occupation || '').replace(/"/g, '""')}"`,
      `"${r.income || ''}"`,
      `"${(r.casteReligion || '').replace(/"/g, '""')}"`,
      `"${(r.location || '').replace(/"/g, '""')}"`,
      `"${(r.nativePlace || '').replace(/"/g, '""')}"`,
      `"${r.status || ''}"`,
      `"${(r.expectation || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Rani_Matrimony_Profiles_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ErrorBoundary>
      <div className="admin-dashboard" style={{ minHeight: '100vh', backgroundColor: 'var(--saas-bg)', display: 'flex', flexDirection: 'column' }}>
        <AdminHeader onRefresh={() => loadData(true)} isRefreshing={isRefreshing} />

        <main className="admin-main" style={{ flex: 1, padding: '1.75rem 1.25rem 3.5rem' }}>
          <div className="container">
            {/* Dashboard Title & Actions Bar */}
            <div
              className="admin-titlebar"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}
            >
              <div>
                <h1 style={{ fontSize: '1.5rem', color: 'var(--saas-text-primary)', margin: 0, fontWeight: 800 }}>
                  Candidate Registrations
                </h1>
                <p style={{ color: 'var(--saas-text-muted)', fontSize: '0.85rem', margin: '0.2rem 0 0' }}>
                  Manage, search, filter, and review matrimonial applicant profiles.
                </p>
              </div>

              <div className="admin-title-actions" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  disabled={!filteredRegistrations.length}
                  className="btn btn-secondary btn-sm"
                  title="Export filtered registrations to CSV"
                >
                  <Download size={14} />
                  <span>Export CSV</span>
                </button>
                <Link to="/register" className="btn btn-primary btn-sm">
                  <PlusCircle size={14} />
                  <span>Add New Profile</span>
                </Link>
              </div>
            </div>

            {/* SaaS Metrics Stats Grid */}
            <div
              className="admin-stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                gap: '0.85rem',
                marginBottom: '1.5rem'
              }}
            >
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

            {/* Error Notification */}
            <ErrorBanner message={error} onDismiss={() => setError(null)} />

            {/* Search & Filter Controls */}
            <div className="admin-filters" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
              <div className="admin-search-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                />
                <div style={{ fontSize: '0.8rem', color: 'var(--saas-text-muted)' }}>
                  Showing <strong style={{ color: 'var(--saas-text-primary)' }}>{filteredRegistrations.length}</strong> of {registrations.length} candidates
                </div>
              </div>

              <FilterBar
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                genderFilter={genderFilter}
                onGenderChange={setGenderFilter}
                photoFilter={photoFilter}
                onPhotoChange={setPhotoFilter}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>

            {/* Table / Content Area */}
            {loading ? (
              <LoadingSpinner text="Loading registrations..." fullPage={false} />
            ) : filteredRegistrations.length > 0 ? (
              <RegistrationTable
                registrations={filteredRegistrations}
                onStatusChange={handleStatusChange}
                onDeleteClick={(target) => setDeleteTarget(target)}
                onRowClick={(reg) => setSelectedDrawerProfile(reg)}
              />
            ) : (
              <EmptyState
                titleTa=""
                titleEn={searchTerm || statusFilter !== 'all' ? 'No profiles match your search filters' : 'No candidate registrations yet'}
                description={
                  searchTerm || statusFilter !== 'all'
                    ? 'Try adjusting your search keywords or filter selections.'
                    : 'New profile submissions will automatically appear here.'
                }
                action={
                  (searchTerm || statusFilter !== 'all') && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('all');
                        setGenderFilter('all');
                        setPhotoFilter('all');
                      }}
                      className="btn btn-secondary btn-sm"
                    >
                      Reset All Filters
                    </button>
                  )
                }
              />
            )}
          </div>
        </main>

        {/* Slide-Over Profile Inspection Drawer */}
        <AdminProfileDrawer
          registration={selectedDrawerProfile}
          isOpen={Boolean(selectedDrawerProfile)}
          onClose={() => setSelectedDrawerProfile(null)}
          onStatusChange={handleStatusChange}
          onDeleteClick={(reg) => setDeleteTarget(reg)}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmDialog
          isOpen={Boolean(deleteTarget)}
          title="Delete Registration Profile"
          message={`Are you sure you want to permanently delete the profile for "${deleteTarget?.name || 'this candidate'}" (ID: ${deleteTarget?.registrationId || deleteTarget?.id})? This action cannot be undone.`}
          confirmText="Delete Permanently"
          cancelText="Cancel"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
          isLoading={isDeleting}
          isDestructive={true}
        />
      </div>
    </ErrorBoundary>
  );
}
