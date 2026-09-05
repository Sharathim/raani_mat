/**
 * Calculates accurate age from a Date of Birth string (YYYY-MM-DD)
 */
export function calculateAge(dobString) {
  if (!dobString) return '';
  const birthDate = new Date(dobString);
  if (isNaN(birthDate.getTime())) return '';

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 0 ? String(age) : '';
}

/**
 * Generates a human-friendly registration reference code (e.g. RANI-8F3K2A1C)
 */
export function generateRegistrationId() {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let randomPart = '';
  for (let i = 0; i < 8; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `RANI-${randomPart}`;
}

/**
 * Formats date into readable string (e.g. 14 Oct 2026, 04:30 PM)
 * Highly defensive against undefined, null, Firestore Timestamps, or string formats.
 */
export function formatDate(timestamp) {
  if (!timestamp) return '—';

  try {
    let dateObj;
    if (typeof timestamp === 'object' && timestamp !== null) {
      if (typeof timestamp.toDate === 'function') {
        dateObj = timestamp.toDate();
      } else if (timestamp.seconds !== undefined) {
        dateObj = new Date(timestamp.seconds * 1000);
      } else if (timestamp instanceof Date) {
        dateObj = timestamp;
      }
    } else if (typeof timestamp === 'string' || typeof timestamp === 'number') {
      dateObj = new Date(timestamp);
    }

    if (!dateObj || isNaN(dateObj.getTime())) return '—';

    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(dateObj);
  } catch (err) {
    console.warn('formatDate error:', err);
    return '—';
  }
}

/**
 * Validates form step data before proceeding to next step
 */
export function validateStep(stepNumber, formData) {
  const errors = {};

  if (stepNumber === 1) {
    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'Please enter full name (at least 2 characters)';
    }
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Please select Date of Birth';
    } else {
      const selected = new Date(formData.dateOfBirth);
      const today = new Date();
      if (selected > today) {
        errors.dateOfBirth = 'Date of birth cannot be in the future';
      }
    }
    if (!formData.age || Number(formData.age) < 18 || Number(formData.age) > 90) {
      errors.age = 'Please enter a valid age (18+)';
    }
    if (!formData.phone || formData.phone.trim().replace(/\D/g, '').length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
  }

  if (stepNumber === 2) {
    if (!formData.fatherName || formData.fatherName.trim().length < 2) {
      errors.fatherName = "Please enter Father's name";
    }
    if (!formData.motherName || formData.motherName.trim().length < 2) {
      errors.motherName = "Please enter Mother's name";
    }
  }

  if (stepNumber === 3) {
    if (!formData.birthStar) {
      errors.birthStar = 'Please select Birth Star (Nakshatra)';
    }
    if (!formData.zodiacSign) {
      errors.zodiacSign = 'Please select Zodiac Sign (Rasi)';
    }
  }

  if (stepNumber === 4) {
    if (!formData.height || formData.height.trim().length < 2) {
      errors.height = 'Please enter height (e.g. 5 ft 6 in or 168 cm)';
    }
    if (!formData.education || formData.education.trim().length < 2) {
      errors.education = 'Please enter highest education qualification';
    }
    if (!formData.occupation || formData.occupation.trim().length < 2) {
      errors.occupation = 'Please enter current occupation or job title';
    }
  }

  if (stepNumber === 5) {
    if (!formData.casteReligion || formData.casteReligion.trim().length < 2) {
      errors.casteReligion = 'Please enter Religion / Caste details';
    }
    if (!formData.location || formData.location.trim().length < 2) {
      errors.location = 'Please enter current residential city/area';
    }
  }

  if (stepNumber === 6) {
    if (!formData.expectation || formData.expectation.trim().length < 5) {
      errors.expectation = 'Please describe partner expectations (at least 5 characters)';
    }
  }

  if (stepNumber === 7) {
    if (!formData.consentAccepted) {
      errors.consentAccepted = 'Please check the consent declaration to submit your profile';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
