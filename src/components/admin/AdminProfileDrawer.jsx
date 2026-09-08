import React, { useState, useEffect } from 'react';
import { StatusBadge } from '../common/StatusBadge';
import { ImageViewerModal } from '../common/ImageViewerModal';
import { formatDate } from '../../utils/helpers';
import { REGISTRATION_STATUS } from '../../utils/constants';
import { generateCandidateBioDataPdf } from '../../utils/pdfGenerator';
import {
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  Users,
  HeartHandshake,
  Briefcase,
  Sparkles,
  Share2,
  Download,
  CheckCircle2,
  MessageCircle,
  Trash2,
  Loader2,
  ZoomIn,
  ArrowLeft
} from 'lucide-react';

export function AdminProfileDrawer({
  registration,
  isOpen,
  onClose,
  onStatusChange,
  onDeleteClick,
  onShareClick,
  isSharing = false
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isImageViewerOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isImageViewerOpen, onClose]);

  const handleDownloadPdf = async () => {
    if (!registration || isDownloading) return;
    setIsDownloading(true);
    try {
      const { doc, filename } = await generateCandidateBioDataPdf(registration);
      doc.save(filename);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to download candidate PDF:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!isOpen || !registration) return null;

  const cleanPhone = (registration.phone || '').replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
    `Hello ${registration.name || ''}, greetings from Rani Thirumana Sevai Maiyam regarding your matrimonial profile.`
  )}`;

  const demographics = [
    registration.age ? `${registration.age} Years` : null,
    registration.gender === 'Female' ? 'Bride' : 'Groom',
    registration.maritalStatus || 'Never Married'
  ].filter(Boolean).join(' • ');

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} aria-modal="true" role="dialog">
        <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
          {/* Drawer Top Header */}
          <div
            style={{
              padding: '1rem 1.25rem',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#ffffff',
              position: 'sticky',
              top: 0,
              zIndex: 15
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ink)',
                  cursor: 'pointer',
                  padding: '0.2rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
                aria-label="Back / Close"
                title="Back to List"
              >
                <ArrowLeft size={18} />
              </button>

              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                Candidate Profile
              </h2>

              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  color: 'var(--maroon-800)',
                  background: 'var(--maroon-50)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid rgba(138, 16, 38, 0.15)'
                }}
              >
                {registration.registrationId || registration.id}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <StatusBadge status={registration.status} />

              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isDownloading}
                className="btn btn-secondary btn-sm"
                style={{
                  padding: '0.3rem 0.6rem',
                  fontSize: '0.775rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: downloadSuccess ? 'var(--success)' : 'var(--ink)'
                }}
                title="Download Matrimonial Biodata PDF"
              >
                {isDownloading ? (
                  <Loader2 size={13} className="spin" />
                ) : downloadSuccess ? (
                  <CheckCircle2 size={13} color="var(--success)" />
                ) : (
                  <Download size={13} />
                )}
                <span className="hide-mobile">{downloadSuccess ? 'Downloaded' : 'PDF'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--muted)',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  borderRadius: 'var(--radius-xs)',
                  display: 'flex',
                  alignItems: 'center'
                }}
                aria-label="Close drawer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Drawer Body Scroll Container */}
          <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* 1. Profile Hero Summary Card */}
            <div className="admin-hero-card">
              {/* Photo Thumbnail */}
              <div
                className="admin-hero-photo-wrap"
                onClick={() => setIsImageViewerOpen(true)}
                title="Click to view full photo"
              >
                {registration.photoUrl ? (
                  <img
                    src={registration.photoUrl}
                    alt={registration.name || 'Candidate Photo'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--muted)',
                      background: 'var(--surface-alt)'
                    }}
                  >
                    <User size={36} />
                    <span style={{ fontSize: '0.65rem' }}>No Photo</span>
                  </div>
                )}
                {registration.photoUrl && (
                  <div className="admin-hero-photo-badge">
                    <ZoomIn size={10} style={{ display: 'inline', marginRight: '2px' }} /> Expand
                  </div>
                )}
              </div>

              {/* Identity & Status Actions */}
              <div className="admin-hero-info">
                <h2 className="admin-hero-name">
                  {registration.name || 'Unnamed Candidate'}
                </h2>
                <div className="admin-hero-demographics">
                  {demographics}
                </div>

                <div className="admin-hero-id">
                  ID: <span>{registration.registrationId || registration.id}</span>
                </div>

                {/* Status Dropdown & Quick Actions */}
                <div className="admin-hero-actions-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>Status:</span>
                    <select
                      value={registration.status || REGISTRATION_STATUS.NEW}
                      onChange={(e) => onStatusChange(registration.id || registration.registrationId, e.target.value)}
                      className="admin-card-select-status"
                      aria-label="Update profile status"
                    >
                      <option value={REGISTRATION_STATUS.NEW}>New</option>
                      <option value={REGISTRATION_STATUS.REVIEWED}>Reviewed</option>
                      <option value={REGISTRATION_STATUS.COMPLETED}>Completed</option>
                    </select>
                  </div>

                  {cleanPhone && (
                    <>
                      <a
                        href={`tel:${cleanPhone}`}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem' }}
                        title={`Call ${registration.phone}`}
                      >
                        <Phone size={13} color="var(--maroon-700)" />
                        <span>Call</span>
                      </a>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem', color: '#15803d', borderColor: '#bbf7d0' }}
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle size={13} color="#15803d" />
                        <span>WhatsApp</span>
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Quick Information Grid */}
            <div className="admin-quick-info-grid">
              <div className="admin-quick-info-cell">
                <span className="admin-quick-info-label">Location</span>
                <span className="admin-quick-info-value">{registration.location || '—'}</span>
              </div>
              <div className="admin-quick-info-cell">
                <span className="admin-quick-info-label">Age</span>
                <span className="admin-quick-info-value">{registration.age ? `${registration.age} Yrs` : '—'}</span>
              </div>
              <div className="admin-quick-info-cell">
                <span className="admin-quick-info-label">Gender</span>
                <span className="admin-quick-info-value">{registration.gender === 'Female' ? 'Bride' : 'Groom'}</span>
              </div>
              <div className="admin-quick-info-cell">
                <span className="admin-quick-info-label">Marital Status</span>
                <span className="admin-quick-info-value">{registration.maritalStatus || 'Never Married'}</span>
              </div>
              <div className="admin-quick-info-cell">
                <span className="admin-quick-info-label">Education</span>
                <span className="admin-quick-info-value">{registration.education || '—'}</span>
              </div>
              <div className="admin-quick-info-cell">
                <span className="admin-quick-info-label">Occupation</span>
                <span className="admin-quick-info-value">{registration.occupation || '—'}</span>
              </div>
              <div className="admin-quick-info-cell">
                <span className="admin-quick-info-label">Monthly Income</span>
                <span className="admin-quick-info-value">{registration.income || '—'}</span>
              </div>
            </div>

            {/* 3. Categorized Details Cards */}

            {/* SECTION 1: Basic & Social Details */}
            <div className="admin-detail-section-card">
              <h3 className="admin-detail-section-title">
                <User size={15} />
                <span>1. Basic & Social Details</span>
              </h3>

              <div className="admin-detail-grid">
                <div className="admin-detail-item">
                  <span className="admin-detail-label">Profile Created For</span>
                  <span className="admin-detail-value">{registration.profileFor || 'Self'}</span>
                </div>

                <div className="admin-detail-item">
                  <span className="admin-detail-label">Date of Birth</span>
                  <span className="admin-detail-value">{registration.dateOfBirth || '—'}</span>
                </div>

                <div className="admin-detail-item">
                  <span className="admin-detail-label">Religion</span>
                  <span className="admin-detail-value highlight-maroon">{registration.religion || 'Hindu'}</span>
                </div>

                <div className="admin-detail-item">
                  <span className="admin-detail-label">Community Category</span>
                  <span className="admin-detail-value">{registration.community || '—'}</span>
                </div>

                <div className="admin-detail-item">
                  <span className="admin-detail-label">Caste</span>
                  <span className="admin-detail-value highlight-maroon">{registration.caste || registration.casteReligion || '—'}</span>
                </div>

                <div className="admin-detail-item">
                  <span className="admin-detail-label">Subcaste / Division</span>
                  <span className="admin-detail-value">{registration.subCaste || '—'}</span>
                </div>

                <div className="admin-detail-item">
                  <span className="admin-detail-label">Location / Address</span>
                  <span className="admin-detail-value">{registration.location || '—'}</span>
                </div>

                <div className="admin-detail-item">
                  <span className="admin-detail-label">Native Place</span>
                  <span className="admin-detail-value">{registration.nativePlace || '—'}</span>
                </div>

                <div className="admin-detail-item full-width">
                  <span className="admin-detail-label">Email Address</span>
                  <span className="admin-detail-value" style={{ wordBreak: 'break-all' }}>{registration.email || '—'}</span>
                </div>
              </div>
            </div>

            {/* SECTION 2: Family Information */}
            <div className="admin-detail-section-card">
              <h3 className="admin-detail-section-title">
                <Users size={15} />
                <span>2. Family Information</span>
              </h3>

              <div className="admin-detail-grid">
                <div className="admin-detail-item">
                  <span className="admin-detail-label">Father Name</span>
                  <span className="admin-detail-value">{registration.fatherName || '—'}</span>
                  {registration.fatherOccupation && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{registration.fatherOccupation}</span>
                  )}
                </div>

                <div className="admin-detail-item">
                  <span className="admin-detail-label">Mother Name</span>
                  <span className="admin-detail-value">{registration.motherName || '—'}</span>
                  {registration.motherOccupation && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{registration.motherOccupation}</span>
                  )}
                </div>

                <div className="admin-detail-item">
                  <span className="admin-detail-label">Family Type</span>
                  <span className="admin-detail-value">{registration.familyType || 'Nuclear Family'}</span>
                </div>

                <div className="admin-detail-item full-width">
                  <span className="admin-detail-label">Siblings</span>
                  <span className="admin-detail-value">{registration.siblings || 'None'}</span>
                </div>
              </div>
            </div>

            {/* SECTION 3: Horoscope & Astrology */}
            <div className="admin-detail-section-card">
              <h3 className="admin-detail-section-title">
                <Sparkles size={15} />
                <span>3. Horoscope & Astrology</span>
              </h3>

              <div className="admin-detail-grid">
                <div className="admin-detail-item">
                  <span className="admin-detail-label">Birth Star (Nakshatra)</span>
                  <span className="admin-detail-value highlight-maroon">{registration.birthStar || '—'}</span>
                </div>

                <div className="admin-detail-item">
                  <span className="admin-detail-label">Zodiac Sign (Rasi)</span>
                  <span className="admin-detail-value highlight-maroon">{registration.zodiacSign || '—'}</span>
                </div>

                <div className="admin-detail-item">
                  <span className="admin-detail-label">Lagnam</span>
                  <span className="admin-detail-value">{registration.lagnam || '—'}</span>
                </div>

                <div className="admin-detail-item">
                  <span className="admin-detail-label">Gothram / Dosham</span>
                  <span className="admin-detail-value">
                    {registration.gothram || '—'} ({registration.dosham || 'None'})
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION 4: Education & Career */}
            <div className="admin-detail-section-card">
              <h3 className="admin-detail-section-title">
                <Briefcase size={15} />
                <span>4. Education & Career</span>
              </h3>

              <div className="admin-detail-grid">
                <div className="admin-detail-item">
                  <span className="admin-detail-label">Height</span>
                  <span className="admin-detail-value">{registration.height || '—'}</span>
                </div>

                <div className="admin-detail-item">
                  <span className="admin-detail-label">Monthly Income</span>
                  <span className="admin-detail-value highlight-maroon">{registration.income || '—'}</span>
                </div>

                <div className="admin-detail-item full-width">
                  <span className="admin-detail-label">Education / Qualification</span>
                  <span className="admin-detail-value">{registration.education || '—'}</span>
                </div>

                <div className="admin-detail-item full-width">
                  <span className="admin-detail-label">Occupation & Sector</span>
                  <span className="admin-detail-value">
                    {registration.occupation || '—'} ({registration.employedIn || 'Private'})
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION 5: Partner Expectations */}
            <div className="admin-expectation-card">
              <h3 className="admin-detail-section-title" style={{ borderColor: 'rgba(234, 179, 8, 0.3)' }}>
                <HeartHandshake size={15} />
                <span>5. Partner Expectations</span>
              </h3>
              <p className="admin-expectation-text">
                {registration.expectation && registration.expectation.trim() !== 'nothing'
                  ? registration.expectation
                  : 'No specific preference provided'}
              </p>
            </div>

            {/* Registration Metadata Footer */}
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'flex', justifyContent: 'space-between', padding: '0 0.25rem' }}>
              <span>Registered: {formatDate(registration.createdAt)}</span>
              <span>Candidate ID: {registration.registrationId || registration.id}</span>
            </div>
          </div>

          {/* Sticky Drawer Footer Actions */}
          <div className="admin-drawer-sticky-footer">
            <button
              type="button"
              onClick={() => onDeleteClick(registration)}
              className="btn btn-danger btn-sm"
              title="Delete candidate profile permanently"
            >
              <Trash2 size={14} />
              <span>Delete Profile</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isDownloading}
                className="btn btn-secondary btn-sm"
                title="Download Candidate Biodata PDF"
              >
                {isDownloading ? (
                  <Loader2 size={14} className="spin" />
                ) : downloadSuccess ? (
                  <CheckCircle2 size={14} color="var(--success)" />
                ) : (
                  <Download size={14} />
                )}
                <span>{downloadSuccess ? 'Downloaded!' : 'Download PDF'}</span>
              </button>

              <button
                type="button"
                onClick={() => onShareClick && onShareClick(registration)}
                disabled={isSharing}
                className="btn btn-primary btn-sm"
                style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}
                title="Share candidate PDF via WhatsApp"
              >
                {isSharing ? <Loader2 size={14} className="spin" /> : <Share2 size={14} />}
                <span>{isSharing ? 'Preparing...' : 'Share via WhatsApp'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Interactive Photo Viewer */}
      <ImageViewerModal
        imageUrl={registration.photoUrl}
        altText={`${registration.name || 'Candidate'} Profile Photo`}
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />
    </>
  );
}
