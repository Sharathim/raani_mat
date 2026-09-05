export const BRAND = {
  tamilName: 'ராணி திருமண சேவை மையம்',
  englishName: 'Rani Thirumana Sevai Maiyam',
  tagline: 'Trusted Matrimonial Service for All Communities',
  subTagline: 'Guiding you towards a happy and blessed marriage ❤️',
  email: 'ranithirumanasevaimayam@gmail.com',
  phones: ['9092177888', '9003192733', '04446621102'],
  displayPhones: '+91 90921 77888 / +91 90031 92733',
  landline: '044 4662 1102',
  whatsapp: '9092177888',
  address: 'No 29, Mettukuppam Main Road, Sridevi Karumariamman Nagar, Nerkundram, Chennai 600107',
  hours: 'Monday – Sunday: 9:00 AM – 8:00 PM',
  copyrightYear: '2026'
};

export const REGISTRATION_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  SHORTLISTED: 'shortlisted',
  CLOSED: 'closed'
};

export const STATUS_CONFIG = {
  new: {
    label: 'New',
    badgeClass: 'status-new',
    bg: '#eff8ff',
    color: '#175cd3',
    border: '#b2ddff'
  },
  contacted: {
    label: 'Contacted',
    badgeClass: 'status-contacted',
    bg: '#fef7ec',
    color: '#b54708',
    border: '#fedf89'
  },
  shortlisted: {
    label: 'Shortlisted',
    badgeClass: 'status-shortlisted',
    bg: '#f6eefe',
    color: '#6927da',
    border: '#d8b4fe'
  },
  closed: {
    label: 'Closed / Married',
    badgeClass: 'status-closed',
    bg: '#f3f4f6',
    color: '#4b5563',
    border: '#d1d5db'
  }
};

export const STATUS_LABELS = {
  new: { label: 'New', class: 'status-new' },
  contacted: { label: 'Contacted', class: 'status-contacted' },
  shortlisted: { label: 'Shortlisted', class: 'status-shortlisted' },
  closed: { label: 'Closed / Married', class: 'status-closed' }
};

export const FORM_STEPS = [
  { id: 1, title: 'Basic Details', subtitle: 'Identity & Contact', icon: 'User' },
  { id: 2, title: 'Family Details', subtitle: 'Parents & Siblings', icon: 'Users' },
  { id: 3, title: 'Birth & Horoscope', subtitle: 'Astro & Stars', icon: 'Sparkles' },
  { id: 4, title: 'Education & Career', subtitle: 'Work & Income', icon: 'GraduationCap' },
  { id: 5, title: 'Photo & Location', subtitle: 'Photo & Native', icon: 'Camera' },
  { id: 6, title: 'Partner Expectations', subtitle: 'Preferences', icon: 'HeartHandshake' },
  { id: 7, title: 'Review & Submit', subtitle: 'Verification', icon: 'CheckCircle2' }
];

export const PROFILE_FOR_OPTIONS = [
  { value: 'Self', label: 'Self' },
  { value: 'Son', label: 'Son' },
  { value: 'Daughter', label: 'Daughter' },
  { value: 'Brother', label: 'Brother' },
  { value: 'Sister', label: 'Sister' },
  { value: 'Relative', label: 'Relative / Friend' }
];

export const GENDER_OPTIONS = [
  { value: 'Female', label: 'Female (Bride)' },
  { value: 'Male', label: 'Male (Groom)' }
];

export const MARITAL_STATUS_OPTIONS = [
  { value: 'Never Married', label: 'Never Married (Unmarried)' },
  { value: 'Widowed', label: 'Widowed' },
  { value: 'Divorced', label: 'Divorced' },
  { value: 'Separated', label: 'Separated' }
];

export const ZODIAC_SIGNS = [
  { value: 'Mesham', label: 'Mesham (Aries)' },
  { value: 'Rishabam', label: 'Rishabam (Taurus)' },
  { value: 'Mithunam', label: 'Mithunam (Gemini)' },
  { value: 'Kadagam', label: 'Kadagam (Cancer)' },
  { value: 'Simham', label: 'Simham (Leo)' },
  { value: 'Kanni', label: 'Kanni (Virgo)' },
  { value: 'Thulam', label: 'Thulam (Libra)' },
  { value: 'Vrischikam', label: 'Vrischikam (Scorpio)' },
  { value: 'Dhanusu', label: 'Dhanusu (Sagittarius)' },
  { value: 'Makaram', label: 'Makaram (Capricorn)' },
  { value: 'Kumbam', label: 'Kumbam (Aquarius)' },
  { value: 'Meenam', label: 'Meenam (Pisces)' }
];

export const NAKSHATRAS = [
  { value: 'Ashwini', label: 'Ashwini' },
  { value: 'Bharani', label: 'Bharani' },
  { value: 'Krittika', label: 'Krittika' },
  { value: 'Rohini', label: 'Rohini' },
  { value: 'Mrigashira', label: 'Mrigashira' },
  { value: 'Ardra', label: 'Ardra' },
  { value: 'Punarvasu', label: 'Punarvasu' },
  { value: 'Pushya', label: 'Pushya' },
  { value: 'Ashlesha', label: 'Ashlesha' },
  { value: 'Magha', label: 'Magha' },
  { value: 'Purva Phalguni', label: 'Purva Phalguni (Pooram)' },
  { value: 'Uttara Phalguni', label: 'Uttara Phalguni (Uthiram)' },
  { value: 'Hasta', label: 'Hasta (Hastham)' },
  { value: 'Chitra', label: 'Chitra (Chithirai)' },
  { value: 'Swati', label: 'Swati' },
  { value: 'Vishakha', label: 'Vishakha' },
  { value: 'Anuradha', label: 'Anuradha (Anusham)' },
  { value: 'Jyeshtha', label: 'Jyeshtha (Kettai)' },
  { value: 'Mula', label: 'Mula (Moolam)' },
  { value: 'Purva Ashadha', label: 'Purva Ashadha (Pooradam)' },
  { value: 'Uttara Ashadha', label: 'Uttara Ashadha (Uthiradam)' },
  { value: 'Shravana', label: 'Shravana (Thiruvonam)' },
  { value: 'Dhanishta', label: 'Dhanishta (Avittam)' },
  { value: 'Shatabhisha', label: 'Shatabhisha (Sathayam)' },
  { value: 'Purva Bhadrapada', label: 'Purva Bhadrapada (Poorattathi)' },
  { value: 'Uttara Bhadrapada', label: 'Uttara Bhadrapada (Uthirattathi)' },
  { value: 'Revati', label: 'Revati' }
];

export const NAKSHATRA_TO_RASI_MAP = {
  Ashwini: 'Mesham',
  Bharani: 'Mesham',
  Krittika: 'Rishabam',
  Rohini: 'Rishabam',
  Mrigashira: 'Rishabam',
  Ardra: 'Mithunam',
  Punarvasu: 'Mithunam',
  Pushya: 'Kadagam',
  Ashlesha: 'Kadagam',
  Magha: 'Simham',
  'Purva Phalguni': 'Simham',
  'Uttara Phalguni': 'Kanni',
  Hasta: 'Kanni',
  Chitra: 'Kanni',
  Swati: 'Thulam',
  Vishakha: 'Thulam',
  Anuradha: 'Vrischikam',
  Jyeshtha: 'Vrischikam',
  Mula: 'Dhanusu',
  'Purva Ashadha': 'Dhanusu',
  'Uttara Ashadha': 'Makaram',
  Shravana: 'Makaram',
  Dhanishta: 'Makaram',
  Shatabhisha: 'Kumbam',
  'Purva Bhadrapada': 'Kumbam',
  'Uttara Bhadrapada': 'Meenam',
  Revati: 'Meenam'
};

export const LAGNAMS = [
  { value: 'Mesham', label: 'Mesham (Aries)' },
  { value: 'Rishabam', label: 'Rishabam (Taurus)' },
  { value: 'Mithunam', label: 'Mithunam (Gemini)' },
  { value: 'Kadagam', label: 'Kadagam (Cancer)' },
  { value: 'Simham', label: 'Simham (Leo)' },
  { value: 'Kanni', label: 'Kanni (Virgo)' },
  { value: 'Thulam', label: 'Thulam (Libra)' },
  { value: 'Vrischikam', label: 'Vrischikam (Scorpio)' },
  { value: 'Dhanusu', label: 'Dhanusu (Sagittarius)' },
  { value: 'Makaram', label: 'Makaram (Capricorn)' },
  { value: 'Kumbam', label: 'Kumbam (Aquarius)' },
  { value: 'Meenam', label: 'Meenam (Pisces)' }
];

export const INCOME_OPTIONS = [
  'Below ₹20,000 / month',
  '₹20,000 – ₹40,000 / month',
  '₹40,000 – ₹60,000 / month',
  '₹60,000 – ₹1,00,000 / month',
  '₹1,00,000 – ₹2,00,000 / month',
  '₹2,00,000+ / month',
  'Business / Self-Employed',
  'Prefer not to disclose'
];

export const EDUCATION_SUGGESTIONS = [
  '10th / 12th Standard',
  'Diploma / ITI',
  'B.A / B.Com / B.Sc / BBA / BCA',
  'B.E / B.Tech',
  'M.A / M.Com / M.Sc / MBA / MCA',
  'M.E / M.Tech',
  'MBBS / BDS / MD / Medical',
  'CA / CS / ICWA',
  'Law / LLB / LLM',
  'Ph.D / Doctorate',
  'Other Degree'
];

export const SUCCESS_STORIES = [
  {
    couple: 'Karthik & Divya',
    date: 'January 2026',
    location: 'Chennai',
    quote: 'We found our ideal life partner through Rani Thirumana Sevai Maiyam. The personalized attention and family verification made all the difference!'
  },
  {
    couple: 'Vijayan & Nandhini',
    date: 'December 2025',
    location: 'Madurai – Chennai',
    quote: 'Direct, honest service center assistance. They understood our family preferences and guided us with complete transparency.'
  },
  {
    couple: 'Suresh & Priya',
    date: 'November 2025',
    location: 'Kanchipuram',
    quote: 'Both horoscope compatibility and career preferences matched wonderfully. Highly recommended matrimonial service!'
  }
];

export const FAQS = [
  {
    q: 'How do I register a matrimonial profile?',
    a: 'Click on the "Register Profile" button on our website and complete the 7 simple steps with basic, family, horoscope, and career details.'
  },
  {
    q: 'Is profile photo upload required?',
    a: 'Uploading a clear portrait photo is strongly recommended as profiles with photos receive significantly higher interest and faster matchmaking.'
  },
  {
    q: 'How are prospective matches shared with us?',
    a: 'Once your profile is reviewed by our matchmaking team, compatible profiles will be shared with you via phone call and WhatsApp.'
  },
  {
    q: 'Are profiles from all communities accepted?',
    a: 'Yes, Rani Thirumana Sevai Maiyam serves and respects all communities, helping families find ideal matches according to their tradition.'
  }
];

export const INITIAL_FORM_STATE = {
  // Step 1: Basic
  profileFor: 'Self',
  gender: 'Female',
  name: '',
  age: '',
  dateOfBirth: '',
  phone: '',
  email: '',
  maritalStatus: 'Never Married',

  // Step 2: Family
  fatherName: '',
  motherName: '',
  fatherOccupation: '',
  motherOccupation: '',
  siblings: '',
  familyType: 'Nuclear Family',

  // Step 3: Birth / Horoscope
  birthStar: '',
  zodiacSign: '',
  lagnam: '',
  gothram: '',
  dosham: 'None',

  // Step 4: Education & Career
  height: '',
  education: '',
  occupation: '',
  employedIn: 'Private Sector',
  income: '',

  // Step 5: Photo & Location
  casteReligion: '',
  location: '',
  nativePlace: '',
  photoUrl: '',
  photoPublicId: '',

  // Step 6: Expectations
  expectation: '',

  // Step 7: Consent
  consentAccepted: false
};
