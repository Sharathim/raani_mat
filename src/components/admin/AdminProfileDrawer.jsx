import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBadge } from '../common/StatusBadge';
import { ImageViewerModal } from '../common/ImageViewerModal';
import { formatDate } from '../../utils/helpers';
import { REGISTRATION_STATUS } from '../../utils/constants';
import { generateCandidateBioDataPdf } from '../../utils/pdfGenerator';
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  User,
  Users,
  HeartHandshake,
  Briefcase,
  Sparkles,
  Download,
  CheckCircle2,
  Trash2,
  Loader2,
  ZoomIn,
  MoreVertical,
  Copy,
  Check,
  Edit
} from 'lucide-react';

/* ---------------------------------------------------------------------------
   Reusable detail building blocks
--------------------------------------------------------------------------- */

function DetailField({ label, value, hint, fullWidth = false, maroon = false }) {
  return (
    <div className={`admin-detail-item${fullWidth ? ' full-width' : ''}`}>
      <span className="admin-detail-label">{label}</span>
      <span className={`admin-detail-value${maroon ? ' highlight-maroon' : ''}`}>{value || '—'}</span>
      {hint ? <span className="admin-detail-hint">{hint}</span> : null}
    </div>
  );
}

function DetailSection({ icon: Icon, title, children }) {
  return (
    <section className="admin-detail-section-card">
      <h3 className="admin-detail-section-title">
        <Icon size={16} strokeWidth={1.9} aria-hidden="true" />
        <span>{title}</span>
      </h3>
      <div className="admin-detail-grid">{children}</div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Candidate Profile Drawer
--------------------------------------------------------------------------- */

export function AdminProfileDrawer({
  registration,
  isOpen,
  onClose,
  onStatusChange,
  onDeleteClick,
  onShareClick,
  onEditClick,
  isSharing = false
}) {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      if (isMenuOpen) {
        setIsMenuOpen(false);
        return;
      }
      if (!isImageViewerOpen) onClose();
    };
    const handlePointerDown = (e) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('pointerdown', handlePointerDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen, isImageViewerOpen, isMenuOpen, onClose]);

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

  const handleCopyId = async () => {
    const id = String(registration.registrationId || registration.id || '');
    if (!id) return;
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(true);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = id;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopiedId(true);
      } catch {
        /* clipboard unavailable */
      }
      document.body.removeChild(ta);
    }
    setTimeout(() => setCopiedId(false), 2000);
  };

  if (!isOpen || !registration) return null;

  const cleanPhone = (registration.phone || '').replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
    `Hello ${registration.name || ''}, greetings from Rani Thirumana Sevai Maiyam regarding your matrimonial profile.`
  )}`;

  const maritalStatusDisplay = registration.maritalStatus === 'Never Married' ? 'Single' : (registration.maritalStatus || 'Single');

  const demographics = [
    registration.age ? `${registration.age} Years` : null,
    registration.gender === 'Female' ? 'Bride' : 'Groom',
    maritalStatusDisplay
  ].filter(Boolean).join(' • ');

  const candidateId = registration.registrationId || registration.id;
  const name = registration.name || 'Unnamed Candidate';

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} aria-modal="true" role="dialog">
        <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
          {/* Sticky compact header */}
          <header className="candidate-header">
            <button
              type="button"
              className="candidate-header-back"
              onClick={onClose}
              aria-label="Back to candidate list"
              title="Back to List"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="candidate-header-titles">
              <h1 className="candidate-header-title">Candidate Profile</h1>
            </div>

            <div className="candidate-header-actions" ref={menuRef}>
              <div className="candidate-menu-wrap">
                <button
                  type="button"
                  className="candidate-menu-trigger"
                  onClick={() => setIsMenuOpen((v) => !v)}
                  aria-label="More actions"
                  aria-expanded={isMenuOpen}
                  title="More actions"
                >
                  <MoreVertical size={18} />
                </button>

                {isMenuOpen && (
                  <div className="candidate-menu" role="menu">
                    <button
                      type="button"
                      className="candidate-menu-item"
                      role="menuitem"
                      onClick={() => {
                        setIsMenuOpen(false);
                        if (onEditClick) {
                          onEditClick(registration);
                        } else {
                          const regId = registration.id || registration.registrationId;
                          onClose();
                          navigate(`/admin/profiles/edit/${regId}`);
                        }
                      }}
                    >
                      <Edit size={16} />
                      <span>Edit Profile</span>
                    </button>

                    <button
                      type="button"
                      className="candidate-menu-item"
                      role="menuitem"
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleDownloadPdf();
                      }}
                      disabled={isDownloading}
                    >
                      {isDownloading ? (
                        <Loader2 size={16} className="spin" />
                      ) : downloadSuccess ? (
                        <CheckCircle2 size={16} color="var(--success)" />
                      ) : (
                        <Download size={16} />
                      )}
                      <span>{isDownloading ? 'Preparing PDF…' : downloadSuccess ? 'PDF Downloaded' : 'Download PDF'}</span>
                    </button>

                    <button
                      type="button"
                      className="candidate-menu-item"
                      role="menuitem"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onShareClick && onShareClick(registration);
                      }}
                      disabled={isSharing}
                    >
                      {isSharing ? <Loader2 size={16} className="spin" /> : <MessageCircle size={16} color="#25d366" />}
                      <span>{isSharing ? 'Preparing…' : 'Share via WhatsApp'}</span>
                    </button>

                    <button
                      type="button"
                      className="candidate-menu-item candidate-menu-item-danger"
                      role="menuitem"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onDeleteClick(registration);
                      }}
                    >
                      <Trash2 size={16} color="var(--danger)" />
                      <span style={{ color: 'var(--danger)' }}>Delete Profile</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Scrollable body */}
          <div className="candidate-body">
            {/* 1. Profile Hero */}
            <section className="candidate-hero">
              <button
                type="button"
                className="candidate-hero-photo"
                onClick={() => setIsImageViewerOpen(true)}
                aria-label={`View full profile photo of ${name}`}
                title="View full photo"
              >
                {registration.photoUrl ? (
                  <img src={registration.photoUrl} alt={name} />
                ) : (
                  <span className="candidate-hero-photo-placeholder">
                    <User size={34} aria-hidden="true" />
                    <span>No Photo</span>
                  </span>
                )}
                {registration.photoUrl && (
                  <span className="candidate-hero-photo-expand" aria-hidden="true">
                    <ZoomIn size={14} />
                  </span>
                )}
              </button>

              <div className="candidate-hero-info">
                <h2 className="candidate-hero-name">{name}</h2>
                <p className="candidate-hero-demographics">{demographics}</p>

                {cleanPhone && (
                  <div className="candidate-hero-contact">
                    <a
                      href={`tel:${cleanPhone}`}
                      className="candidate-contact-btn candidate-contact-call"
                      title={`Call ${registration.phone}`}
                    >
                      <Phone size={17} aria-hidden="true" />
                      <span>Call</span>
                    </a>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="candidate-contact-btn candidate-contact-wa"
                      title="Chat on WhatsApp"
                    >
                      <MessageCircle size={17} aria-hidden="true" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                )}
              </div>
            </section>

            {/* 2. Quick Information Grid */}
            <section className="candidate-quick-grid" aria-label="Profile summary">
              <div className="candidate-quick-cell">
                <span className="candidate-quick-label">Location</span>
                <span className="candidate-quick-value">{registration.location || '—'}</span>
              </div>
              <div className="candidate-quick-cell">
                <span className="candidate-quick-label">Age</span>
                <span className="candidate-quick-value">{registration.age ? `${registration.age} Years` : '—'}</span>
              </div>
              <div className="candidate-quick-cell">
                <span className="candidate-quick-label">Gender</span>
                <span className="candidate-quick-value">{registration.gender === 'Female' ? 'Bride' : 'Groom'}</span>
              </div>
              <div className="candidate-quick-cell">
                <span className="candidate-quick-label">Marital Status</span>
                <span className="candidate-quick-value">{maritalStatusDisplay}</span>
              </div>
              <div className="candidate-quick-cell">
                <span className="candidate-quick-label">Education</span>
                <span className="candidate-quick-value">{registration.education || '—'}</span>
              </div>
              <div className="candidate-quick-cell">
                <span className="candidate-quick-label">Occupation</span>
                <span className="candidate-quick-value">{registration.occupation || '—'}</span>
              </div>
              <div className="candidate-quick-cell full">
                <span className="candidate-quick-label">Monthly Income</span>
                <span className="candidate-quick-value maroon">{registration.income || '—'}</span>
              </div>
            </section>

            {/* 3. Detailed Information Sections */}
            <div className="candidate-sections">
              {/* SECTION 1: Basic & Social Details */}
              <DetailSection icon={User} title="1. Basic & Social Details">
                <DetailField label="Profile Created For" value={registration.profileFor} />
                <DetailField label="Date of Birth" value={registration.dateOfBirth} />
                <DetailField label="Religion" value={registration.religion} maroon />
                <DetailField label="Community Category" value={registration.community} />
                <DetailField label="Caste" value={registration.caste || registration.casteReligion} maroon />
                <DetailField label="Subcaste / Division" value={registration.subCaste} />
                <DetailField label="Location / Address" value={registration.location} />
                <DetailField label="Native Place" value={registration.nativePlace} />
                <DetailField label="Email Address" value={registration.email} fullWidth />
              </DetailSection>

              {/* SECTION 2: Family Information */}
              <DetailSection icon={Users} title="2. Family Information">
                <DetailField label="Father Name" value={registration.fatherName} hint={registration.fatherOccupation} />
                <DetailField label="Mother Name" value={registration.motherName} hint={registration.motherOccupation} />
                <DetailField label="Family Type" value={registration.familyType} />
                <DetailField label="Siblings" value={registration.siblings} />
              </DetailSection>

              {/* SECTION 3: Horoscope & Astrology */}
              <DetailSection icon={Sparkles} title="3. Horoscope & Astrology">
                <DetailField
                  label="Birth Star (Nakshatra)"
                  value={registration.birthStar === 'Other' ? (registration.customBirthStar || 'Other') : registration.birthStar}
                  maroon
                />
                <DetailField
                  label="Zodiac Sign (Rasi)"
                  value={registration.zodiacSign === 'Other' ? (registration.customZodiacSign || 'Other') : registration.zodiacSign}
                  maroon
                />
                <DetailField
                  label="Lagnam"
                  value={registration.lagnam === 'Other' ? (registration.customLagnam || 'Other') : registration.lagnam}
                />
                <DetailField
                  label="Gothram / Dosham"
                  value={`${registration.gothram || '—'} (${(registration.dosham === 'Other' || registration.dosham === 'Other Dosham' || (registration.dosham && registration.dosham.includes('Other'))) ? (registration.customDosham || 'Other') : (registration.dosham || 'None')})`}
                />
              </DetailSection>

              {/* SECTION 4: Education & Career */}
              <DetailSection icon={Briefcase} title="4. Education & Career">
                <DetailField label="Height" value={registration.height} />
                <DetailField label="Monthly Income" value={registration.income} maroon />
                <DetailField label="Education / Qualification" value={registration.education} fullWidth />
                <DetailField
                  label="Occupation & Sector"
                  value={`${registration.occupation || '—'} (${registration.employedIn || 'Private'})`}
                  fullWidth
                />
              </DetailSection>
            </div>

            {/* SECTION 5: Partner Expectations */}
            <section className="candidate-expectation-card">
              <h3 className="admin-detail-section-title">
                <HeartHandshake size={16} strokeWidth={1.9} aria-hidden="true" />
                <span>5. Partner Expectations</span>
              </h3>
              <p className="candidate-expectation-text">
                {registration.expectation && registration.expectation.trim() !== 'nothing'
                  ? registration.expectation
                  : 'No specific preference provided'}
              </p>
            </section>

            {/* Registration Metadata */}
            <section className="candidate-meta" aria-label="Registration information">
              <div className="candidate-meta-cell">
                <span className="candidate-meta-label">Registered</span>
                <span className="candidate-meta-value">{formatDate(registration.createdAt)}</span>
              </div>
              <div className="candidate-meta-cell">
                <span className="candidate-meta-label">Candidate ID</span>
                <span className="candidate-meta-value">{candidateId}</span>
              </div>
            </section>
          </div>

          {/* Sticky Bottom Action Bar */}
          <footer className="candidate-action-bar">
            <button
              type="button"
              className="btn candidate-action-delete"
              onClick={() => onDeleteClick(registration)}
              title="Delete candidate profile permanently"
            >
              <Trash2 size={16} aria-hidden="true" />
              <span>Delete Profile</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary candidate-action-secondary"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              title="Download Candidate Biodata PDF"
            >
              {isDownloading ? (
                <Loader2 size={16} className="spin" />
              ) : downloadSuccess ? (
                <CheckCircle2 size={16} color="var(--success)" />
              ) : (
                <Download size={16} />
              )}
              <span>{isDownloading ? 'Preparing…' : downloadSuccess ? 'Downloaded!' : 'Download PDF'}</span>
            </button>

            <button
              type="button"
              className="btn candidate-action-share"
              onClick={() => onShareClick && onShareClick(registration)}
              disabled={isSharing}
              title="Share candidate PDF via WhatsApp"
            >
              {isSharing ? <Loader2 size={16} className="spin" /> : <MessageCircle size={16} aria-hidden="true" />}
              <span>{isSharing ? 'Preparing…' : 'Share via WhatsApp'}</span>
            </button>
          </footer>
        </div>
      </div>

      {/* Full-Screen Interactive Photo Viewer */}
      <ImageViewerModal
        imageUrl={registration.photoUrl}
        altText={`${name} Profile Photo`}
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />
    </>
  );
}