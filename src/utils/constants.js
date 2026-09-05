export const BRAND = {
  tamilName: 'ராணி திருமண சேவை மையம்',
  englishName: 'Rani Marriage Service Center',
  tagline: 'அனைத்து சமூகத்தினருக்கும்.',
  subTagline: 'நல்ல வரன்... நல்ல வாழ்க்கை... ❤️',
  email: 'ranithirumanasevaimayam@gmail.com',
  phones: ['9092177888', '9003192733', '04446621102'],
  displayPhones: '+91 90921 77888 / +91 90031 92733',
  landline: '044 4662 1102',
  whatsapp: '9092177888',
  address: 'No 29, Mettukuppam Main Road, Sridevi Karumariamman Nagar, Nerkundram, Chennai 600107',
  hours: 'திங்கள் - ஞாயிறு: காலை 9:00 - இரவு 8:00 (Mon - Sun: 9:00 AM - 8:00 PM)',
  copyrightYear: '2026'
};

export const REGISTRATION_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  SHORTLISTED: 'shortlisted',
  CLOSED: 'closed'
};

export const STATUS_LABELS = {
  new: { ta: 'புதியது', en: 'New Registration', class: 'status-new' },
  contacted: { ta: 'தொடர்பு கொள்ளப்பட்டது', en: 'Contacted', class: 'status-contacted' },
  shortlisted: { ta: 'பரிசீலனையில்', en: 'Shortlisted', class: 'status-shortlisted' },
  closed: { ta: 'நிறைவுற்றது', en: 'Closed / Married', class: 'status-closed' }
};

export const FORM_STEPS = [
  { id: 1, titleTa: 'அடிப்படை விவரம்', titleEn: 'Basic Details', icon: 'User' },
  { id: 2, titleTa: 'குடும்ப விவரம்', titleEn: 'Family Details', icon: 'Users' },
  { id: 3, titleTa: 'பிறப்பு / ஜாதகம்', titleEn: 'Birth & Horoscope', icon: 'Sparkles' },
  { id: 4, titleTa: 'கல்வி & தொழில்', titleEn: 'Education & Career', icon: 'GraduationCap' },
  { id: 5, titleTa: 'புகைப்படம் & முகவரி', titleEn: 'Photo & Location', icon: 'Camera' },
  { id: 6, titleTa: 'எதிர்பார்ப்புகள்', titleEn: 'Expectations', icon: 'HeartHandshake' },
  { id: 7, titleTa: 'சரிபார்த்தல் & சமர்ப்பித்தல்', titleEn: 'Review & Submit', icon: 'CheckCircle2' }
];

export const PROFILE_FOR_OPTIONS = [
  { value: 'Self', labelTa: 'சுய பதிவு (Self)', labelEn: 'Self' },
  { value: 'Son', labelTa: 'மகன் (Son)', labelEn: 'Son' },
  { value: 'Daughter', labelTa: 'மகள் (Daughter)', labelEn: 'Daughter' },
  { value: 'Brother', labelTa: 'சகோதரன் (Brother)', labelEn: 'Brother' },
  { value: 'Sister', labelTa: 'சகோதரி (Sister)', labelEn: 'Sister' },
  { value: 'Relative', labelTa: 'உறவினர் / நண்பர் (Relative/Friend)', labelEn: 'Relative / Friend' }
];

export const GENDER_OPTIONS = [
  { value: 'Female', labelTa: 'பெண் (Bride / பெண் வரன்)', labelEn: 'Female (Bride)' },
  { value: 'Male', labelTa: 'ஆண் (Groom / ஆண் வரன்)', labelEn: 'Male (Groom)' }
];

export const MARITAL_STATUS_OPTIONS = [
  { value: 'Never Married', labelTa: 'மணம் ஆகாதவர் (Unmarried)', labelEn: 'Never Married' },
  { value: 'Widowed', labelTa: 'விதவை / விதவர் (Widowed)', labelEn: 'Widowed' },
  { value: 'Divorced', labelTa: 'விவாகரத்து பெற்றவர் (Divorced)', labelEn: 'Divorced' },
  { value: 'Separated', labelTa: 'பிரிந்து வாழ்பவர் (Separated)', labelEn: 'Separated' }
];

export const ZODIAC_SIGNS = [
  { value: 'Mesham', labelTa: 'மேஷம் (Mesham)', labelEn: 'Aries' },
  { value: 'Rishabam', labelTa: 'ரிஷபம் (Rishabam)', labelEn: 'Taurus' },
  { value: 'Mithunam', labelTa: 'மிதுனம் (Mithunam)', labelEn: 'Gemini' },
  { value: 'Kadagam', labelTa: 'கடகம் (Kadagam)', labelEn: 'Cancer' },
  { value: 'Simham', labelTa: 'சிம்மம் (Simham)', labelEn: 'Leo' },
  { value: 'Kanni', labelTa: 'கன்னி (Kanni)', labelEn: 'Virgo' },
  { value: 'Thulam', labelTa: 'துலாம் (Thulam)', labelEn: 'Libra' },
  { value: 'Vrischikam', labelTa: 'விருச்சிகம் (Vrischikam)', labelEn: 'Scorpio' },
  { value: 'Dhanusu', labelTa: 'தனுசு (Dhanusu)', labelEn: 'Sagittarius' },
  { value: 'Makaram', labelTa: 'மகரம் (Makaram)', labelEn: 'Capricorn' },
  { value: 'Kumbam', labelTa: 'கும்பம் (Kumbam)', labelEn: 'Aquarius' },
  { value: 'Meenam', labelTa: 'மீனம் (Meenam)', labelEn: 'Pisces' }
];

export const NAKSHATRAS = [
  { value: 'Ashwini', labelTa: 'அஸ்வினி (Ashwini)' },
  { value: 'Bharani', labelTa: 'பரணி (Bharani)' },
  { value: 'Krittika', labelTa: 'கார்த்திகை (Krittika)' },
  { value: 'Rohini', labelTa: 'ரோகிணி (Rohini)' },
  { value: 'Mrigashira', labelTa: 'மிருகசீரிடம் (Mrigashira)' },
  { value: 'Ardra', labelTa: 'திருவாதிரை (Ardra)' },
  { value: 'Punarvasu', labelTa: 'புனர்பூசம் (Punarvasu)' },
  { value: 'Pushya', labelTa: 'பூசம் (Pushya)' },
  { value: 'Ashlesha', labelTa: 'ஆயில்யம் (Ashlesha)' },
  { value: 'Magha', labelTa: 'மகம் (Magha)' },
  { value: 'Purva Phalguni', labelTa: 'பூரம் (Purva Phalguni)' },
  { value: 'Uttara Phalguni', labelTa: 'உத்திரம் (Uttara Phalguni)' },
  { value: 'Hasta', labelTa: 'அஸ்தம் (Hasta)' },
  { value: 'Chitra', labelTa: 'சித்திரை (Chitra)' },
  { value: 'Swati', labelTa: 'சுவாதி (Swati)' },
  { value: 'Vishakha', labelTa: 'விசாகம் (Vishakha)' },
  { value: 'Anuradha', labelTa: 'அனுஷம் (Anuradha)' },
  { value: 'Jyeshtha', labelTa: 'கேட்டை (Jyeshtha)' },
  { value: 'Mula', labelTa: 'மூலம் (Mula)' },
  { value: 'Purva Ashadha', labelTa: 'பூராடம் (Purva Ashadha)' },
  { value: 'Uttara Ashadha', labelTa: 'உத்திராடம் (Uttara Ashadha)' },
  { value: 'Shravana', labelTa: 'திருவோணம் (Shravana)' },
  { value: 'Dhanishta', labelTa: 'அவிட்டம் (Dhanishta)' },
  { value: 'Shatabhisha', labelTa: 'சதயம் (Shatabhisha)' },
  { value: 'Purva Bhadrapada', labelTa: 'பூரட்டாதி (Purva Bhadrapada)' },
  { value: 'Uttara Bhadrapada', labelTa: 'உத்திரட்டாதி (Uttara Bhadrapada)' },
  { value: 'Revati', labelTa: 'ரேவதி (Revati)' }
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
  { value: 'Mesham', labelTa: 'மேஷம் (Mesham)' },
  { value: 'Rishabam', labelTa: 'ரிஷபம் (Rishabam)' },
  { value: 'Mithunam', labelTa: 'மிதுனம் (Mithunam)' },
  { value: 'Kadagam', labelTa: 'கடகம் (Kadagam)' },
  { value: 'Simham', labelTa: 'சிம்மம் (Simham)' },
  { value: 'Kanni', labelTa: 'கன்னி (Kanni)' },
  { value: 'Thulam', labelTa: 'துலாம் (Thulam)' },
  { value: 'Vrischikam', labelTa: 'விருச்சிகம் (Vrischikam)' },
  { value: 'Dhanusu', labelTa: 'தனுசு (Dhanusu)' },
  { value: 'Makaram', labelTa: 'மகரம் (Makaram)' },
  { value: 'Kumbam', labelTa: 'கும்பம் (Kumbam)' },
  { value: 'Meenam', labelTa: 'மீனம் (Meenam)' }
];

export const INCOME_OPTIONS = [
  'Below ₹20,000 / மாதம்',
  '₹20,000 – ₹40,000 / மாதம்',
  '₹40,000 – ₹60,000 / மாதம்',
  '₹60,000 – ₹1,00,000 / மாதம்',
  '₹1,00,000 – ₹2,00,000 / மாதம்',
  '₹2,00,000+ / மாதம்',
  'Business / சொந்த தொழில்',
  'Prefer not to say / குறிப்பிட விரும்பவில்லை'
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
  'Other'
];

export const SUCCESS_STORIES = [
  {
    couple: 'கார்த்திக் & திவ்யா',
    date: 'Jan 2026',
    location: 'Chennai',
    quote: 'ராணி திருமண சேவை மையம் மூலம் எங்களின் எதிர்பார்ப்பிற்கு ஏற்ற மிகச் சரியான வரன் கிடைத்தது. குடும்பத்தினருக்கு மிக்க மகிழ்ச்சி!'
  },
  {
    couple: 'விஜயன் & நந்தினி',
    date: 'Dec 2025',
    location: 'Madurai - Chennai',
    quote: 'நேரடி சேவையும், குடும்ப பின்னணியை மிக நேர்த்தியாக விசாரித்து அறிமுகப்படுத்திய விதமும் மிகவும் திருப்தியளித்தது.'
  },
  {
    couple: 'சுரேஷ் & பிரியா',
    date: 'Nov 2025',
    location: 'Kanchipuram',
    quote: 'ஜாதக பொருத்தமும், எங்களின் கல்வி விருப்பமும் 100% பொருந்தி அழகிய முறையில் திருமணம் நிறைவேறியது.'
  }
];

export const FAQS = [
  {
    qTa: 'ராணி திருமண சேவை மையத்தில் எவ்வாறு பதிவு செய்வது?',
    qEn: 'How to register in Rani Matrimony?',
    aTa: 'எங்கள் இணையதளத்தில் உள்ள "மணமக்கள் பதிவு" பொத்தானை கிளிக் செய்து 7 எளிய படிகளில் உங்கள் விவரங்களை நிரப்பி சமர்ப்பிக்கலாம்.'
  },
  {
    qTa: 'புகைப்படம் பதிவேற்றுவது கட்டாயமா?',
    qEn: 'Is photo upload mandatory?',
    aTa: 'புகைப்படம் பதிவேற்றுவது விரைவான வரன் தேர்வுக்கு மிகவும் பரிந்துரைக்கப்படுகிறது. நீங்கள் மொபைல் மூலமாகவோ அல்லது மையத்தில் நேரிலோ வழங்கலாம்.'
  },
  {
    qTa: 'பதிவு செய்த பின்னர் வரன் தகவல் எவ்வாறு வழங்கப்படும்?',
    qEn: 'How will matches be shared after registration?',
    aTa: 'உங்கள் சுயவிவரம் எங்கள் சேவை மையத்தால் சரிபார்க்கப்பட்டு, உங்களுக்கு பொருத்தமான வரன்கள் தொலைபேசி அல்லது WhatsApp வழியாக பகிரப்படும்.'
  },
  {
    qTa: 'அனைத்து சமூகத்தினரும் பதிவு செய்யலாமா?',
    qEn: 'Can people from all communities register?',
    aTa: 'ஆம், ராணி திருமண சேவை மையம் அனைத்து சமூகத்தினருக்கும் நல்வரன் அமைத்து தரும் பொதுவான சேவை மையமாகும்.'
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
  dosham: 'None / இல்லை',

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
