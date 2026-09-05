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
 */
export function formatDate(timestamp) {
  if (!timestamp) return '—';

  let dateObj;
  if (typeof timestamp === 'object' && timestamp.toDate) {
    // Firestore Timestamp
    dateObj = timestamp.toDate();
  } else if (timestamp instanceof Date) {
    dateObj = timestamp;
  } else if (typeof timestamp === 'string' || typeof timestamp === 'number') {
    dateObj = new Date(timestamp);
  } else {
    return '—';
  }

  if (isNaN(dateObj.getTime())) return '—';

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
}

/**
 * Validates form step data before proceeding to next step
 */
export function validateStep(stepNumber, formData) {
  const errors = {};

  if (stepNumber === 1) {
    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'பெயரை உள்ளிடவும் (Please enter a valid name)';
    }
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'பிறந்த தேதியை தேர்ந்தெடுக்கவும் (Please select Date of Birth)';
    } else {
      const selected = new Date(formData.dateOfBirth);
      const today = new Date();
      if (selected > today) {
        errors.dateOfBirth = 'பிறந்த தேதி எதிர்காலமாக இருக்கக்கூடாது (DOB cannot be in future)';
      }
    }
    if (!formData.age || Number(formData.age) < 18 || Number(formData.age) > 90) {
      errors.age = 'செல்லுபடியாகும் வயதை உள்ளிடவும் (18+ வயது)';
    }
    if (!formData.phone || formData.phone.trim().replace(/\D/g, '').length < 10) {
      errors.phone = '10 இலக்க மொபைல் எண்ணை உள்ளிடவும் (Enter valid 10-digit phone)';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'செல்லுபடியாகும் மின்னஞ்சலை உள்ளிடவும் (Invalid email address)';
    }
  }

  if (stepNumber === 2) {
    if (!formData.fatherName || formData.fatherName.trim().length < 2) {
      errors.fatherName = 'அப்பா பெயரை உள்ளிடவும் (Enter Father name)';
    }
    if (!formData.motherName || formData.motherName.trim().length < 2) {
      errors.motherName = 'அம்மா பெயரை உள்ளிடவும் (Enter Mother name)';
    }
  }

  if (stepNumber === 3) {
    if (!formData.birthStar) {
      errors.birthStar = 'நட்சத்திரத்தை தேர்ந்தெடுக்கவும் (Select Birth Star)';
    }
    if (!formData.zodiacSign) {
      errors.zodiacSign = 'ராசியை தேர்ந்தெடுக்கவும் (Select Zodiac Sign)';
    }
  }

  if (stepNumber === 4) {
    if (!formData.height || formData.height.trim().length < 2) {
      errors.height = 'உயரத்தை உள்ளிடவும் (Enter height e.g. 5 ft 6 in or 168 cm)';
    }
    if (!formData.education || formData.education.trim().length < 2) {
      errors.education = 'கல்வி தகுதியை உள்ளிடவும் (Enter Education qualification)';
    }
    if (!formData.occupation || formData.occupation.trim().length < 2) {
      errors.occupation = 'தொழில் விவரத்தை உள்ளிடவும் (Enter Occupation)';
    }
  }

  if (stepNumber === 5) {
    if (!formData.casteReligion || formData.casteReligion.trim().length < 2) {
      errors.casteReligion = 'மதம் / சாதியை உள்ளிடவும் (Enter Religion / Caste)';
    }
    if (!formData.location || formData.location.trim().length < 2) {
      errors.location = 'தற்போதைய இருப்பிடத்தை உள்ளிடவும் (Enter Current Location / City)';
    }
    // Photo is highly recommended but optional or required based on business rule
  }

  if (stepNumber === 6) {
    if (!formData.expectation || formData.expectation.trim().length < 5) {
      errors.expectation = 'எதிர்பார்ப்பு விவரங்களை உள்ளிடவும் (Please describe expectations)';
    }
  }

  if (stepNumber === 7) {
    if (!formData.consentAccepted) {
      errors.consentAccepted = 'பதிவை சமர்ப்பிக்க விதிமுறைகளை ஏற்கவும் (Please accept the declaration)';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
