import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BrandHeader } from '../components/common/BrandHeader';
import { Footer } from '../components/common/Footer';
import { ProgressStepper } from '../components/common/ProgressStepper';
import { FormField } from '../components/common/FormField';
import { SelectField } from '../components/common/SelectField';
import { TextAreaField } from '../components/common/TextAreaField';
import { ProfilePhotoUploader } from '../components/registration/ProfilePhotoUploader';
import { ReviewCard } from '../components/registration/ReviewCard';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { OrnateCorner } from '../components/common/DecorativeElements';
import {
  INITIAL_FORM_STATE,
  PROFILE_FOR_OPTIONS,
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  ZODIAC_SIGNS,
  NAKSHATRAS,
  NAKSHATRA_TO_RASI_MAP,
  LAGNAMS,
  INCOME_OPTIONS,
  EDUCATION_SUGGESTIONS,
  BRAND
} from '../utils/constants';
import { calculateAge, validateStep } from '../utils/helpers';
import { createRegistration } from '../services/registrationService';
import {
  ArrowLeft,
  ArrowRight,
  Send,
  Loader2,
  Sparkles,
  Info
} from 'lucide-react';

export function RegisterPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const saved = sessionStorage.getItem('rani_matrimony_form_draft');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_FORM_STATE;
      }
    }
    return INITIAL_FORM_STATE;
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Save form draft to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('rani_matrimony_form_draft', JSON.stringify(formData));
  }, [formData]);

  // Handle input change
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

      return updated;
    });

    // Clear field-level error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle photo upload change
  const handlePhotoChange = ({ photoUrl, photoPublicId }) => {
    setFormData((prev) => ({
      ...prev,
      photoUrl,
      photoPublicId
    }));
    if (errors.photo) {
      setErrors((prev) => ({ ...prev, photo: null }));
    }
  };

  // Step Navigation
  const handleNext = () => {
    const validation = validateStep(currentStep, formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setErrors({});
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleStepClick = (targetStep) => {
    if (targetStep < currentStep || completedSteps.includes(targetStep - 1)) {
      setErrors({});
      setCurrentStep(targetStep);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // Final Submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const validation = validateStep(7, formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const created = await createRegistration(formData);
      sessionStorage.removeItem('rani_matrimony_form_draft');
      navigate(`/register/success/${created.id || created.registrationId}`);
    } catch (err) {
      console.error('Submission failed:', err);
      setSubmitError(err.message || 'Unable to submit profile. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--ivory)' }}>
      <BrandHeader />

      <main style={{ flex: 1, padding: '2rem 1.25rem 5rem' }}>
        <div className="container-narrow">
          {/* Header Title */}
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <h1 className="font-tamil-brand" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)', color: 'var(--maroon-950)', margin: '0 0 0.25rem' }}>
              {BRAND.tamilName}
            </h1>
            <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold-800)', fontSize: '0.95rem', fontWeight: 600 }}>
              Matrimonial Profile Registration
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginTop: '0.35rem' }}>
              Complete the guided steps below to register your matrimonial profile.
            </p>
          </div>

          {/* Stepper Indicator */}
          <ProgressStepper
            currentStep={currentStep}
            onStepClick={handleStepClick}
            completedSteps={completedSteps}
          />

          {/* Error Banner */}
          <ErrorBanner message={submitError} onDismiss={() => setSubmitError(null)} />

          {/* Form Container Card */}
          <div
            className="card-clean"
            style={{
              padding: '2.25rem 1.75rem',
              backgroundColor: '#ffffff',
              border: '1px solid var(--border)',
              position: 'relative'
            }}
          >
            <OrnateCorner position="top-left" />
            <OrnateCorner position="top-right" />

            {/* Step 1: Basic Details */}
            {currentStep === 1 && (
              <div>
                <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                  <h3 style={{ color: 'var(--maroon-950)', fontSize: '1.15rem' }}>
                    Step 1: Basic & Contact Details
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    Select who this registration is for and provide basic identity details.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <SelectField
                    label="Profile For"
                    name="profileFor"
                    value={formData.profileFor}
                    onChange={handleChange}
                    options={PROFILE_FOR_OPTIONS}
                    required
                  />

                  <SelectField
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    options={GENDER_OPTIONS}
                    required
                  />
                </div>

                <FormField
                  label="Full Name of Bride / Groom"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Karthika Subramanian"
                  required
                  error={errors.name}
                />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <FormField
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    error={errors.dateOfBirth}
                  />

                  <FormField
                    label="Age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="25"
                    min="18"
                    max="90"
                    required
                    hint="Auto-calculated from date of birth"
                    error={errors.age}
                  />

                  <SelectField
                    label="Marital Status"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    options={MARITAL_STATUS_OPTIONS}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <FormField
                    label="Mobile Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9840123456"
                    required
                    error={errors.phone}
                  />

                  <FormField
                    label="Email Address (Optional)"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="karthika@example.com"
                    error={errors.email}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Family Details */}
            {currentStep === 2 && (
              <div>
                <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                  <h3 style={{ color: 'var(--maroon-950)', fontSize: '1.15rem' }}>
                    Step 2: Family Background
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    Provide information about parents, occupations, and siblings.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <FormField
                    label="Father's Full Name"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="e.g. Subramanian K"
                    required
                    error={errors.fatherName}
                  />

                  <FormField
                    label="Father's Occupation"
                    name="fatherOccupation"
                    value={formData.fatherOccupation}
                    onChange={handleChange}
                    placeholder="e.g. Government Officer / Business / Retired"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <FormField
                    label="Mother's Full Name"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    placeholder="e.g. Meenakshi S"
                    required
                    error={errors.motherName}
                  />

                  <FormField
                    label="Mother's Occupation"
                    name="motherOccupation"
                    value={formData.motherOccupation}
                    onChange={handleChange}
                    placeholder="e.g. Home Maker / Teacher"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <SelectField
                    label="Family Type"
                    name="familyType"
                    value={formData.familyType}
                    onChange={handleChange}
                    options={[
                      'Nuclear Family',
                      'Joint Family'
                    ]}
                  />
                </div>

                <TextAreaField
                  label="Siblings Details"
                  name="siblings"
                  value={formData.siblings}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g. 1 Elder Brother (Married, Software Architect in Chennai), 1 Younger Sister (B.Com, Unmarried)"
                  hint="Mention brothers/sisters, age, marital status, and occupations"
                />
              </div>
            )}

            {/* Step 3: Birth / Horoscope */}
            {currentStep === 3 && (
              <div>
                <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                  <h3 style={{ color: 'var(--maroon-950)', fontSize: '1.15rem' }}>
                    Step 3: Birth & Horoscope (Astrology)
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    Select birth star (Nakshatra), zodiac sign (Rasi), and lagnam details.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <SelectField
                    label="Birth Star (Nakshatra)"
                    name="birthStar"
                    value={formData.birthStar}
                    onChange={handleChange}
                    options={NAKSHATRAS}
                    required
                    error={errors.birthStar}
                  />

                  <SelectField
                    label="Zodiac Sign (Rasi)"
                    name="zodiacSign"
                    value={formData.zodiacSign}
                    onChange={handleChange}
                    options={ZODIAC_SIGNS}
                    required
                    error={errors.zodiacSign}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <SelectField
                    label="Lagnam"
                    name="lagnam"
                    value={formData.lagnam}
                    onChange={handleChange}
                    options={LAGNAMS}
                  />

                  <FormField
                    label="Gothram (Optional)"
                    name="gothram"
                    value={formData.gothram}
                    onChange={handleChange}
                    placeholder="e.g. Siva / Vishnu / Vashishta"
                  />
                </div>

                <SelectField
                  label="Dosham Status"
                  name="dosham"
                  value={formData.dosham}
                  onChange={handleChange}
                  options={[
                    'None / No Dosham',
                    'Sevvai Dosham (Chevvai)',
                    'Naga / Rahu-Ketu Dosham',
                    'Other Dosham',
                    'Don’t Know / To be analyzed'
                  ]}
                />
              </div>
            )}

            {/* Step 4: Education & Career */}
            {currentStep === 4 && (
              <div>
                <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                  <h3 style={{ color: 'var(--maroon-950)', fontSize: '1.15rem' }}>
                    Step 4: Education, Career & Income
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    Provide height, educational qualifications, job designation, and monthly income range.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <FormField
                    label="Height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="e.g. 5 ft 6 in or 168 cm"
                    required
                    error={errors.height}
                  />

                  <FormField
                    label="Highest Education Qualification"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="e.g. B.Tech (Computer Science) / MBA"
                    required
                    error={errors.education}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <FormField
                    label="Occupation / Designation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="e.g. Senior Software Engineer / Manager"
                    required
                    error={errors.occupation}
                  />

                  <SelectField
                    label="Employment Sector"
                    name="employedIn"
                    value={formData.employedIn}
                    onChange={handleChange}
                    options={[
                      'Private Sector',
                      'Government / PSU',
                      'Business / Self-Employed',
                      'Civil Services / Defence',
                      'Working Abroad',
                      'Not Working / Looking for job'
                    ]}
                  />
                </div>

                <SelectField
                  label="Monthly Income Range"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  options={INCOME_OPTIONS}
                />
              </div>
            )}

            {/* Step 5: Photo & Location */}
            {currentStep === 5 && (
              <div>
                <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                  <h3 style={{ color: 'var(--maroon-950)', fontSize: '1.15rem' }}>
                    Step 5: Profile Photo & Location
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    Attach a portrait photo and specify current residential location and native place.
                  </p>
                </div>

                {/* Cloudinary Profile Photo Uploader */}
                <ProfilePhotoUploader
                  photoUrl={formData.photoUrl}
                  photoPublicId={formData.photoPublicId}
                  onPhotoChange={handlePhotoChange}
                  error={errors.photo}
                />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <FormField
                    label="Religion & Caste / Community"
                    name="casteReligion"
                    value={formData.casteReligion}
                    onChange={handleChange}
                    placeholder="e.g. Hindu / Pillai / Mudaliar / Naidu"
                    required
                    error={errors.casteReligion}
                  />

                  <FormField
                    label="Native Place"
                    name="nativePlace"
                    value={formData.nativePlace}
                    onChange={handleChange}
                    placeholder="e.g. Madurai / Thanjavur"
                  />
                </div>

                <FormField
                  label="Current Residential City & Area"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Anna Nagar, Chennai"
                  required
                  error={errors.location}
                />
              </div>
            )}

            {/* Step 6: Expectations */}
            {currentStep === 6 && (
              <div>
                <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                  <h3 style={{ color: 'var(--maroon-950)', fontSize: '1.15rem' }}>
                    Step 6: Partner Expectations
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    Describe your preferences regarding the prospective bride / groom.
                  </p>
                </div>

                <TextAreaField
                  label="Partner Preferences & Expectations"
                  name="expectation"
                  value={formData.expectation}
                  onChange={handleChange}
                  rows={5}
                  required
                  placeholder="e.g. Looking for a well-educated, cultured groom with good family values. Graduate or post-graduate working in Chennai, Bangalore or abroad. Age preference 27-31."
                  hint="You may specify preferred age range, education, career, location, or family background"
                  error={errors.expectation}
                />
              </div>
            )}

            {/* Step 7: Review & Submit */}
            {currentStep === 7 && (
              <div>
                <ReviewCard
                  formData={formData}
                  onConsentToggle={(checked) => {
                    setFormData((prev) => ({ ...prev, consentAccepted: checked }));
                    if (errors.consentAccepted) {
                      setErrors((prev) => ({ ...prev, consentAccepted: null }));
                    }
                  }}
                  isSubmitting={isSubmitting}
                />
                {errors.consentAccepted && (
                  <div style={{ color: 'var(--danger)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem', textAlign: 'center' }}>
                    {errors.consentAccepted}
                  </div>
                )}
              </div>
            )}

            {/* Desktop Navigation Action Buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                marginTop: '1.75rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="btn btn-secondary"
                >
                  <ArrowLeft size={16} />
                  <span>Previous Step</span>
                </button>
              ) : (
                <Link to="/" className="btn btn-secondary">
                  <span>Home</span>
                </Link>
              )}

              {currentStep < 7 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary"
                >
                  <span>Continue</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.consentAccepted}
                  className="btn btn-primary btn-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                      <span>Submitting Profile...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Submit Registration</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sticky Action Bar for App-like experience */}
        <div className="mobile-sticky-action-bar">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="btn btn-secondary btn-sm"
              style={{ flex: 1 }}
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
          ) : (
            <Link to="/" className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
              <span>Home</span>
            </Link>
          )}

          {currentStep < 7 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary btn-sm"
              style={{ flex: 2 }}
            >
              <span>Continue Step {currentStep + 1}</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.consentAccepted}
              className="btn btn-primary btn-sm"
              style={{ flex: 2 }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Profile'}
            </button>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
