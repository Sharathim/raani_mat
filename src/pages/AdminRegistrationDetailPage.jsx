import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AdminHeader } from '../components/admin/AdminHeader';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { OrnateCorner, GoldDivider } from '../components/common/DecorativeElements';
import {
  getRegistration,
  updateRegistrationStatus,
  deleteRegistration
} from '../services/registrationService';
import { formatDate } from '../utils/helpers';
import { REGISTRATION_STATUS } from '../utils/constants';
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
  ShieldCheck
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
      try {
        const data = await getRegistration(id);
        setRegistration(data);
      } catch (err) {
        console.error('Failed to load profile:', err);
        setError(err.message || 'சுயவிவரத்தை ஏற்றுவதில் பிழை ஏற்பட்டது.');
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
      setError(err.message || 'நிலையை மாற்றுவதில் பிழை ஏற்பட்டது.');
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
      setError(err.message || 'பதிவை நீக்குவதில் பிழை ஏற்பட்டது.');
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--ivory)' }}>
        <AdminHeader />
        <LoadingSpinner text="மணமக்கள் சுயவிவரத்தை ஏற்றுகிறது... (Loading profile...)" fullPage />
      </div>
    );
  }

  if (error || !registration) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--ivory)' }}>
        <AdminHeader />
        <div className="container" style={{ padding: '3rem 1.25rem' }}>
          <ErrorBanner message={error || 'பதிவு கிடைக்கவில்லை (Profile not found).'} />
          <Link to="/admin" className="btn btn-secondary">
            <ArrowLeft size={16} />
            <span>டாஷ்போர்டிற்கு திரும்பு (Back to Dashboard)</span>
          </Link>
        </div>
      </div>
    );
  }

  const cleanPhone = registration.phone?.replace(/\D/g, '') || '';
  const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(`வணக்கம், ராணி திருமண சேவை மையம் (Rani Matrimony) சார்பாக தொடர்பு கொள்கிறோம்.`)}`;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--ivory)', display: 'flex', flexDirection: 'column' }}>
      <div className="no-print">
        <AdminHeader />
      </div>

      <main style={{ flex: 1, padding: '2rem 1.25rem 4rem' }}>
        <div className="container">
          {/* Top Back & Actions Navigation Bar */}
          <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <Link to="/admin" className="btn btn-secondary btn-sm">
              <ArrowLeft size={16} />
              <span>பதிவுகள் பட்டியல் (Back to Registrations)</span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={handlePrint}
                className="btn btn-secondary btn-sm"
                title="Print Bio-Data"
              >
                <Printer size={15} />
                <span>அச்சிடுக (Print Bio-Data)</span>
              </button>

              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="btn btn-danger btn-sm"
                title="Delete Registration"
              >
                <Trash2 size={15} />
                <span>பதிவை நீக்கு (Delete)</span>
              </button>
            </div>
          </div>

          {/* Two-Column Grid Layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              alignItems: 'start'
            }}
          >
            {/* Left Column: Photo & Core Contact Action Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div
                className="card-ornate"
                style={{
                  padding: '2rem 1.5rem',
                  backgroundColor: 'var(--paper)',
                  textAlign: 'center',
                  border: '2px solid var(--gold-500)',
                  position: 'relative'
                }}
              >
                <OrnateCorner position="top-left" />
                <OrnateCorner position="top-right" />

                {/* Portrait Photo with Ornate Frame */}
                <div
                  style={{
                    width: '200px',
                    height: '250px',
                    margin: '0 auto 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: '3.5px solid var(--gold-500)',
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
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', gap: '0.5rem' }}>
                      <User size={56} color="var(--gold-700)" />
                      <span style={{ fontSize: '0.85rem' }}>புகைப்படம் இணைக்கப்படவில்லை</span>
                    </div>
                  )}
                </div>

                <h2 className="font-tamil-serif" style={{ fontSize: '1.4rem', color: 'var(--maroon-950)', marginBottom: '0.2rem' }}>
                  {registration.name}
                </h2>

                <div style={{ color: 'var(--maroon-800)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                  {registration.age} வயது • {registration.gender === 'Female' ? 'Bride (பெண் வரன்)' : 'Groom (ஆண் வரன்)'}
                </div>

                <div style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
                  <StatusBadge status={registration.status} />
                </div>

                {/* Status Selector Box */}
                <div className="no-print" style={{ background: 'var(--cream)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', textAlign: 'left', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--maroon-950)', marginBottom: '0.4rem' }}>
                    நிலையை மாற்றவும் (Change Status):
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                    <button
                      type="button"
                      disabled={statusUpdating}
                      onClick={() => handleStatusChange(REGISTRATION_STATUS.NEW)}
                      className={`btn btn-sm ${registration.status === REGISTRATION_STATUS.NEW ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ fontSize: '0.75rem', padding: '0.35rem 0.5rem' }}
                    >
                      New
                    </button>
                    <button
                      type="button"
                      disabled={statusUpdating}
                      onClick={() => handleStatusChange(REGISTRATION_STATUS.CONTACTED)}
                      className={`btn btn-sm ${registration.status === REGISTRATION_STATUS.CONTACTED ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ fontSize: '0.75rem', padding: '0.35rem 0.5rem' }}
                    >
                      Contacted
                    </button>
                    <button
                      type="button"
                      disabled={statusUpdating}
                      onClick={() => handleStatusChange(REGISTRATION_STATUS.SHORTLISTED)}
                      className={`btn btn-sm ${registration.status === REGISTRATION_STATUS.SHORTLISTED ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ fontSize: '0.75rem', padding: '0.35rem 0.5rem' }}
                    >
                      Shortlisted
                    </button>
                    <button
                      type="button"
                      disabled={statusUpdating}
                      onClick={() => handleStatusChange(REGISTRATION_STATUS.CLOSED)}
                      className={`btn btn-sm ${registration.status === REGISTRATION_STATUS.CLOSED ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ fontSize: '0.75rem', padding: '0.35rem 0.5rem' }}
                    >
                      Closed
                    </button>
                  </div>
                </div>

                {/* Direct Communication Buttons */}
                <div className="no-print" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <a
                    href={`tel:${cleanPhone}`}
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Phone size={15} />
                    <span>நேரடி அழைப்பு: {registration.phone}</span>
                  </a>

                  {cleanPhone && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%', justifyContent: 'center', borderColor: '#25D366', color: '#128C7E' }}
                    >
                      <MessageCircle size={15} color="#25D366" />
                      <span>WhatsApp இல் தொடர்பு கொள்க</span>
                    </a>
                  )}

                  {registration.email && (
                    <a
                      href={`mailto:${registration.email}`}
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <Mail size={15} />
                      <span>{registration.email}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Tabulated Bio-Data */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Section 1: Basic & Social Profile */}
              <div className="card-ornate" style={{ padding: '1.5rem', backgroundColor: 'var(--paper)' }}>
                <h3 className="font-tamil-serif" style={{ color: 'var(--maroon-900)', fontSize: '1.15rem', marginBottom: '1rem', borderBottom: '1.5px solid var(--gold-500)', paddingBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={18} color="var(--gold-700)" />
                  <span>அடிப்படை விவரங்கள் (Basic Details)</span>
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', fontSize: '0.9rem' }}>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>பதிவு யாருக்காக:</span>
                    <strong>{registration.profileFor || 'Self'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>பிறந்த தேதி & வயது:</span>
                    <strong>{registration.dateOfBirth} ({registration.age} வயது)</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>திருமண நிலை:</span>
                    <strong>{registration.maritalStatus}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>மதம் / சாதி பிரிவு:</span>
                    <strong style={{ color: 'var(--maroon-900)' }}>{registration.casteReligion || '—'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>சொந்த ஊர்:</span>
                    <strong>{registration.nativePlace || '—'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>தற்போதைய இருப்பிடம்:</span>
                    <strong>{registration.location || '—'}</strong>
                  </div>
                </div>
              </div>

              {/* Section 2: Family Background */}
              <div className="card-ornate" style={{ padding: '1.5rem', backgroundColor: 'var(--paper)' }}>
                <h3 className="font-tamil-serif" style={{ color: 'var(--maroon-900)', fontSize: '1.15rem', marginBottom: '1rem', borderBottom: '1.5px solid var(--gold-500)', paddingBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Heart size={18} color="var(--gold-700)" />
                  <span>குடும்ப விவரங்கள் (Family Details)</span>
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', fontSize: '0.9rem' }}>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>தந்தை பெயர்:</span>
                    <strong>{registration.fatherName || '—'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>தந்தை தொழில்:</span>
                    <strong>{registration.fatherOccupation || '—'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>தாய் பெயர்:</span>
                    <strong>{registration.motherName || '—'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>தாய் தொழில்:</span>
                    <strong>{registration.motherOccupation || '—'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>குடும்ப அமைப்பு:</span>
                    <strong>{registration.familyType || '—'}</strong>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>உடன் பிறந்தவர்கள்:</span>
                    <strong style={{ whiteSpace: 'pre-line' }}>{registration.siblings || 'உடன்பிறப்புகள் இல்லை'}</strong>
                  </div>
                </div>
              </div>

              {/* Section 3: Birth & Horoscope Details */}
              <div className="card-ornate" style={{ padding: '1.5rem', backgroundColor: 'var(--paper)' }}>
                <h3 className="font-tamil-serif" style={{ color: 'var(--maroon-900)', fontSize: '1.15rem', marginBottom: '1rem', borderBottom: '1.5px solid var(--gold-500)', paddingBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={18} color="var(--gold-700)" />
                  <span>ஜாதகம் & பிறப்பு விவரம் (Horoscope & Astro Details)</span>
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', fontSize: '0.9rem' }}>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>நட்சத்திரம் (Birth Star):</span>
                    <strong style={{ color: 'var(--maroon-900)', fontSize: '1rem' }}>{registration.birthStar || '—'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>ராசி (Zodiac):</span>
                    <strong style={{ color: 'var(--maroon-900)', fontSize: '1rem' }}>{registration.zodiacSign || '—'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>லக்கினம் (Lagnam):</span>
                    <strong>{registration.lagnam || '—'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>கோத்திரம் (Gothram):</span>
                    <strong>{registration.gothram || '—'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>தோஷம் விவரம் (Dosham):</span>
                    <strong>{registration.dosham || 'None'}</strong>
                  </div>
                </div>
              </div>

              {/* Section 4: Education & Occupation */}
              <div className="card-ornate" style={{ padding: '1.5rem', backgroundColor: 'var(--paper)' }}>
                <h3 className="font-tamil-serif" style={{ color: 'var(--maroon-900)', fontSize: '1.15rem', marginBottom: '1rem', borderBottom: '1.5px solid var(--gold-500)', paddingBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={18} color="var(--gold-700)" />
                  <span>கல்வி & தொழில் விவரங்கள் (Career & Income)</span>
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', fontSize: '0.9rem' }}>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>உயரம் (Height):</span>
                    <strong>{registration.height || '—'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>கல்வி தகுதி:</span>
                    <strong style={{ color: 'var(--maroon-900)' }}>{registration.education || '—'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>பணி / பதவி:</span>
                    <strong style={{ color: 'var(--maroon-900)' }}>{registration.occupation || '—'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>பணிபுரியும் துறை:</span>
                    <strong>{registration.employedIn || '—'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.8rem' }}>மாத வருமானம்:</span>
                    <strong>{registration.income || '—'}</strong>
                  </div>
                </div>
              </div>

              {/* Section 5: Expectations */}
              <div className="card-ornate" style={{ padding: '1.5rem', backgroundColor: '#fffcf7' }}>
                <h3 className="font-tamil-serif" style={{ color: 'var(--maroon-900)', fontSize: '1.15rem', marginBottom: '0.75rem', borderBottom: '1.5px solid var(--gold-500)', paddingBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HeartHandshake size={18} color="var(--gold-700)" />
                  <span>வரன் பற்றிய எதிர்பார்ப்புகள் (Partner Expectations)</span>
                </h3>
                <p style={{ color: 'var(--ink)', fontSize: '0.95rem', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                  {registration.expectation || 'குறிப்பிட்ட எதிர்பார்ப்புகள் இல்லை.'}
                </p>
              </div>

              {/* Section 6: Administrative Metadata */}
              <div style={{ background: 'var(--cream)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--muted)', display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div>
                  பதிவு எண்: <strong style={{ color: 'var(--maroon-900)' }}>{registration.registrationId || registration.id}</strong>
                </div>
                <div>
                  பதிவு செய்த நேரம்: <strong>{formatDate(registration.createdAt)}</strong>
                </div>
                <div>
                  கடைசி மாற்றம்: <strong>{formatDate(registration.updatedAt)}</strong>
                </div>
                <div>
                  உறுதிமொழி ஒப்புதல்: <strong>{registration.consentAccepted ? 'ஏற்கப்பட்டது (Accepted)' : 'இல்லை'}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={showDeleteModal}
        title="பதிவை நீக்கவா? (Delete Registration)"
        message={`"${registration.name}" அவர்களின் மணமக்கள் பதிவை நிரந்தரமாக நீக்க விரும்புகிறீர்களா?`}
        confirmText="நிரந்தரமாக நீக்கு (Delete)"
        cancelText="ரத்து செய் (Cancel)"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        isLoading={isDeleting}
        isDestructive={true}
      />
    </div>
  );
}
