import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../components/admin/AdminLayout';
import { SearchBar } from '../components/admin/SearchBar';
import { CandidateFilterModal } from '../components/admin/CandidateFilterModal';
import { RegistrationTable } from '../components/admin/RegistrationTable';
import { AdminProfileDrawer } from '../components/admin/AdminProfileDrawer';
import { FloatingAddButton } from '../components/admin/FloatingAddButton';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { EmptyState } from '../components/common/EmptyState';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { shareCandidatePdf } from '../utils/shareCandidate';
import { calculateAge } from '../utils/helpers';
import {
  getRegistrations,
  updateRegistrationStatus,
  deleteRegistration
} from '../services/registrationService';
import { REGISTRATION_STATUS } from '../utils/constants';

export const DEFAULT_CANDIDATE_FILTERS = {
  status: 'all',
  gender: 'all',
  maritalStatus: 'all',
  minAge: '',
  maxAge: '',
  religion: 'all',
  community: 'all',
  caste: 'all',
  birthStar: 'all',
  zodiacSign: 'all',
  lagnam: 'all',
  gothram: '',
  dosham: 'all',
  height: '',
  sortBy: 'newest'
};

export function AdminCandidatesPage({ statusScope = 'reviewed' }) {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(DEFAULT_CANDIDATE_FILTERS);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Drawer Profile Preview
  const [selectedDrawerProfile, setSelectedDrawerProfile] = useState(null);

  // Direct Candidate Share state & Feedback notice
  const [sharingId, setSharingId] = useState(null);
  const [shareNotice, setShareNotice] = useState(null);

  // Deletion Modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load registrations from Firestore/Storage
  const loadData = async () => {
    setError(null);

    try {
      const list = await getRegistrations();
      setRegistrations(list || []);
    } catch (err) {
      console.error('Failed to load candidate records:', err);
      setError(err.message || 'Failed to load records.');
    } finally {
      setLoading(false);
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

  // Handle Edit Candidate Profile navigation
  const handleEditCandidate = (reg) => {
    if (!reg) return;
    const regId = reg.id || reg.registrationId;
    setSelectedDrawerProfile(null);
    navigate(`/admin/profiles/edit/${regId}`);
  };

  // Auto-dismiss share notice after 7 seconds
  useEffect(() => {
    if (shareNotice) {
      const timer = setTimeout(() => {
        setShareNotice(null);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [shareNotice]);

  // Handle Direct Candidate PDF Share via Web Share API (WhatsApp) or Download fallback
  const handleShareCandidate = async (candidate) => {
    if (!candidate) return;
    const cid = candidate.id || candidate.registrationId;
    setSharingId(cid);
    setShareNotice(null);

    try {
      const result = await shareCandidatePdf(candidate);
      if (result.method === 'download') {
        setShareNotice({
          type: 'info',
          message: result.message || 'Candidate PDF downloaded! You can attach and share it via WhatsApp.'
        });
      }
    } catch (err) {
      console.error('Failed to share candidate:', err);
      setShareNotice({
        type: 'error',
        message: 'Failed to generate candidate PDF. Please try again.'
      });
    } finally {
      setSharingId(null);
    }
  };

  // Active filter count (excluding defaults)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.status !== 'all') count++;
    if (filters.gender !== 'all') count++;
    if (filters.maritalStatus !== 'all') count++;
    if (filters.minAge || filters.maxAge) count++;
    if (filters.religion !== 'all') count++;
    if (filters.community !== 'all') count++;
    if (filters.caste !== 'all') count++;
    if (filters.birthStar !== 'all') count++;
    if (filters.zodiacSign !== 'all') count++;
    if (filters.lagnam !== 'all') count++;
    if (filters.gothram && filters.gothram.trim()) count++;
    if (filters.dosham !== 'all') count++;
    if (filters.height && filters.height.trim()) count++;
    if (filters.sortBy !== 'newest') count++;
    return count;
  }, [filters]);

  // Section configurations based on current status scope
  const sectionConfig = useMemo(() => {
    switch (statusScope) {
      case 'new':
        return {
          title: 'New Registrations',
          entityName: 'new registrations',
          searchPlaceholder: 'Search new profiles',
          emptyTitle: 'No new profiles found',
          emptyDesc: 'New applicant registration submissions will automatically appear here once registered online.',
          showAddButton: false
        };
      case 'completed':
        return {
          title: 'Completed Profiles',
          entityName: 'completed profiles',
          searchPlaceholder: 'Search completed profiles',
          emptyTitle: 'No completed profiles found',
          emptyDesc: 'Matrimonial profiles marked as completed or settled will appear here.',
          showAddButton: false
        };
      case 'reviewed':
      default:
        return {
          title: 'Profiles',
          entityName: 'profiles',
          searchPlaceholder: 'Search reviewed profiles',
          emptyTitle: 'No reviewed profiles found',
          emptyDesc: 'Candidate profiles that have been reviewed by admin will appear here.',
          showAddButton: true
        };
    }
  }, [statusScope]);

  // Base registrations scoped to current section
  const scopedRegistrations = useMemo(() => {
    return registrations.filter((reg) => {
      const status = reg.status || REGISTRATION_STATUS.NEW;
      if (statusScope === 'new') {
        return status === REGISTRATION_STATUS.NEW;
      }
      if (statusScope === 'completed') {
        return status === REGISTRATION_STATUS.COMPLETED;
      }
      // 'reviewed' (Profiles section)
      return status === REGISTRATION_STATUS.REVIEWED;
    });
  }, [registrations, statusScope]);

  // Filtered & Sorted Registrations
  const filteredRegistrations = useMemo(() => {
    return scopedRegistrations
      .filter((reg) => {
        // 1. Search query matching
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase().trim();
          const matchName = (reg.name || '').toLowerCase().includes(q);
          const matchPhone = (reg.phone || '').includes(q);
          const matchLocation = (reg.location || '').toLowerCase().includes(q);
          const matchNative = (reg.nativePlace || '').toLowerCase().includes(q);
          const matchOccupation = (reg.occupation || '').toLowerCase().includes(q);
          const matchEducation = (reg.education || '').toLowerCase().includes(q);
          const matchId = (reg.registrationId || reg.id || '').toLowerCase().includes(q);
          const matchCaste = (reg.caste || reg.casteReligion || '').toLowerCase().includes(q);
          const matchReligion = (reg.religion || '').toLowerCase().includes(q);
          const matchCommunity = (reg.community || '').toLowerCase().includes(q);
          const matchSubCaste = (reg.subCaste || '').toLowerCase().includes(q);
          const matchStar = (reg.birthStar || '').toLowerCase().includes(q) || (reg.customBirthStar || '').toLowerCase().includes(q);
          const matchRasi = (reg.zodiacSign || '').toLowerCase().includes(q) || (reg.customZodiacSign || '').toLowerCase().includes(q);
          const matchLagnam = (reg.lagnam || '').toLowerCase().includes(q) || (reg.customLagnam || '').toLowerCase().includes(q);
          const matchGothram = (reg.gothram || '').toLowerCase().includes(q);
          const matchDosham = (reg.dosham || '').toLowerCase().includes(q) || (reg.customDosham || '').toLowerCase().includes(q);

          if (
            !matchName &&
            !matchPhone &&
            !matchLocation &&
            !matchNative &&
            !matchOccupation &&
            !matchEducation &&
            !matchId &&
            !matchCaste &&
            !matchReligion &&
            !matchCommunity &&
            !matchSubCaste &&
            !matchStar &&
            !matchRasi &&
            !matchLagnam &&
            !matchGothram &&
            !matchDosham
          ) {
            return false;
          }
        }

        // 2. Status Filter
        if (filters.status !== 'all') {
          if ((reg.status || REGISTRATION_STATUS.NEW) !== filters.status) {
            return false;
          }
        }

        // 3. Gender Filter
        if (filters.gender !== 'all') {
          if (reg.gender !== filters.gender) {
            return false;
          }
        }

        // 4. Marital Status Filter
        if (filters.maritalStatus !== 'all') {
          const rawM = (reg.maritalStatus || 'Single').toLowerCase();
          const mStatus = rawM === 'never married' ? 'single' : rawM;
          if (mStatus !== filters.maritalStatus.toLowerCase()) {
            return false;
          }
        }

        // 6. Age Range Filter
        const candidateAge = Number(reg.age) || (reg.dateOfBirth ? Number(calculateAge(reg.dateOfBirth)) : null);
        if (filters.minAge && candidateAge !== null && candidateAge < Number(filters.minAge)) {
          return false;
        }
        if (filters.maxAge && candidateAge !== null && candidateAge > Number(filters.maxAge)) {
          return false;
        }

        // 7. Religion Filter
        if (filters.religion !== 'all') {
          const rel = (reg.religion || reg.casteReligion || '').toLowerCase();
          if (!rel.includes(filters.religion.toLowerCase())) {
            return false;
          }
        }

        // 8. Community Category Filter
        if (filters.community !== 'all') {
          const comm = (reg.community || '').toLowerCase();
          if (!comm.includes(filters.community.toLowerCase())) {
            return false;
          }
        }

        // 9. Caste Filter
        if (filters.caste !== 'all' && filters.caste.trim()) {
          const cst = (reg.caste || reg.casteReligion || '').toLowerCase();
          const cleanQuery = filters.caste.split('(')[0].toLowerCase().trim();
          if (!cst.includes(cleanQuery)) {
            return false;
          }
        }

        // 10. Nakshatra (Birth Star) Filter
        if (filters.birthStar !== 'all') {
          const star = (reg.birthStar || '').toLowerCase();
          if (!star.includes(filters.birthStar.toLowerCase())) {
            return false;
          }
        }

        // 11. Zodiac Sign (Rasi) Filter
        if (filters.zodiacSign !== 'all') {
          const rasi = (reg.zodiacSign || '').toLowerCase();
          if (!rasi.includes(filters.zodiacSign.toLowerCase())) {
            return false;
          }
        }

        // 12. Lagnam Filter
        if (filters.lagnam !== 'all') {
          const lag = (reg.lagnam || '').toLowerCase();
          if (!lag.includes(filters.lagnam.toLowerCase())) {
            return false;
          }
        }

        // 13. Gothram Filter
        if (filters.gothram && filters.gothram.trim()) {
          const g = (reg.gothram || '').toLowerCase();
          if (!g.includes(filters.gothram.toLowerCase().trim())) {
            return false;
          }
        }

        // 14. Dosham Filter
        if (filters.dosham !== 'all') {
          const d = (reg.dosham || 'None').toLowerCase();
          if (filters.dosham === 'None') {
            if (d !== 'none' && d !== '' && !d.includes('none')) return false;
          } else {
            if (!d.includes(filters.dosham.toLowerCase())) return false;
          }
        }

        // 15. Height Filter
        if (filters.height && filters.height.trim()) {
          const h = (reg.height || '').toLowerCase();
          if (!h.includes(filters.height.toLowerCase().trim())) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'newest') {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
          return dateB - dateA;
        }
        if (filters.sortBy === 'oldest') {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
          return dateA - dateB;
        }
        if (filters.sortBy === 'nameAsc') {
          return (a.name || '').localeCompare(b.name || '');
        }
        if (filters.sortBy === 'nameDesc') {
          return (b.name || '').localeCompare(a.name || '');
        }
        if (filters.sortBy === 'ageAsc') {
          const ageA = Number(a.age) || (a.dateOfBirth ? Number(calculateAge(a.dateOfBirth)) : 999);
          const ageB = Number(b.age) || (b.dateOfBirth ? Number(calculateAge(b.dateOfBirth)) : 999);
          return ageA - ageB;
        }
        if (filters.sortBy === 'ageDesc') {
          const ageA = Number(a.age) || (a.dateOfBirth ? Number(calculateAge(a.dateOfBirth)) : 0);
          const ageB = Number(b.age) || (b.dateOfBirth ? Number(calculateAge(b.dateOfBirth)) : 0);
          return ageB - ageA;
        }
        return 0;
      });
  }, [scopedRegistrations, searchTerm, filters]);

  return (
    <AdminLayout>
      <div className="container">
        {/* Error Notification */}
        <ErrorBanner message={error} onDismiss={() => setError(null)} />

        {/* Share Feedback / Download Notification Banner */}
        {shareNotice && (
          <div
            style={{
              backgroundColor: shareNotice.type === 'error' ? 'var(--danger-bg)' : '#f0fdf4',
              border: `1.5px solid ${shareNotice.type === 'error' ? 'var(--danger-border)' : '#86efac'}`,
              borderRadius: 'var(--radius-sm)',
              padding: '0.85rem 1.25rem',
              marginBottom: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              color: shareNotice.type === 'error' ? 'var(--danger)' : '#166534',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
            }}
            role="status"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              {shareNotice.type === 'error' ? (
                <AlertCircle size={20} style={{ flexShrink: 0 }} />
              ) : (
                <CheckCircle2 size={20} style={{ flexShrink: 0, color: '#16a34a' }} />
              )}
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{shareNotice.message}</span>
            </div>
            <button
              onClick={() => setShareNotice(null)}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                padding: '0.2rem',
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Dismiss message"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* 2. Full-Width Search Bar with Integrated Filter Icon */}
        <div className="admin-search-container" style={{ marginBottom: '0.65rem' }}>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onOpenFilter={() => setIsFilterModalOpen(true)}
            activeFilterCount={activeFilterCount}
            placeholder={sectionConfig.searchPlaceholder}
          />
        </div>

        {/* 3. Candidate Count & Status Information */}
        <div className="admin-candidate-info-bar">
          <div className="admin-count-indicator">
            Showing <strong className="admin-count-highlight">{filteredRegistrations.length}</strong> of {scopedRegistrations.length} {sectionConfig.entityName}
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
              onClick={() => setFilters(DEFAULT_CANDIDATE_FILTERS)}
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
              onShareClick={handleShareCandidate}
              onEditClick={handleEditCandidate}
              sharingId={sharingId}
            />
          ) : (
            <EmptyState
              titleEn={searchTerm || activeFilterCount > 0 ? `No ${sectionConfig.entityName} match your search filters` : sectionConfig.emptyTitle}
              description={
                searchTerm || activeFilterCount > 0
                  ? 'Try adjusting your search query or reset active filters.'
                  : sectionConfig.emptyDesc
              }
              action={
                (searchTerm || activeFilterCount > 0) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm('');
                      setFilters(DEFAULT_CANDIDATE_FILTERS);
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

      {/* Floating Action Button '+' (Rendered on Profiles section) */}
      {sectionConfig.showAddButton && (
        <FloatingAddButton to="/admin/profiles/new" title="Add New Profile" />
      )}

      {/* Filter Modal / Bottom Sheet */}
      <CandidateFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApplyFilters={setFilters}
        onResetFilters={() => setFilters(DEFAULT_CANDIDATE_FILTERS)}
      />

      {/* Slide-Over Profile Inspection Drawer */}
      <AdminProfileDrawer
        registration={selectedDrawerProfile}
        isOpen={Boolean(selectedDrawerProfile)}
        onClose={() => setSelectedDrawerProfile(null)}
        onStatusChange={handleStatusChange}
        onDeleteClick={(reg) => setDeleteTarget(reg)}
        onShareClick={handleShareCandidate}
        onEditClick={handleEditCandidate}
        isSharing={sharingId === (selectedDrawerProfile?.id || selectedDrawerProfile?.registrationId)}
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
    </AdminLayout>
  );
}
