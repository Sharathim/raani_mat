import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AdminLayout } from '../components/admin/AdminLayout';
import { ProfilePhotoUploader } from '../components/registration/ProfilePhotoUploader';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { createRegistration } from '../services/registrationService';
import {
  INITIAL_FORM_STATE,
  REGISTRATION_STATUS,
  PROFILE_FOR_OPTIONS,
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  ZODIAC_SIGNS,
  NAKSHATRAS,
  NAKSHATRA_TO_RASI_MAP,
  LAGNAMS,
  INCOME_OPTIONS,
  EDUCATION_SUGGESTIONS,
  RELIGIONS,
  COMMUNITY_CATEGORIES,
  getCastesForReligion
} from '../utils/constants';
import { calculateAge } from '../utils/helpers';
import {
  ArrowLeft,
  User,
  Phone,
  Users,
  Sparkles,
  Briefcase,
  Camera,
  HeartHandshake,
  Save,
  CheckCircle2
} from 'lucide-react';

export function AdminCandidateNewPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ...INITIAL_FORM_STATE,
    status: REGISTRATION_STATUS.REVIEWED,
    consentAccepted: true // Auto-accepted for admin created records
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdId, setCreatedId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Auto-compute age if DOB changes
      if (name === 'dateOfBirth') {
        const computedAge = calculateAge(value);
        if (computedAge) {
          updated.age = computedAge;
        }
      }

      // Auto-suggest Zodiac Sign if Birth Star selected
      if (name === 'birthStar' && NAKSHATRA_TO_RASI_MAP[value]) {
        if (!prev.zodiacSign || prev.zodiacSign === '') {
          updated.zodiacSign = NAKSHATRA_TO_RASI_MAP[value];
        }
      }

      // Reset caste if religion changes and current caste isn't in new religion list
      if (name === 'religion') {
        const validCastes = getCastesForReligion(value);
        if (updated.caste && !validCastes.includes(updated.caste)) {
          updated.caste = '';
          updated.customCaste = '';
        }
      }

      // Keep composite casteReligion in sync
      const currentRel = name === 'religion' ? value : (updated.religion || 'Hindu');
      const currentCasteVal = name === 'caste' ? value : (updated.caste || '');
      const activeCaste = currentCasteVal.includes('Other') && (updated.customCaste || name === 'customCaste')
        ? (name === 'customCaste' ? value : updated.customCaste)
        : currentCasteVal;
      const currentSub = name === 'subCaste' ? value : (updated.subCaste || '');

      let composite = currentRel;
      if (activeCaste) {
        composite += ` / ${activeCaste}`;
      }
      if (currentSub) {
        composite += ` (${currentSub})`;
      }
      updated.casteReligion = composite;

      return updated;
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handlePhotoChange = ({ photoUrl, photoPublicId }) => {
    setFormData((prev) => ({
      ...prev,
      photoUrl,
      photoPublicId
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Candidate full name is required';
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.dateOfBirth && !formData.age) {
      newErrors.age = 'Date of birth or age is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const created = await createRegistration(formData);
      setIsSuccess(true);
      setCreatedId(created.registrationId || created.id);
      setTimeout(() => {
        navigate('/admin/profiles');
      }, 1500);
    } catch (err) {
      console.error('Failed to create candidate:', err);
      setSubmitError(err.message || 'Failed to save candidate. Please verify the input values.');
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container" style={{ maxWidth: '860px' }}>
            {/* Back to Profiles Link */}
            <div style={{ marginBottom: '1rem' }}>
              <Link to="/admin/profiles" className="admin-back-link">
                <ArrowLeft size={16} />
                <span>Back to Profiles</span>
              </Link>
            </div>

            {/* Page Header */}
            <div className="admin-page-titlebar" style={{ marginBottom: '1.25rem' }}>
              <div className="admin-page-title-group">
                <h1 className="admin-page-heading">
                  Register New Profile
                </h1>
                <p className="admin-page-subheading">
                  Create and register a matrimonial applicant profile in the database.
                </p>
              </div>
            </div>

            {/* Success Notification Banner */}
            {isSuccess && (
              <div className="admin-success-banner" role="alert">
                <CheckCircle2 size={22} color="var(--success)" />
                <div>
                  <strong>Candidate Created Successfully!</strong>
                  <p style={{ margin: '2px 0 0', fontSize: '0.85rem' }}>
                    Registration ID: <strong>{createdId}</strong>. Redirecting to candidates list...
                  </p>
                </div>
              </div>
            )}

            {/* Error Notification */}
            <ErrorBanner message={submitError} onDismiss={() => setSubmitError(null)} />

            {/* Candidate Registration Form */}
            <form onSubmit={handleSubmit} className="admin-register-form card-clean">
              {/* SECTION 1: Personal & Basic Info */}
              <div className="admin-form-section">
                <div className="admin-form-section-header">
                  <div className="admin-form-section-icon">
                    <User size={18} />
                  </div>
                  <div>
                    <h2 className="admin-form-section-title">Personal Information</h2>
                    <p className="admin-form-section-desc">Candidate identity, age, and relationship details</p>
                  </div>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Profile Status</label>
                    <select
                      name="status"
                      value={formData.status || REGISTRATION_STATUS.REVIEWED}
                      onChange={handleChange}
                      className="admin-form-input"
                    >
                      <option value={REGISTRATION_STATUS.REVIEWED}>Reviewed (Default)</option>
                      <option value={REGISTRATION_STATUS.NEW}>New</option>
                      <option value={REGISTRATION_STATUS.COMPLETED}>Completed</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Profile Created For *</label>
                    <select
                      name="profileFor"
                      value={formData.profileFor}
                      onChange={handleChange}
                      className="admin-form-input"
                    >
                      {PROFILE_FOR_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Candidate Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Karthika Subramanian"
                      className={`admin-form-input ${errors.name ? 'error' : ''}`}
                    />
                    {errors.name && <span className="admin-form-error">{errors.name}</span>}
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Gender *</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`admin-form-input ${errors.gender ? 'error' : ''}`}
                    >
                      {GENDER_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    {errors.gender && <span className="admin-form-error">{errors.gender}</span>}
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Marital Status *</label>
                    <select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                      className="admin-form-input"
                    >
                      {MARITAL_STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Age (Years) *</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="e.g. 25"
                      min="18"
                      max="80"
                      className={`admin-form-input ${errors.age ? 'error' : ''}`}
                    />
                    {errors.age && <span className="admin-form-error">{errors.age}</span>}
                  </div>
                </div>
              </div>

              {/* SECTION 2: Contact & Location Details */}
              <div className="admin-form-section">
                <div className="admin-form-section-header">
                  <div className="admin-form-section-icon">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h2 className="admin-form-section-title">Contact & Location Details</h2>
                    <p className="admin-form-section-desc">Phone numbers, email, and native place</p>
                  </div>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Primary Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9840123456"
                      className={`admin-form-input ${errors.phone ? 'error' : ''}`}
                    />
                    {errors.phone && <span className="admin-form-error">{errors.phone}</span>}
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. candidate@example.com"
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Current Living Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Anna Nagar, Chennai"
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Native Place / Town</label>
                    <input
                      type="text"
                      name="nativePlace"
                      value={formData.nativePlace}
                      onChange={handleChange}
                      placeholder="e.g. Madurai"
                      className="admin-form-input"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Family Information */}
              <div className="admin-form-section">
                <div className="admin-form-section-header">
                  <div className="admin-form-section-icon">
                    <Users size={18} />
                  </div>
                  <div>
                    <h2 className="admin-form-section-title">Family Information</h2>
                    <p className="admin-form-section-desc">Parents background and family structure</p>
                  </div>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Father's Name</label>
                    <input
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      placeholder="Father's full name"
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Father's Occupation</label>
                    <input
                      type="text"
                      name="fatherOccupation"
                      value={formData.fatherOccupation}
                      onChange={handleChange}
                      placeholder="e.g. Retired Govt Officer / Business"
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Mother's Name</label>
                    <input
                      type="text"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      placeholder="Mother's full name"
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Mother's Occupation</label>
                    <input
                      type="text"
                      name="motherOccupation"
                      value={formData.motherOccupation}
                      onChange={handleChange}
                      placeholder="e.g. Home Maker / Teacher"
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Family Type</label>
                    <select
                      name="familyType"
                      value={formData.familyType}
                      onChange={handleChange}
                      className="admin-form-input"
                    >
                      <option value="Nuclear Family">Nuclear Family</option>
                      <option value="Joint Family">Joint Family</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Siblings</label>
                    <input
                      type="text"
                      name="siblings"
                      value={formData.siblings}
                      onChange={handleChange}
                      placeholder="e.g. 1 Elder Brother (Married)"
                      className="admin-form-input"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: Horoscope & Astrological Details */}
              <div className="admin-form-section">
                <div className="admin-form-section-header">
                  <div className="admin-form-section-icon">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h2 className="admin-form-section-title">Horoscope & Astrological Details</h2>
                    <p className="admin-form-section-desc">Nakshatra, Rasi, Lagnam, and Gothram</p>
                  </div>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Birth Star (Nakshatra)</label>
                    <select
                      name="birthStar"
                      value={formData.birthStar}
                      onChange={handleChange}
                      className="admin-form-input"
                    >
                      <option value="">-- Select Nakshatra --</option>
                      {NAKSHATRAS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Zodiac Sign (Rasi)</label>
                    <select
                      name="zodiacSign"
                      value={formData.zodiacSign}
                      onChange={handleChange}
                      className="admin-form-input"
                    >
                      <option value="">-- Select Rasi --</option>
                      {ZODIAC_SIGNS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Lagnam</label>
                    <select
                      name="lagnam"
                      value={formData.lagnam}
                      onChange={handleChange}
                      className="admin-form-input"
                    >
                      <option value="">-- Select Lagnam --</option>
                      {LAGNAMS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Gothram</label>
                    <input
                      type="text"
                      name="gothram"
                      value={formData.gothram}
                      onChange={handleChange}
                      placeholder="e.g. Siva / Vishnu / Kasi"
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Dosham</label>
                    <select
                      name="dosham"
                      value={formData.dosham}
                      onChange={handleChange}
                      className="admin-form-input"
                    >
                      <option value="None">None (No Dosham)</option>
                      <option value="Sevvai Dosham">Sevvai Dosham (Mars)</option>
                      <option value="Rahu-Ketu Dosham">Rahu-Ketu Dosham</option>
                      <option value="Parigara Dosham">Parigara Dosham</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 5: Education & Profession */}
              <div className="admin-form-section">
                <div className="admin-form-section-header">
                  <div className="admin-form-section-icon">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <h2 className="admin-form-section-title">Education & Profession</h2>
                    <p className="admin-form-section-desc">Degrees, employment, income, and community</p>
                  </div>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Height</label>
                    <input
                      type="text"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="e.g. 5 ft 5 in (165 cm)"
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Education / Degree</label>
                    <input
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      placeholder="e.g. B.E (Computer Science)"
                      list="education-suggestions-list"
                      className="admin-form-input"
                    />
                    <datalist id="education-suggestions-list">
                      {EDUCATION_SUGGESTIONS.map((ed) => (
                        <option key={ed} value={ed} />
                      ))}
                    </datalist>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Occupation / Job Title</label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      placeholder="e.g. Software Engineer, TCS"
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Employed In</label>
                    <select
                      name="employedIn"
                      value={formData.employedIn}
                      onChange={handleChange}
                      className="admin-form-input"
                    >
                      <option value="Private Sector">Private Sector</option>
                      <option value="Government / PSU">Government / PSU</option>
                      <option value="Business / Self-Employed">Business / Self-Employed</option>
                      <option value="Defense">Defense</option>
                      <option value="Not Employed">Not Employed</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Monthly Income</label>
                    <select
                      name="income"
                      value={formData.income}
                      onChange={handleChange}
                      className="admin-form-input"
                    >
                      <option value="">-- Select Income Range --</option>
                      {INCOME_OPTIONS.map((inc) => (
                        <option key={inc} value={inc}>{inc}</option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Religion</label>
                    <select
                      name="religion"
                      value={formData.religion || 'Hindu'}
                      onChange={handleChange}
                      className="admin-form-input"
                    >
                      {RELIGIONS.map((r) => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Community Category</label>
                    <select
                      name="community"
                      value={formData.community}
                      onChange={handleChange}
                      className="admin-form-input"
                    >
                      <option value="">-- Select Community Category --</option>
                      {COMMUNITY_CATEGORIES.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Caste / Community</label>
                    <select
                      name="caste"
                      value={formData.caste}
                      onChange={handleChange}
                      className="admin-form-input"
                    >
                      <option value="">-- Select Caste --</option>
                      {getCastesForReligion(formData.religion || 'Hindu').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Subcaste / Division (Optional)</label>
                    <input
                      type="text"
                      name="subCaste"
                      value={formData.subCaste}
                      onChange={handleChange}
                      placeholder="e.g. Saiva Pillai / Vadakalai"
                      className="admin-form-input"
                    />
                  </div>

                  {formData.caste && formData.caste.includes('Other') && (
                    <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                      <label className="admin-form-label">Specify Custom Caste Name</label>
                      <input
                        type="text"
                        name="customCaste"
                        value={formData.customCaste}
                        onChange={handleChange}
                        placeholder="Enter custom caste name"
                        className="admin-form-input"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION 6: Profile Photo */}
              <div className="admin-form-section">
                <div className="admin-form-section-header">
                  <div className="admin-form-section-icon">
                    <Camera size={18} />
                  </div>
                  <div>
                    <h2 className="admin-form-section-title">Candidate Profile Photo</h2>
                    <p className="admin-form-section-desc">Upload applicant portrait photo or paste image URL</p>
                  </div>
                </div>

                <div style={{ maxWidth: '420px', margin: '0.5rem 0' }}>
                  <ProfilePhotoUploader
                    photoUrl={formData.photoUrl}
                    onPhotoChange={handlePhotoChange}
                    error={null}
                  />
                </div>
              </div>

              {/* SECTION 7: Partner Expectations & Notes */}
              <div className="admin-form-section">
                <div className="admin-form-section-header">
                  <div className="admin-form-section-icon">
                    <HeartHandshake size={18} />
                  </div>
                  <div>
                    <h2 className="admin-form-section-title">Partner Expectations & Admin Notes</h2>
                    <p className="admin-form-section-desc">Specific requirements, preferences, and remarks</p>
                  </div>
                </div>

                <div className="admin-form-group">
                  <textarea
                    name="expectation"
                    value={formData.expectation}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Enter partner preferences, family background requirements, education criteria, etc."
                    className="admin-form-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </div>

              {/* FORM ACTION BUTTONS */}
              <div className="admin-form-actions-bar">
                <Link
                  to="/admin/candidates"
                  className="btn btn-secondary admin-form-cancel-btn"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="btn btn-primary admin-form-submit-btn"
                >
                  <Save size={18} />
                  <span>{isSubmitting ? 'Saving Profile...' : 'Save Candidate'}</span>
                </button>
              </div>
            </form>
      </div>
    </AdminLayout>
  );
}
