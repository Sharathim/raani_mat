import React, { useState, useEffect, useMemo } from 'react';
import { AdminLayout } from '../components/admin/AdminLayout';
import { SearchBar } from '../components/admin/SearchBar';
import { CandidateFilterModal } from '../components/admin/CandidateFilterModal';
import { RegistrationTable } from '../components/admin/RegistrationTable';
import { AdminProfileDrawer } from '../components/admin/AdminProfileDrawer';
import { ShareCandidateModal } from '../components/admin/ShareCandidateModal';
import { FloatingAddButton } from '../components/admin/FloatingAddButton';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { EmptyState } from '../components/common/EmptyState';
import {
  getRegistrations,
  updateRegistrationStatus,
  deleteRegistration
} from '../services/registrationService';
import { REGISTRATION_STATUS } from '../utils/constants';

export function AdminCandidatesPage() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [photoFilter, setPhotoFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Drawer Profile Preview
  const [selectedDrawerProfile, setSelectedDrawerProfile] = useState(null);

  // WhatsApp Share Modal state
  const [shareTarget, setShareTarget] = useState(null);

  // Deletion Modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load registrations from Firestore/Storage
  const loadData = async (showRefreshSpinner = false) => {
    if (showRefreshSpinner) setIsRefreshing(true);
    setError(null);

    try {
      const list = await getRegistrations();
      setRegistrations(list || []);
    } catch (err) {
      console.error('Failed to load candidates:', err);
      setError(err.message || 'Failed to load candidate records.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle Status Change
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateRegistrationStatus(id, newStatus);
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

  // Handle Delete
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
      console.error('Failed to delete candidate:', err);
      setError(err.message || 'Failed to delete candidate record.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Active filter count (excluding default 'all')
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (statusFilter !== 'all') count++;
    if (genderFilter !== 'all') count++;
    if (photoFilter !== 'all') count++;
    if (sortBy !== 'newest') count++;
    return count;
  }, [statusFilter, genderFilter, photoFilter, sortBy]);

  // Filtered & Sorted Registrations
  const filteredRegistrations = useMemo(() => {
    return registrations
      .filter((reg) => {
        // Search term matching (Name, Phone, Location, Occupation, ID, Education)
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase().trim();
          const matchName = (reg.name || '').toLowerCase().includes(q);
          const matchPhone = (reg.phone || '').includes(q);
          const matchLocation = (reg.location || '').toLowerCase().includes(q);
          const matchOccupation = (reg.occupation || '').toLowerCase().includes(q);
          const matchEducation = (reg.education || '').toLowerCase().includes(q);
          const matchId = (reg.registrationId || reg.id || '').toLowerCase().includes(q);

          if (!matchName && !matchPhone && !matchLocation && !matchOccupation && !matchEducation && !matchId) {
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

  return (
    <AdminLayout
      onRefresh={() => loadData(true)}
      isRefreshing={isRefreshing}
    >
      <div className="container">
        {/* Error Notification */}
        <ErrorBanner message={error} onDismiss={() => setError(null)} />

        {/* 2. Full-Width Search Bar with Integrated Filter Icon */}
        <div className="admin-search-container" style={{ marginBottom: '0.65rem' }}>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onOpenFilter={() => setIsFilterModalOpen(true)}
            activeFilterCount={activeFilterCount}
            placeholder="Search candidates by name, phone, location..."
          />
        </div>

        {/* 3. Candidate Count & Status Information */}
        <div className="admin-candidate-info-bar">
          <div className="admin-count-indicator">
            Showing <strong className="admin-count-highlight">{filteredRegistrations.length}</strong> of {registrations.length} candidates
            {activeFilterCount > 0 && (
              <span className="admin-active-filters-pill">
                {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} applied
              </span>
            )}
          </div>

          {activeFilterCount > 0 && (
            <button
              type="button"
              className="admin-clear-filters-link"
              onClick={() => {
                setStatusFilter('all');
                setGenderFilter('all');
                setPhotoFilter('all');
                setSortBy('newest');
              }}
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* 4. Candidate List Content Area */}
        <div className="admin-candidates-content">
          {loading ? (
            <div className="admin-loading-container">
              <LoadingSpinner text="Loading candidates..." fullPage={false} />
            </div>
          ) : filteredRegistrations.length > 0 ? (
            <RegistrationTable
              registrations={filteredRegistrations}
              onStatusChange={handleStatusChange}
              onDeleteClick={(target) => setDeleteTarget(target)}
              onRowClick={(reg) => setSelectedDrawerProfile(reg)}
              onShareClick={(candidate) => setShareTarget(candidate)}
            />
          ) : (
            <EmptyState
              titleEn={searchTerm || activeFilterCount > 0 ? 'No candidates match your search filters' : 'No candidate registrations yet'}
              description={
                searchTerm || activeFilterCount > 0
                  ? 'Try adjusting your search query or reset active filters.'
                  : 'New applicant profile submissions will automatically appear here.'
              }
              action={
                (searchTerm || activeFilterCount > 0) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                      setGenderFilter('all');
                      setPhotoFilter('all');
                      setSortBy('newest');
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    Reset Search & Filters
                  </button>
                )
              }
            />
          )}
        </div>
      </div>

      {/* Floating Action Button '+' (Rendered ONLY on Candidates page, at bottom-left) */}
      <FloatingAddButton to="/admin/candidates/new" title="Add New Candidate" />

      {/* Filter Modal / Bottom Sheet */}
      <CandidateFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        genderFilter={genderFilter}
        onGenderChange={setGenderFilter}
        photoFilter={photoFilter}
        onPhotoChange={setPhotoFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Slide-Over Profile Inspection Drawer */}
      <AdminProfileDrawer
        registration={selectedDrawerProfile}
        isOpen={Boolean(selectedDrawerProfile)}
        onClose={() => setSelectedDrawerProfile(null)}
        onStatusChange={handleStatusChange}
        onDeleteClick={(reg) => setDeleteTarget(reg)}
        onShareClick={(candidate) => setShareTarget(candidate)}
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

      {/* WhatsApp Share Candidate Modal */}
      <ShareCandidateModal
        candidate={shareTarget}
        isOpen={Boolean(shareTarget)}
        onClose={() => setShareTarget(null)}
      />
    </AdminLayout>
  );
}
