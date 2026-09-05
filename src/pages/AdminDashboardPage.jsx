import React, { useState, useEffect, useMemo } from 'react';
import { AdminHeader } from '../components/admin/AdminHeader';
import { StatsCard } from '../components/admin/StatsCard';
import { SearchBar } from '../components/admin/SearchBar';
import { FilterBar } from '../components/admin/FilterBar';
import { RegistrationTable } from '../components/admin/RegistrationTable';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { EmptyState } from '../components/common/EmptyState';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
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
  PlusCircle
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

  // Deletion Modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load registrations from Firestore
  const loadData = async (showRefreshSpinner = false) => {
    if (showRefreshSpinner) setIsRefreshing(true);
    setError(null);

    try {
      const list = await getRegistrations();
      setRegistrations(list);
    } catch (err) {
      console.error('Failed to load registrations:', err);
      setError(err.message || 'பதிவுகளை ஏற்றுவதில் பிழை ஏற்பட்டது.');
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
        prev.map((reg) => (reg.id === id ? { ...reg, status: newStatus } : reg))
      );
    } catch (err) {
      console.error('Failed to update status:', err);
      setError(err.message || 'நிலையை மாற்றுவதில் பிழை ஏற்பட்டது.');
    }
  };

  // Handle Delete Confirmation
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      await deleteRegistration(deleteTarget.id);
      setRegistrations((prev) => prev.filter((r) => r.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error('Failed to delete registration:', err);
      setError(err.message || 'பதிவை நீக்குவதில் பிழை ஏற்பட்டது.');
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
          const matchName = reg.name?.toLowerCase().includes(q);
          const matchPhone = reg.phone?.includes(q);
          const matchLocation = reg.location?.toLowerCase().includes(q);
          const matchOccupation = reg.occupation?.toLowerCase().includes(q);
          const matchId = (reg.registrationId || reg.id)?.toLowerCase().includes(q);

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
    link.setAttribute('download', `Rani_Matrimony_Registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--ivory)', display: 'flex', flexDirection: 'column' }}>
      <AdminHeader onRefresh={() => loadData(true)} isRefreshing={isRefreshing} />

      <main style={{ flex: 1, padding: '2rem 1.25rem 4rem' }}>
        <div className="container">
          {/* Dashboard Header Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
            <div>
              <h2 className="font-tamil-serif" style={{ fontSize: '1.6rem', color: 'var(--maroon-950)', margin: 0 }}>
                மணமக்கள் பதிவுகள் நிர்வாகம்
              </h2>
              <div style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>
                Manage, search, filter, and process all matrimonial registrations.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={handleExportCSV}
                disabled={!filteredRegistrations.length}
                className="btn btn-secondary btn-sm"
                title="Export list to CSV spreadsheet"
              >
                <Download size={16} />
                <span>CSV பதிவிறக்கம் (Export CSV)</span>
              </button>
              <Link to="/register" className="btn btn-primary btn-sm">
                <PlusCircle size={16} />
                <span>புதிய பதிவு சேர்க்க (New Profile)</span>
              </Link>
            </div>
          </div>

          {/* Stats Overview Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}
          >
            <StatsCard
              titleTa="மொத்த பதிவுகள்"
              titleEn="Total Profiles"
              count={stats.total}
              icon={Users}
              color="var(--maroon-900)"
              highlight={true}
            />
            <StatsCard
              titleTa="இன்றைய பதிவுகள்"
              titleEn="Registered Today"
              count={stats.todayCount}
              icon={Calendar}
              color="var(--gold-800)"
            />
            <StatsCard
              titleTa="புதிய பதிவுகள்"
              titleEn="Pending / New"
              count={stats.pending}
              icon={Clock}
              color="#175cd3"
            />
            <StatsCard
              titleTa="பரிசீலனையில்"
              titleEn="Shortlisted / In Review"
              count={stats.shortlisted}
              icon={HeartHandshake}
              color="#6927da"
            />
            <StatsCard
              titleTa="புகைப்படம் உள்ளவை"
              titleEn="With Photos"
              count={stats.withPhotos}
              icon={Camera}
              color="var(--success)"
            />
          </div>

          {/* Error Banner */}
          <ErrorBanner message={error} onDismiss={() => setError(null)} />

          {/* Search & Filter Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600 }}>
                காட்டப்படும் பதிவுகள்: <span style={{ color: 'var(--maroon-900)' }}>{filteredRegistrations.length}</span> / {registrations.length}
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
            <LoadingSpinner text="பதிவுகளை ஏற்றுகிறது... (Loading registrations...)" fullPage={false} />
          ) : filteredRegistrations.length > 0 ? (
            <RegistrationTable
              registrations={filteredRegistrations}
              onStatusChange={handleStatusChange}
              onDeleteClick={(target) => setDeleteTarget(target)}
            />
          ) : (
            <EmptyState
              titleTa={searchTerm || statusFilter !== 'all' ? 'பொருத்தமான பதிவுகள் எதுவும் இல்லை' : 'பதிவுகள் எதுவும் பதிவு செய்யப்படவில்லை'}
              titleEn={searchTerm || statusFilter !== 'all' ? 'No profiles match your search filters' : 'No registrations submitted yet'}
              description={
                searchTerm || statusFilter !== 'all'
                  ? 'தேடல் சொல் அல்லது வடிகட்டிகளை மாற்றி மீண்டும் முயற்சிக்கவும்.'
                  : 'புதிய மணமக்கள் பதிவு செய்ததும் இங்கே தோன்றும்.'
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
                    அனைத்து வடிகட்டிகளையும் நீக்கு (Reset Filters)
                  </button>
                )
              }
            />
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="பதிவை நீக்கவா? (Delete Registration)"
        message={`"${deleteTarget?.name}" (ID: ${deleteTarget?.registrationId || deleteTarget?.id}) என்ற மணமக்களின் சுயவிவரத்தை நிரந்தரமாக நீக்க விரும்புகிறீர்களா? இந்த செயலை மாற்றியமைக்க முடியாது.`}
        confirmText="நிரந்தரமாக நீக்கு (Delete Permanently)"
        cancelText="ரத்து செய் (Cancel)"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
        isDestructive={true}
      />
    </div>
  );
}
