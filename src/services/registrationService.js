import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { generateRegistrationId } from '../utils/helpers';
import { REGISTRATION_STATUS } from '../utils/constants';

const DEMO_REGISTRATIONS_KEY = 'rani_matrimony_demo_registrations';

// Initialize some realistic starter registrations if demo mode is active and empty
function getDemoRegistrations() {
  const data = localStorage.getItem(DEMO_REGISTRATIONS_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  const initialSampleData = [
    {
      id: 'RANI-7A8B9C12',
      registrationId: 'RANI-7A8B9C12',
      status: REGISTRATION_STATUS.NEW,
      profileFor: 'Daughter',
      gender: 'Female',
      name: 'கார்த்திகா சுப்பிரமணியன் (Karthika S)',
      age: '25',
      dateOfBirth: '2001-04-18',
      phone: '9840123456',
      email: 'karthika.s@example.com',
      maritalStatus: 'Never Married',
      fatherName: 'சுப்பிரமணியன் (Subramanian)',
      motherName: 'மீனாட்சி (Meenakshi)',
      fatherOccupation: 'Retired Government Officer',
      motherOccupation: 'Home Maker',
      siblings: '1 Elder Brother (Married, Software Architect)',
      familyType: 'Nuclear Family',
      birthStar: 'Rohini',
      zodiacSign: 'Rishabam',
      lagnam: 'Kanni',
      gothram: 'Siva',
      dosham: 'None / இல்லை',
      height: "5 ft 4 in (163 cm)",
      education: 'B.E (Computer Science), Anna University',
      occupation: 'Senior Software Engineer, TCS Chennai',
      employedIn: 'Private Sector',
      income: '₹60,000 – ₹1,00,000 / மாதம்',
      casteReligion: 'Hindu / Pillai',
      location: 'Anna Nagar, Chennai',
      nativePlace: 'Madurai',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      photoPublicId: 'sample_photo_1',
      expectation: 'Looking for a well-educated, cultured groom from a good family background working in Chennai or Bangalore. B.E / MBA preferred.',
      consentAccepted: true,
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    {
      id: 'RANI-9K2M4P67',
      registrationId: 'RANI-9K2M4P67',
      status: REGISTRATION_STATUS.CONTACTED,
      profileFor: 'Son',
      gender: 'Male',
      name: 'விஜயகுமார் சுந்தரம் (Vijayakumar S)',
      age: '28',
      dateOfBirth: '1998-08-12',
      phone: '9790876543',
      email: 'vijay.kumar@example.com',
      maritalStatus: 'Never Married',
      fatherName: 'சுந்தரம் (Sundaram)',
      motherName: 'பார்வதி (Parvathi)',
      fatherOccupation: 'Business (Textiles)',
      motherOccupation: 'Home Maker',
      siblings: '1 Younger Sister (B.Com, Unmarried)',
      familyType: 'Joint Family',
      birthStar: 'Ashwini',
      zodiacSign: 'Mesham',
      lagnam: 'Simham',
      gothram: 'Vishnu',
      dosham: 'None / இல்லை',
      height: "5 ft 10 in (178 cm)",
      education: 'MBA, Loyola College Chennai',
      occupation: 'Marketing Manager, HDFC Bank',
      employedIn: 'Private Sector',
      income: '₹1,00,000 – ₹2,00,000 / மாதம்',
      casteReligion: 'Hindu / Mudaliar',
      location: 'T. Nagar, Chennai',
      nativePlace: 'Kanchipuram',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
      photoPublicId: 'sample_photo_2',
      expectation: 'Seeking an affectionate and family-oriented bride with a degree. Employed or homemaker welcome.',
      consentAccepted: true,
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 12).toISOString()
    }
  ];

  localStorage.setItem(DEMO_REGISTRATIONS_KEY, JSON.stringify(initialSampleData));
  return initialSampleData;
}

/**
 * Creates a new matrimonial registration document
 */
export async function createRegistration(formData) {
  const regId = generateRegistrationId();
  const registrationRecord = {
    ...formData,
    registrationId: regId,
    status: REGISTRATION_STATUS.NEW,
    createdAt: isFirebaseConfigured ? serverTimestamp() : new Date().toISOString(),
    updatedAt: isFirebaseConfigured ? serverTimestamp() : new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'registrations', regId);
      await setDoc(docRef, registrationRecord);
      return { id: regId, ...registrationRecord };
    } catch (error) {
      console.error('Firestore create error:', error);
      throw new Error('We could not save your registration right now. Please try again in a moment.');
    }
  } else {
    // Save to local demo storage
    const list = getDemoRegistrations();
    list.unshift({ id: regId, ...registrationRecord });
    localStorage.setItem(DEMO_REGISTRATIONS_KEY, JSON.stringify(list));
    return { id: regId, ...registrationRecord };
  }
}

/**
 * Retrieves all registrations for admin view
 */
export async function getRegistrations() {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'registrations'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
    } catch (error) {
      console.error('Firestore list error:', error);
      throw new Error('Failed to load registrations. Verify Admin UID and Security Rules.');
    }
  } else {
    return getDemoRegistrations();
  }
}

/**
 * Retrieves a single registration by ID
 */
export async function getRegistration(registrationId) {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'registrations', registrationId);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error('Registration profile not found.');
      }
      return { id: docSnap.id, ...docSnap.data() };
    } catch (error) {
      console.error('Firestore get error:', error);
      throw error;
    }
  } else {
    const list = getDemoRegistrations();
    const item = list.find((r) => r.id === registrationId || r.registrationId === registrationId);
    if (!item) {
      throw new Error('Registration profile not found.');
    }
    return item;
  }
}

/**
 * Updates status of a registration
 */
export async function updateRegistrationStatus(registrationId, newStatus) {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'registrations', registrationId);
      await updateDoc(docRef, {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Firestore update error:', error);
      throw new Error('Failed to update registration status.');
    }
  } else {
    const list = getDemoRegistrations();
    const index = list.findIndex((r) => r.id === registrationId || r.registrationId === registrationId);
    if (index !== -1) {
      list[index].status = newStatus;
      list[index].updatedAt = new Date().toISOString();
      localStorage.setItem(DEMO_REGISTRATIONS_KEY, JSON.stringify(list));
      return true;
    }
    throw new Error('Registration not found.');
  }
}

/**
 * Deletes a registration document
 */
export async function deleteRegistration(registrationId) {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'registrations', registrationId);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error('Firestore delete error:', error);
      throw new Error('Failed to delete registration.');
    }
  } else {
    let list = getDemoRegistrations();
    list = list.filter((r) => r.id !== registrationId && r.registrationId !== registrationId);
    localStorage.setItem(DEMO_REGISTRATIONS_KEY, JSON.stringify(list));
    return true;
  }
}
