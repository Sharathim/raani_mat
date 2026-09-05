import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AdminHeader } from '../components/admin/AdminHeader';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import {
  getRegistration,
  updateRegistrationStatus,
  deleteRegistration
} from '../services/registrationService';
import { formatDate } from '../utils/helpers';
import { REGISTRATION_STATUS, BRAND } from '../utils/constants';
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  HeartHandshake,
  Trash2,
  Printer,
  CheckCircle,
  MessageCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

export function AdminRegistrationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      if (!id) {
        setError('No registration ID provided.');
        setLoading(false);
        return;
      }
      try {
        const data = await getRegistration(id);
        if (!data) {
          setError('Registration profile not found.');
        } else {
          setRegistration(data);
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
        setError(err.message || 'Failed to load profile.');
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setStatusUpdating(true);
    try {
      await updateRegistrationStatus(id, newStatus);
      setRegistration((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error('Failed to update status:', err);
      setError(err.message || 'Failed to update status.');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteRegistration(id);
      navigate('/admin');
    } catch (err) {
      console.error('Failed to delete profile:', err);
      setError(err.message || 'Failed to delete profile.');
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--saas-bg)' }}>
        <AdminHeader />
        <LoadingSpinner text="Loading candidate bio-data..." fullPage />
      </div>
    );
  }

  if (error || !registration) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--saas-bg)' }}>
        <AdminHeader />
        <div className="container" style={{ padding: '3rem 1.25rem' }}>
          <ErrorBanner message={error || 'Profile not found.'} />
          <Link to="/admin" className="btn btn-secondary">
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  const cleanPhone = (registration.phone || '').replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
    `Hello ${registration.name || ''}, greetings from Rani Thirumana Sevai Maiyam regarding your matrimonial profile.`
  )}`;

  return (
    <ErrorBoundary>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--saas-bg)', display: 'flex', flexDirection: 'column' }}>
        <div className="no-print">
          <AdminHeader />
        </div>

        <main style={{ flex: 1, padding: '1.75rem 1.25rem 4rem' }}>
          <div className="container">
            {/* Top Navigation & Action Controls */}
            <div
              className="no-print"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}
            >
              <Link to="/admin" className="btn btn-secondary btn-sm">
                <ArrowLeft size={14} />
                <span>Back to Registrations</span>
              </Link>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="btn btn-secondary btn-sm"
                  title="Print Matrimonial Bio-Data Sheet"
                >
                  <Printer size={14} />
                  <span>Print Bio-Data</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="btn btn-danger btn-sm"
                  title="Delete Registration"
                >
                  <Trash2 size={14} />
                  <span>Delete Profile</span>
                </button>
              </div>
            </div>

            {/* Two-Column Bio-Data Layout */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.75rem',
                alignItems: 'start'
              }}
            >
              {/* Left Column: Photo & Contact Action Card */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div
                  className="card-clean"
                  style={{
                    padding: '2rem 1.5rem',
                    backgroundColor: '#ffffff',
                    textAlign: 'center',
                    border: '1px solid var(--border)'
                  }}
                >
                  {/* Portrait Photo */}
                  <div
                    style={{
                      width: '180px',
                      height: '225px',
                      margin: '0 auto 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: '3px solid var(--gold-500)',
                      boxShadow: 'var(--shadow-card)',
                      overflow: 'hidden',
                      backgroundColor: 'var(--cream)'
                    }}
                  >
                    {registration.photoUrl ? (
                      <img
                        src={registration.photoUrl}
                        alt={registration.name}
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
                          gap: '0.5rem'
                        }}
                      >
                        <User size={48} color="var(--gold-700)" />
                        <span style={{ fontSize: '0.8rem' }}>No Photo Uploaded</span>
                      </div>
                    )}
                  </div>

                  <h2 style={{ fontSize: '1.35rem', color: 'var(--ink)', marginBottom: '0.2rem' }}>
                    {registration.name || 'Unnamed Candidate'}
                  </h2>

                  <div style={{ color: 'var(--maroon-800)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    {registration.age ? `${registration.age} Yrs` : ''} • {registration.gender === 'Female' ? 'Bride' : 'Groom'} • {registration.maritalStatus || 'Unmarried'}
                  </div>

                  <div style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
                    <StatusBadge status={registration.status} />
                  </div>

                  {/* Status Switcher */}
                  <div
                    className="no-print"
                    style={{
                      background: 'var(--surface-alt)',
                      padding: '1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)',
                      textAlign: 'left',
                      marginBottom: '1.25rem'
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Change Status:
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                      <button
                        type="button"
                        disabled={statusUpdating}
                        onClick={() => handleStatusChange(REGISTRATION_STATUS.NEW)}
                        className={`btn btn-sm ${registration.status === REGISTRATION_STATUS.NEW ? 'btn-primary' : 'btn-secondary'}`}
                      >
                        New
                      </button>
                      <button
                        type="button"
                        disabled={statusUpdating}
                        onClick={() => handleStatusChange(REGISTRATION_STATUS.CONTACTED)}
                        className={`btn btn-sm ${registration.status === REGISTRATION_STATUS.CONTACTED ? 'btn-primary' : 'btn-secondary'}`}
                      >
                        Contacted
                      </button>
                      <button
                        type="button"
                        disabled={statusUpdating}
                        onClick={() => handleStatusChange(REGISTRATION_STATUS.SHORTLISTED)}
                        className={`btn btn-sm ${registration.status === REGISTRATION_STATUS.SHORTLISTED ? 'btn-primary' : 'btn-secondary'}`}
                      >
                        Shortlisted
                      </button>
                      <button
                        type="button"
                        disabled={statusUpdating}
                        onClick={() => handleStatusChange(REGISTRATION_STATUS.CLOSED)}
                        className={`btn btn-sm ${registration.status === REGISTRATION_STATUS.CLOSED ? 'btn-primary' : 'btn-secondary'}`}
                      >
                        Closed
                      </button>
                    </div>
                  </div>

                  {/* Direct Actions */}
                  <div className="no-print" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {cleanPhone ? (
                      <a
                        href={`tel:${cleanPhone}`}
                        className="btn btn-primary btn-sm"
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        <Phone size={14} />
                        <span>Call {registration.phone}</span>
                      </a>
                    ) : null}

                    {cleanPhone ? (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                        style={{ width: '100%', justifyContent: 'center', borderColor: '#86efac', color: '#15803d' }}
                      >
                        <MessageCircle size={14} color="#15803d" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    ) : null}

                    {registration.email ? (
                      <a
                        href={`mailto:${registration.email}`}
                        className="btn btn-secondary btn-sm"
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        <Mail size={14} />
                        <span>{registration.email}</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Right Column: Tabulated Bio-Data */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Print Title Header (Visible only on print) */}
                <div style={{ display: 'none' }} className="print-only">
                  <h1 className="font-tamil-brand" style={{ fontSize: '1.6rem', color: '#000000', textAlign: 'center', margin: '0 0 0.5rem' }}>
                    {BRAND.tamilName}
                  </h1>
                  <div style={{ textAlign: 'center', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: 600 }}>
                    {BRAND.englishName} — Matrimonial Bio-Data Profile ({registration.registrationId || registration.id})
                  </div>
                </div>

                {/* Section 1: Basic & Social Profile */}
                <div className="card-clean" style={{ padding: '1.25rem 1.5rem', backgroundColor: '#ffffff', border: '1px solid var(--border)' }}>
                  <h3 style={{ color: 'var(--maroon-900)', fontSize: '1rem', marginBottom: '0.85rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <User size={16} />
                    <span>Basic & Personal Details</span>
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.875rem' }}>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Profile Registered For:</span>
                      <strong>{registration.profileFor || 'Self'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Date of Birth & Age:</span>
                      <strong>{registration.dateOfBirth || '—'} ({registration.age || '—'} Years)</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Marital Status:</span>
                      <strong>{registration.maritalStatus || 'Unmarried'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Religion & Caste:</span>
                      <strong style={{ color: 'var(--maroon-900)' }}>{registration.casteReligion || '—'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Native Place:</span>
                      <strong>{registration.nativePlace || '—'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Current Location:</span>
                      <strong>{registration.location || '—'}</strong>
                    </div>
                  </div>
                </div>

                {/* Section 2: Family Background */}
                <div className="card-clean" style={{ padding: '1.25rem 1.5rem', backgroundColor: '#ffffff', border: '1px solid var(--border)' }}>
                  <h3 style={{ color: 'var(--maroon-900)', fontSize: '1rem', marginBottom: '0.85rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem' }}>
                    Family Background
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.875rem' }}>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Father Name:</span>
                      <strong>{registration.fatherName || '—'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Father Occupation:</span>
                      <strong>{registration.fatherOccupation || '—'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Mother Name:</span>
                      <strong>{registration.motherName || '—'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Mother Occupation:</span>
                      <strong>{registration.motherOccupation || '—'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Family Type:</span>
                      <strong>{registration.familyType || '—'}</strong>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Siblings Details:</span>
                      <strong style={{ whiteSpace: 'pre-line' }}>{registration.siblings || 'None'}</strong>
                    </div>
                  </div>
                </div>

                {/* Section 3: Birth & Horoscope Details */}
                <div className="card-clean" style={{ padding: '1.25rem 1.5rem', backgroundColor: '#ffffff', border: '1px solid var(--border)' }}>
                  <h3 style={{ color: 'var(--maroon-900)', fontSize: '1rem', marginBottom: '0.85rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Sparkles size={16} />
                    <span>Horoscope & Astrology Details</span>
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.875rem' }}>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Birth Star (Nakshatra):</span>
                      <strong style={{ color: 'var(--maroon-900)' }}>{registration.birthStar || '—'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Zodiac Sign (Rasi):</span>
                      <strong style={{ color: 'var(--maroon-900)' }}>{registration.zodiacSign || '—'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Lagnam:</span>
                      <strong>{registration.lagnam || '—'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Gothram:</span>
                      <strong>{registration.gothram || '—'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Dosham Status:</span>
                      <strong>{registration.dosham || 'None'}</strong>
                    </div>
                  </div>
                </div>

                {/* Section 4: Education & Occupation */}
                <div className="card-clean" style={{ padding: '1.25rem 1.5rem', backgroundColor: '#ffffff', border: '1px solid var(--border)' }}>
                  <h3 style={{ color: 'var(--maroon-900)', fontSize: '1rem', marginBottom: '0.85rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Briefcase size={16} />
                    <span>Education, Career & Income</span>
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.875rem' }}>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Height:</span>
                      <strong>{registration.height || '—'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Highest Education:</span>
                      <strong style={{ color: 'var(--maroon-900)' }}>{registration.education || '—'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Occupation / Title:</span>
                      <strong style={{ color: 'var(--maroon-900)' }}>{registration.occupation || '—'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Employment Sector:</span>
                      <strong>{registration.employedIn || '—'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Monthly Income:</span>
                      <strong>{registration.income || '—'}</strong>
                    </div>
                  </div>
                </div>

                {/* Section 5: Expectations */}
                <div className="card-clean" style={{ padding: '1.25rem 1.5rem', backgroundColor: 'var(--gold-50)', border: '1px solid var(--border)' }}>
                  <h3 style={{ color: 'var(--maroon-900)', fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <HeartHandshake size={16} />
                    <span>Partner Expectations</span>
                  </h3>
                  <p style={{ color: 'var(--ink)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
                    {registration.expectation || 'No specific expectations specified.'}
                  </p>
                </div>

                {/* Section 6: Administrative Metadata */}
                <div
                  style={{
                    background: '#ffffff',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    fontSize: '0.75rem',
                    color: 'var(--muted)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <div>
                    Registration ID: <strong style={{ color: 'var(--maroon-900)' }}>{registration.registrationId || registration.id}</strong>
                  </div>
                  <div>
                    Registered On: <strong>{formatDate(registration.createdAt)}</strong>
                  </div>
                  <div>
                    Consent Declaration: <strong>{registration.consentAccepted ? 'Confirmed & Accepted' : 'No'}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Delete Confirmation Modal */}
        <ConfirmDialog
          isOpen={showDeleteModal}
          title="Delete Registration Profile"
          message={`Are you sure you want to permanently delete the profile for "${registration?.name || 'this candidate'}"?`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          isLoading={isDeleting}
          isDestructive={true}
        />
      </div>
    </ErrorBoundary>
  );
}
