export const BRAND = {
  tamilName: 'ராணி திருமண சேவை மையம்',
  englishName: 'Rani Thirumana Sevai Maiyam',
  tagline: 'Trusted Matrimonial Service for All Communities',
  subTagline: 'Two Hearts. One Beautiful Journey. ',
  email: 'ranithirumanasevaimayam@gmail.com',
  phones: ['9003192733'],
  displayPhones: '+91 90031 92733',
  whatsapp: '9003192733',
  address: 'No 29, Mettukuppam Main Road, Sridevi Karumariamman Nagar, Nerkundram, Chennai 600107',
  hours: 'Monday – Sunday: 9:00 AM – 8:00 PM',
  copyrightYear: '2026'
};

export const REGISTRATION_STATUS = {
  NEW: 'new',
  REVIEWED: 'reviewed',
  COMPLETED: 'completed'
};

export const STATUS_CONFIG = {
  new: {
    label: 'New',
    badgeClass: 'status-new',
    bg: '#eff8ff',
    color: '#175cd3',
    border: '#b2ddff'
  },
  reviewed: {
    label: 'Reviewed',
    badgeClass: 'status-reviewed',
    bg: '#fefce8',
    color: '#a16207',
    border: '#fef08a'
  },
  completed: {
    label: 'Completed',
    badgeClass: 'status-completed',
    bg: '#ecfdf5',
    color: '#047857',
    border: '#a7f3d0'
  },
  // Legacy status fallbacks
  contacted: {
    label: 'Reviewed',
    badgeClass: 'status-reviewed',
    bg: '#fefce8',
    color: '#a16207',
    border: '#fef08a'
  },
  shortlisted: {
    label: 'Reviewed',
    badgeClass: 'status-reviewed',
    bg: '#fefce8',
    color: '#a16207',
    border: '#fef08a'
  },
  closed: {
    label: 'Completed',
    badgeClass: 'status-completed',
    bg: '#ecfdf5',
    color: '#047857',
    border: '#a7f3d0'
  }
};

export const STATUS_LABELS = {
  new: { label: 'New', class: 'status-new' },
  reviewed: { label: 'Reviewed', class: 'status-reviewed' },
  completed: { label: 'Completed', class: 'status-completed' },
  // Legacy status fallbacks
  contacted: { label: 'Reviewed', class: 'status-reviewed' },
  shortlisted: { label: 'Reviewed', class: 'status-reviewed' },
  closed: { label: 'Completed', class: 'status-completed' }
};

export const FORM_STEPS = [
  { id: 1, title: 'Basic Details', subtitle: 'Identity & Contact', icon: 'User' },
  { id: 2, title: 'Family Details', subtitle: 'Parents & Siblings', icon: 'Users' },
  { id: 3, title: 'Birth & Horoscope', subtitle: 'Astro & Stars', icon: 'Sparkles' },
  { id: 4, title: 'Education & Career', subtitle: 'Work & Income', icon: 'GraduationCap' },
  { id: 5, title: 'Religion & Location', subtitle: 'Caste & Native', icon: 'Camera' },
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
  { value: 'Single', label: 'Single (Unmarried)' },
  { value: 'Widowed', label: 'Widowed' },
  { value: 'Divorced', label: 'Divorced' }
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
    q: 'How does Rani Matrimony work?',
    a: 'Create a profile online or speak with our service center. Our team reviews the details, understands your family preferences, and introduces suitable profiles for your consideration.'
  },
  {
    q: 'How can I register a matrimonial profile?',
    a: 'Select “Register Profile” and complete the guided seven-step form. Our team will follow up after reviewing the submitted details.'
  },
  {
    q: 'Is profile verification available?',
    a: 'Yes. Submitted profile details are reviewed by the matrimonial service center before active match assistance begins. Please provide accurate information to help the review go smoothly.'
  },
  {
    q: 'What information is required to create a profile?',
    a: 'The form asks for basic personal details, family background, education and career information, horoscope details, location, a photo, and partner preferences.'
  },
  {
    q: 'How are suitable matches introduced?',
    a: 'After review, the team considers your stated preferences and shares compatible profiles through direct service-center communication, phone calls, and WhatsApp.'
  },
  {
    q: 'Can families contact the matrimony service directly?',
    a: 'Yes. Families are welcome to call, WhatsApp, or visit the service center to discuss a profile, preferences, registration support, or match introductions.'
  },
  {
    q: 'How can I update my profile?',
    a: 'Contact the service center with the changes you would like to make. The team can guide you on updating contact information, preferences, or other profile details.'
  },
  {
    q: 'How can I contact Rani Matrimony?',
    a: 'Call or WhatsApp us at 9003192733, use the inquiry form below, or visit the Nerkundram service center during office hours.'
  },
  {
    q: 'Where is the service center located?',
    a: 'Rani Matrimony is located at No 29, Mettukuppam Main Road, Sridevi Karumariamman Nagar, Nerkundram, Chennai 600107.'
  },
  {
    q: 'What are the office timings?',
    a: 'The service center is open Monday through Sunday, from 9:00 AM to 8:00 PM.'
  }
];

export const RELIGIONS = [
  { value: 'Hindu', label: 'Hindu (இந்து)' },
  { value: 'Christian', label: 'Christian (கிறிஸ்தவர்)' },
  { value: 'Muslim', label: 'Muslim (முஸ்லிம்)' },
  { value: 'Jain', label: 'Jain (சைனர்)' },
  { value: 'Sikh', label: 'Sikh (சீக்கியர்)' },
  { value: 'Buddhist', label: 'Buddhist (பௌத்தர்)' },
  { value: 'Inter-Religion', label: 'Inter-Religion (மத தடையில்லை)' },
  { value: 'Other', label: 'Other / Not Listed (பிற மதம்)' }
];

export const COMMUNITY_CATEGORIES = [
  { value: 'FC / General', label: 'FC / General (Forward Community / பொதுப்பிரிவு)' },
  { value: 'BC', label: 'BC (Backward Class / பிற்படுத்தப்பட்டோர்)' },
  { value: 'BCM', label: 'BCM (Backward Class Muslim)' },
  { value: 'MBC / DNC', label: 'MBC / DNC (Most Backward / மிகவும் பிற்படுத்தப்பட்டோர்)' },
  { value: 'SC', label: 'SC (Scheduled Caste / ஆதிதிராவிடர்)' },
  { value: 'ST', label: 'ST (Scheduled Tribe / பழங்குடியினர்)' },
  { value: 'Inter-Caste', label: 'Inter-Caste (கலப்பு சாதி)' },
  { value: 'Caste No Bar', label: 'Caste No Bar (சாதி தடையில்லை)' },
  { value: 'Other', label: 'Other / Not Listed' }
];

export const HINDU_CASTES = [
  'Pillai / Vellalar (பிள்ளை / வெள்ளாளர்)',
  'Mudaliar (முதலியார்)',
  'Brahmin - Iyer (பிராமணர் - ஐயர்)',
  'Brahmin - Iyengar (பிராமணர் - ஐயங்கார்)',
  'Brahmin - Gurukkal (பிராமணர் - குருக்கள்)',
  'Brahmin - Others (பிராமணர் - பிற)',
  'Nadar (நாடார்)',
  'Vanniyar / Padayachi (வன்னியர் / படையாட்சி)',
  'Chettiar / Arya Vysya (செட்டியார்)',
  'Gounder / Kongu Vellalar (கவுண்டர் / கொங்கு வெள்ளாளர்)',
  'Thevar / Mukkulathor (தேவர் / முக்குலத்தோர்)',
  'Kallar (கள்ளர்)',
  'Maravar (மறவர்)',
  'Agamudayar (அகமுடையார்)',
  'Naidu (நாயுடு)',
  'Reddy / Reddiar (ரெட்டி / ரெட்டியார்)',
  'Viswakarma / Achari / Kammalar (விஸ்வகர்மா / ஆச்சாரி)',
  'Yadava / Konar (யாதவர் / கோனார்)',
  'Devendra Kula Vellalar (தேவேந்திர குல வேளாளர்)',
  'Adi Dravidar (ஆதி திராவிடர்)',
  'Sengunthar / Kaikolar (செங்குந்தர் / கைகோளார்)',
  'Sourashtra (சௌராஷ்டிரா)',
  'Muthuraja / Mutharaiyar (முத்துராஜா / முத்தரையர்)',
  'Devanga Chettiar (தேவாங்க செட்டியார்)',
  'Vaniya Chettiar (வாணிய செட்டியார்)',
  'Nair (நாயர்)',
  'Ezhava / Thiyya (ஈழவர்)',
  'Arunthathiyar (அருந்ததியர்)',
  'Parkavakulam / Udayar / Moopanar (பார்கவகுலம் / உடையார்)',
  'Sozhiya Vellalar (சோழிய வெள்ளாளர்)',
  'Karkatha Vellalar (கார்காத்த வெள்ளாளர்)',
  'Isai Vellalar (இசை வெள்ளாளர்)',
  'Valluvar (வள்ளுவர்)',
  'Kulalar / Kuyavar (குலாலர் / குயவர்)',
  'Vannar (வண்ணார்)',
  'Maruthuvar / Navithar (மருத்துவர் / நாவிதர்)',
  'Boyar (போயர்)',
  'Gounder - Vettuva (வேட்டுவ கவுண்டர்)',
  'Kuruba / Kurumba (குரும்பர்)',
  'Pallar (பள்ளர்)',
  'Sakkiliar (சக்கிலியர்)',
  'Veerakodi Vellalar (வீரக்கொடி வெள்ளாளர்)',
  'Inter-Caste (கலப்பு சாதி)',
  'Caste No Bar (சாதி தடையில்லை)',
  'Other / Not Listed (பிற சாதி)'
];

export const CHRISTIAN_CASTES = [
  'Christian - RC (Roman Catholic / ரோமன் கத்தோலிக்கர்)',
  'Christian - CSI (Church of South India / சி.எஸ்.ஐ)',
  'Christian - Protestant (புராட்டஸ்டன்ட்)',
  'Christian - Pentecostal (பெந்தெகொஸ்தே)',
  'Christian - Nadar (கிறிஸ்தவ நாடார்)',
  'Christian - Vellalar / Pillai (கிறிஸ்தவ வெள்ளாளர்)',
  'Christian - Mudaliar (கிறிஸ்தவ முதலியார்)',
  'Christian - Anglo Indian (ஆங்கிலோ இந்தியன்)',
  'Christian - Marthoma / Syrian Catholic',
  'Christian - Latin Catholic',
  'Christian - Seventh Day Adventist',
  'Christian - Others / Caste No Bar',
  'Other / Not Listed (பிற சாதி)'
];

export const MUSLIM_CASTES = [
  'Muslim - Sunni (சுன்னி)',
  'Muslim - Shia (ஷியா)',
  'Muslim - Hanafi (ஹனபி)',
  'Muslim - Shafi (ஷாபி)',
  'Muslim - Rowther (ராவூத்தர்)',
  'Muslim - Marakkayar (மரைக்காயர்)',
  'Muslim - Lebbai (லெப்பை)',
  'Muslim - Syed (சையத்)',
  'Muslim - Sheikh (ஷேக்)',
  'Muslim - Pathan (பதான்)',
  'Muslim - Ansari (அன்சாரி)',
  'Muslim - Qureshi (குரேஷி)',
  'Muslim - Others / Caste No Bar',
  'Other / Not Listed (பிற பிரிவு)'
];

export const JAIN_CASTES = [
  'Jain - Digambar',
  'Jain - Shwetambar',
  'Jain - Agarwal',
  'Jain - Porwal',
  'Jain - Oswal',
  'Jain - Others',
  'Other / Not Listed (பிற பிரிவு)'
];

export const SIKH_CASTES = [
  'Sikh - Jat',
  'Sikh - Khatri',
  'Sikh - Ramgarhia',
  'Sikh - Arora',
  'Sikh - Others',
  'Other / Not Listed (பிற பிரிவு)'
];

export const ALL_CASTES = [
  ...HINDU_CASTES,
  ...CHRISTIAN_CASTES,
  ...MUSLIM_CASTES,
  ...JAIN_CASTES,
  ...SIKH_CASTES
];

export const getCastesForReligion = (religion) => {
  if (religion === 'Christian') return CHRISTIAN_CASTES;
  if (religion === 'Muslim') return MUSLIM_CASTES;
  if (religion === 'Jain') return JAIN_CASTES;
  if (religion === 'Sikh') return SIKH_CASTES;
  if (religion === 'Buddhist') return ['Buddhist - Navayana', 'Buddhist - Others', 'Caste No Bar', 'Other / Not Listed (பிற பிரிவு)'];
  if (religion === 'Inter-Religion') return ['Inter-Caste (கலப்பு சாதி)', 'Caste No Bar (சாதி தடையில்லை)', 'Other / Not Listed (பிற பிரிவு)'];
  return HINDU_CASTES;
};

export const INITIAL_FORM_STATE = {
  // Step 1: Basic
  profileFor: 'Self',
  gender: 'Female',
  name: '',
  age: '',
  dateOfBirth: '',
  phone: '',
  email: '',
  maritalStatus: 'Single',

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

  // Step 5: Religion, Caste & Location
  religion: 'Hindu',
  community: '',
  caste: '',
  subCaste: '',
  customCaste: '',
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
