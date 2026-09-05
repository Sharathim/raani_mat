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
  FORM_STEPS,
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
  Info,
  PhoneCall,
  MessageCircle
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

  // Save form draft to sessionStorage so user never loses data on accidental reload
  useEffect(() => {
    sessionStorage.setItem('rani_matrimony_form_draft', JSON.stringify(formData));
  }, [formData]);

  // Handle generic input change
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

    // Clear field-level error on change
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

  // Step Navigation Handlers
  const handleNext = () => {
    const validation = validateStep(currentStep, formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setErrors({});
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const handleStepClick = (targetStep) => {
    // Only allow clicking already completed steps or previous steps
    if (targetStep < currentStep || completedSteps.includes(targetStep - 1)) {
      setErrors({});
      setCurrentStep(targetStep);
      window.scrollTo({ top: 150, behavior: 'smooth' });
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
      // Clear draft storage
      sessionStorage.removeItem('rani_matrimony_form_draft');
      // Navigate to success screen
      navigate(`/register/success/${created.id || created.registrationId}`);
    } catch (err) {
      console.error('Submission failed:', err);
      setSubmitError(err.message || 'பதிவு செய்வதில் பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.');
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--ivory)' }}>
      <BrandHeader />

      <main style={{ flex: 1, padding: '2.5rem 1.25rem 4rem' }}>
        <div className="container-narrow">
          {/* Page Top Heading */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="pill-title">
              <span>❖</span> மணமக்கள் விவரப் பதிவு (Registration) <span>❖</span>
            </span>
            <h1 className="font-tamil-serif" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)', color: 'var(--maroon-950)', marginTop: '0.5rem' }}>
              ராணி திருமண சேவை மையம்
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
              கீழே உள்ள படிகளில் மணமக்கள் பற்றிய முழு விவரங்களையும் உள்ளிடவும்.
            </p>
          </div>

          {/* Stepper Indicator */}
          <ProgressStepper
            currentStep={currentStep}
            onStepClick={handleStepClick}
            completedSteps={completedSteps}
          />

          {/* Error Banner if any submit errors */}
          <ErrorBanner message={submitError} onDismiss={() => setSubmitError(null)} />

          {/* Form Container Card */}
          <div
            className="card-ornate"
            style={{
              padding: '2.5rem 2rem',
              backgroundColor: 'var(--paper)',
              position: 'relative'
            }}
          >
            <OrnateCorner position="top-left" />
            <OrnateCorner position="top-right" />

            {/* Step 1: Basic Details */}
            {currentStep === 1 && (
              <div>
                <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.75rem' }}>
                  <h3 className="font-tamil-serif" style={{ color: 'var(--maroon-900)', fontSize: '1.25rem' }}>
                    படி 1: மணமக்கள் அடிப்படை விவரம் (Basic Details)
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    சுயவிவரம் யாருக்கு பதிவு செய்யப்படுகிறது மற்றும் அடிப்படை தகவல்களை உள்ளிடவும்.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <SelectField
                    labelTa="பதிவு யாருக்காக?"
                    labelEn="Profile For"
                    name="profileFor"
                    value={formData.profileFor}
                    onChange={handleChange}
                    options={PROFILE_FOR_OPTIONS}
                    required
                  />

                  <SelectField
                    labelTa="பாலினம்"
                    labelEn="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    options={GENDER_OPTIONS}
                    required
                  />
                </div>

                <FormField
                  labelTa="பெயர்"
                  labelEn="Full Name of Bride / Groom"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="எ.கா: சுப்பிரமணியன் கார்த்திக் (Subramanian K)"
                  required
                  error={errors.name}
                />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <FormField
                    labelTa="பிறந்த தேதி"
                    labelEn="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    error={errors.dateOfBirth}
                  />

                  <FormField
                    labelTa="வயது"
                    labelEn="Age (Auto-calculated)"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="25"
                    min="18"
                    max="90"
                    required
                    hint="பிறந்த தேதியை தேர்வு செய்தால் தானாக நிரப்பப்படும்"
                    error={errors.age}
                  />

                  <SelectField
                    labelTa="திருமண நிலை"
                    labelEn="Marital Status"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    options={MARITAL_STATUS_OPTIONS}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <FormField
                    labelTa="தொலைபேசி / மொபைல் எண்"
                    labelEn="Mobile Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9840123456"
                    required
                    error={errors.phone}
                  />

                  <FormField
                    labelTa="மின்னஞ்சல் முகவரி"
                    labelEn="Email Address (Optional)"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    error={errors.email}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Family Details */}
            {currentStep === 2 && (
              <div>
                <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.75rem' }}>
                  <h3 className="font-tamil-serif" style={{ color: 'var(--maroon-900)', fontSize: '1.25rem' }}>
                    படி 2: குடும்ப விவரம் (Family Details)
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    பெற்றோர் பெயர், அவர்களின் தொழில் மற்றும் உடன்பிறப்புகள் பற்றிய விவரங்கள்.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <FormField
                    labelTa="அப்பா பெயர்"
                    labelEn="Father Name"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="தந்தையின் பெயர்"
                    required
                    error={errors.fatherName}
                  />

                  <FormField
                    labelTa="அப்பா தொழில்"
                    labelEn="Father Occupation"
                    name="fatherOccupation"
                    value={formData.fatherOccupation}
                    onChange={handleChange}
                    placeholder="எ.கா: அரசு ஊழியர் / தொழில் / ஓய்வு"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <FormField
                    labelTa="அம்மா பெயர்"
                    labelEn="Mother Name"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    placeholder="தாயாரின் பெயர்"
                    required
                    error={errors.motherName}
                  />

                  <FormField
                    labelTa="அம்மா தொழில்"
                    labelEn="Mother Occupation"
                    name="motherOccupation"
                    value={formData.motherOccupation}
                    onChange={handleChange}
                    placeholder="எ.கா: இல்லத்தரசி (Home Maker)"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <SelectField
                    labelTa="குடும்ப அமைப்பு"
                    labelEn="Family Type"
                    name="familyType"
                    value={formData.familyType}
                    onChange={handleChange}
                    options={[
                      'Nuclear Family (தனிக்குடும்பம்)',
                      'Joint Family (கூட்டுக்குடும்பம்)'
                    ]}
                  />
                </div>

                <TextAreaField
                  labelTa="உடன் பிறந்தவர்கள்"
                  labelEn="Siblings Details"
                  name="siblings"
                  value={formData.siblings}
                  onChange={handleChange}
                  rows={3}
                  placeholder="எ.கா: 1 அண்ணன் (திருமணம் ஆனவர், மென்பொருள் பொறியாளர்), 1 தங்கை (படித்து வருகிறார்)"
                  hint="அண்ணன்/தம்பி/அக்கா/தங்கை, வயது, திருமண நிலை மற்றும் தொழில் விவரங்களை குறிப்பிடலாம்"
                />
              </div>
            )}

            {/* Step 3: Birth / Horoscope */}
            {currentStep === 3 && (
              <div>
                <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.75rem' }}>
                  <h3 className="font-tamil-serif" style={{ color: 'var(--maroon-900)', fontSize: '1.25rem' }}>
                    படி 3: பிறப்பு / ஜாதக விவரம் (Horoscope & Astrology)
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    நட்சத்திரம், ராசி, லக்கினம் மற்றும் தோஷ விவரங்களை தேர்ந்தெடுக்கவும்.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <SelectField
                    labelTa="நட்சத்திரம்"
                    labelEn="Birth Star (Nakshatra)"
                    name="birthStar"
                    value={formData.birthStar}
                    onChange={handleChange}
                    options={NAKSHATRAS}
                    required
                    error={errors.birthStar}
                  />

                  <SelectField
                    labelTa="ராசி"
                    labelEn="Zodiac Sign (Rasi)"
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
                    labelTa="லக்கினம்"
                    labelEn="Lagnam"
                    name="lagnam"
                    value={formData.lagnam}
                    onChange={handleChange}
                    options={LAGNAMS}
                  />

                  <FormField
                    labelTa="கோத்திரம்"
                    labelEn="Gothram (Optional)"
                    name="gothram"
                    value={formData.gothram}
                    onChange={handleChange}
                    placeholder="எ.கா: சிவா / விஷ்ணு / வசிஷ்டர்"
                  />
                </div>

                <SelectField
                  labelTa="செவ்வாய் / நாக தோஷம்"
                  labelEn="Dosham"
                  name="dosham"
                  value={formData.dosham}
                  onChange={handleChange}
                  options={[
                    'None / இல்லை',
                    'Sevvai Dosham (செவ்வாய் தோஷம்)',
                    'Naga / Rahu-Ketu Dosham (ராகு-கேது தோஷம்)',
                    'Other Dosham (பிற தோஷங்கள்)',
                    'Don’t Know / தெரியவில்லை'
                  ]}
                />
              </div>
            )}

            {/* Step 4: Education / Career */}
            {currentStep === 4 && (
              <div>
                <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.75rem' }}>
                  <h3 className="font-tamil-serif" style={{ color: 'var(--maroon-900)', fontSize: '1.25rem' }}>
                    படி 4: கல்வி & தொழில் விவரம் (Education & Career)
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    உயரம், கல்வித்தகுதி, தொழில் நிறுவனம் மற்றும் மாத வருமான வரம்பு.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <FormField
                    labelTa="உயரம்"
                    labelEn="Height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="எ.கா: 5 ft 6 in அல்லது 168 cm"
                    required
                    error={errors.height}
                  />

                  <FormField
                    labelTa="கல்வி தகுதி"
                    labelEn="Education Qualification"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="எ.கா: B.E (Computer Science) / MBA"
                    required
                    error={errors.education}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <FormField
                    labelTa="தொழில் / பணி விவரம்"
                    labelEn="Occupation / Designation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="எ.கா: Software Engineer / Manager / Business"
                    required
                    error={errors.occupation}
                  />

                  <SelectField
                    labelTa="பணிபுரியும் துறை"
                    labelEn="Employment Sector"
                    name="employedIn"
                    value={formData.employedIn}
                    onChange={handleChange}
                    options={[
                      'Private Sector (தனியார் நிறுவனம்)',
                      'Government / PSU (அரசு துறை)',
                      'Business / Self Employed (சொந்த தொழில்)',
                      'Civil Services / Defence',
                      'Working Abroad (வெளிநாடு)',
                      'Not Working / Looking for job'
                    ]}
                  />
                </div>

                <SelectField
                  labelTa="மாத வருமானம்"
                  labelEn="Monthly Income Range"
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
                <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.75rem' }}>
                  <h3 className="font-tamil-serif" style={{ color: 'var(--maroon-900)', fontSize: '1.25rem' }}>
                    படி 5: புகைப்படம் & முகவரி (Photo & Location)
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    மணமக்கள் புகைப்படம், மதம்/சாதி மற்றும் இருப்பிட விவரங்களை சேர்க்கவும்.
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
                    labelTa="மதம் / சாதி"
                    labelEn="Religion & Caste / Subcaste"
                    name="casteReligion"
                    value={formData.casteReligion}
                    onChange={handleChange}
                    placeholder="எ.கா: Hindu / Mudaliar / Pillai / Naidu"
                    required
                    error={errors.casteReligion}
                  />

                  <FormField
                    labelTa="சொந்த ஊர்"
                    labelEn="Native Place"
                    name="nativePlace"
                    value={formData.nativePlace}
                    onChange={handleChange}
                    placeholder="எ.கா: Madurai / Kanchipuram"
                  />
                </div>

                <FormField
                  labelTa="தற்போதைய வசிப்பிடம்"
                  labelEn="Current Residential Location / City"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="எ.கா: Anna Nagar, Chennai"
                  required
                  error={errors.location}
                />
              </div>
            )}

            {/* Step 6: Expectations */}
            {currentStep === 6 && (
              <div>
                <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.75rem' }}>
                  <h3 className="font-tamil-serif" style={{ color: 'var(--maroon-900)', fontSize: '1.25rem' }}>
                    படி 6: எதிர்பார்ப்புகள் (Partner Expectations)
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    நீங்கள் எதிர்பார்க்கும் வரனின் கல்வி, தொழில், வயது மற்றும் இருப்பிட விருப்பங்களை குறிப்பிடவும்.
                  </p>
                </div>

                <TextAreaField
                  labelTa="எதிர்பார்ப்பு விவரங்கள்"
                  labelEn="Describe your expectations regarding partner"
                  name="expectation"
                  value={formData.expectation}
                  onChange={handleChange}
                  rows={5}
                  required
                  placeholder="உதாரணம்: பட்டதாரி அல்லது பொறியியல் முடித்த நல்ல குடும்பப் பின்னணி கொண்ட மணமகன் / மணமகள் தேவை. சென்னை அல்லது பெங்களூரில் பணிபுரிபவராக இருக்க வேண்டும்."
                  hint="கல்வி, தொழில், வயது விருப்பம், குடும்ப பின்னணி போன்ற விவரங்களை தாராளமாக குறிப்பிடலாம்."
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

            {/* Navigation Buttons Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1.5px solid var(--line)'
              }}
            >
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="btn btn-secondary"
                >
                  <ArrowLeft size={18} />
                  <span>முந்தைய படி (Back)</span>
                </button>
              ) : (
                <Link to="/" className="btn btn-secondary">
                  <span>முகப்பு (Home)</span>
                </Link>
              )}

              {currentStep < 7 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary"
                >
                  <span>அடுத்த படி (Continue)</span>
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.consentAccepted}
                  className="btn btn-primary btn-lg"
                  style={{
                    backgroundColor: 'var(--maroon-900)',
                    boxShadow: 'var(--shadow-hover)'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                      <span>பதிவு சமர்ப்பிக்கப்படுகிறது (Submitting Profile...)</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>பதிவை சமர்ப்பிக்கவும் (Submit Registration)</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
