# Rani Thirumana Sevai Maiyam — Build Specification for Gemini / Antigravity

## 1. Role and mission

You are building a polished production-style **React frontend** for **Rani Thirumana Sevai Maiyam** (ராணி திருமண சேவை மையம்).

Use the two supplied reference images as the visual source of truth:

1. A matrimonial profile-card design.
2. A horizontal business banner.

The finished website must feel like the same business and design language, but it must be redesigned for the web so it is modern, responsive, readable, and easy to fill in on both mobile and desktop.

### Non-negotiable technical constraint

Use **React only for the application frontend**.

Do not create:

- Express server
- Node backend server
- Python backend
- PHP backend
- SQL server
- custom REST API
- custom GraphQL server

Use:

- React + Vite
- React Router
- Firebase Authentication
- Firebase Firestore
- Cloudinary

The browser communicates directly with Firebase and Cloudinary.

---

## 2. Product concept

The product is a digital version of the matrimony service center's physical registration/profile workflow.

### Public user journey

```text
Home
  ↓
View service information
  ↓
Click “Register / மணமக்கள் விவரம்”
  ↓
Complete multi-step registration form
  ↓
Upload profile photo
  ↓
Review submitted information
  ↓
Submit
  ↓
Upload photo to Cloudinary
  ↓
Create Firestore registration document
  ↓
Show “Successfully Registered” page
  ↓
Show registration reference ID
```

### Admin journey

```text
Admin Login
   ↓
Firebase Authentication
   ↓
Verify authenticated UID is the authorized admin UID
   ↓
Admin Dashboard
   ↓
Load registration records from Firestore
   ↓
Search / filter / sort
   ↓
Open a profile
   ↓
View all submitted data + photo
   ↓
Optional status update / delete capability
```

---

## 3. Brand direction

### Visual source of truth

The supplied artwork has the following unmistakable characteristics:

- Traditional South Indian matrimonial visual language.
- Strong maroon/red typography.
- Antique gold ornamental accents.
- Warm ivory/cream background.
- Marriage-couple illustration.
- Circular emblem/logo treatment.
- Thin decorative borders.
- Floral elements.
- Formal serif Tamil title styling.
- English translations beneath many labels.

### Design target

Do NOT simply put the supplied poster image on the page and call it a website.

Instead, reconstruct its visual language as a real responsive UI.

The page should look approximately like a **premium matrimonial service website** that grew out of the original printed design.

---

## 4. Design tokens

Create one design-token stylesheet and use variables everywhere.

```css
:root {
  --maroon-950: #4a0712;
  --maroon-900: #5a0715;
  --maroon-800: #6f0b1c;
  --maroon-700: #8a1026;
  --maroon-500: #a51d34;

  --gold-800: #7e5510;
  --gold-700: #9a6b16;
  --gold-500: #c7962f;
  --gold-300: #e3bd63;
  --gold-100: #f7e7bb;

  --ivory: #fffaf0;
  --cream: #f8eddc;
  --paper: #fffdf8;

  --ink: #35131a;
  --muted: #7b6468;
  --border: #e5c987;
  --line: #ead8a8;

  --success: #287a45;
  --danger: #b42318;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --shadow-soft: 0 12px 30px rgba(74, 7, 18, 0.08);
}
```

### Typography

Load:

- `Noto Serif Tamil` for Tamil headings.
- `Noto Sans Tamil` for Tamil labels/body.
- `Cormorant Garamond` or `Playfair Display` for English decorative headings.
- `Inter` for English UI/body.

Use Tamil text prominently, with the English label underneath or beside it for important fields.

Do not use an all-caps Latin UI for everything. The identity is bilingual and should feel respectful and local.

---

## 5. Global visual rules

### Do

- Use ivory/cream backgrounds.
- Use maroon for primary action buttons.
- Use gold for borders, ornaments, section dividers, icons, and highlights.
- Use maroon + gold combinations for headings and pills.
- Use soft cream cards instead of generic white dashboard cards everywhere.
- Use subtle traditional ornament motifs.
- Use thin gold separators.
- Use rounded corners, but not exaggerated “startup SaaS” cards.
- Make forms highly readable.

### Do not

- Use neon colors.
- Use purple/blue gradient UI.
- Use a generic Bootstrap dashboard look.
- Use excessive glassmorphism.
- Overuse drop shadows.
- Make the website look like a dating/social-media app.

---

## 6. Recommended information architecture

Routes:

```text
/
/register
/register/success/:registrationId
/admin/login
/admin
/admin/registrations/:id
/404
```

### Route behavior

- `/` → public home.
- `/register` → registration wizard.
- `/register/success/:registrationId` → success state.
- `/admin/login` → admin login.
- `/admin` → protected admin dashboard.
- `/admin/registrations/:id` → protected registration detail.
- Anything unknown → branded not-found page.

---

## 7. Home page specification

Build a polished responsive home page.

### Header

Desktop:

- Logo on left.
- Tamil brand name.
- Navigation: Home, About, Registration, Contact.
- Strong maroon “Register Now” button.
- Small admin link in a discreet location; do not make admin the visual focus.

Mobile:

- Compact brand header.
- Hamburger navigation.
- Full-width CTA.

### Hero

Hero should reflect the supplied banner without being a screenshot.

Use:

- Cream/ivory background.
- Maroon heading.
- Gold decorative line.
- Marriage imagery or the provided branded artwork as an image asset.
- Large CTA: `மணமக்கள் பதிவு` / `Register Profile`.

Suggested hero copy:

```text
ராணி திருமண சேவை மையம்
அனைத்து சமூகத்தினருக்கும்.
நல்ல வரன்... நல்ல வாழ்க்கை... ❤️
```

Add a secondary contact CTA.

### About/service section

Explain simply:

- Matrimonial profile registration.
- Family details.
- Education & occupation details.
- Horoscope-related information.
- Profile photo collection.
- Personalized matchmaking assistance.

### Why choose us

Use 3–4 cards:

- Traditional & trusted service.
- Detailed family information.
- Easy registration.
- Direct service-center assistance.

### Contact section

Use the banner's business contact details:

```text
909 217 7888 / 900 319 2733
0444 662 1102
ranithirumanasevaimayam@gmail.com
No 29, Mettukuppam Main Road,
Sridevi Karumariamman Nagar,
Nerkundram, Chennai 600107
```

Phone/email should be clickable.

### Footer

Include:

- Brand.
- Service links.
- Contact.
- Privacy notice.
- Copyright.

---

## 8. Registration page — important

This page is the heart of the application.

Do **not** create one extremely long form if it makes the mobile experience difficult. Use a **multi-step form** with a visible progress indicator.

Suggested steps:

```text
1. Basic Details
2. Family Details
3. Birth / Horoscope
4. Education / Career
5. Photo & Location
6. Expectations
7. Review & Submit
```

The form must preserve values when navigating backward/forward.

Do not lose user input if an image upload fails.

---

## 9. Step 1 — Basic details

Fields:

### Required from reference card

```text
பெயர்
Name
```

```text
வயது
Age
```

```text
பிறந்த தேதி
Date of Birth
```

### Recommended digital additions

```text
Profile For
Gender
Phone Number
Email
Marital Status
```

Use sensible validation.

Examples:

- Name: required, 2+ characters.
- Age: numeric, sane adult range.
- DOB: valid date, cannot be in the future.
- Phone: validate Indian phone format, but keep the validation forgiving enough for valid formats.
- Email: optional unless the business requires it.

---

## 10. Step 2 — Family details

Reference fields:

```text
அப்பா பெயர்
Father Name

அம்மா பெயர்
Mother Name

உடன் பிறந்தவர்கள்
Siblings
```

Recommended presentation:

- Parent details as separate fields.
- Siblings as a textarea with helper text, for example:
  `Brother / Sister, age, marital status, occupation`.

---

## 11. Step 3 — Birth / horoscope details

Fields:

```text
நட்சத்திரம்
Birth Star

ராசி
Zodiac Sign

லக்கினம்
Lagnam
```

Use dropdowns instead of free text where a stable option set exists.

Recommended constants:

### Zodiac

- Mesham
- Rishabam
- Mithunam
- Kadagam
- Simham
- Kanni
- Thulam
- Vrischikam
- Dhanusu
- Makaram
- Kumbam
- Meenam

### Nakshatra

Use the standard 27 nakshatra options.

### Lagnam

Use the standard 12 lagnam options.

Keep display labels bilingual where practical.

---

## 12. Step 4 — Education / career

Fields:

```text
உயரம்
Height

கல்வி
Education

தொழில்
Occupation

வருமானம்
Income
```

### UX

- Height can be entered as cm, with optional feet/inches helper.
- Education can use searchable/selectable options plus `Other`.
- Occupation can support common options plus free-text `Other`.
- Income should not force an overly precise value if applicants prefer a range.

Recommended income options:

```text
Below ₹20,000
₹20,000 – ₹40,000
₹40,000 – ₹60,000
₹60,000 – ₹1,00,000
₹1,00,000+
Prefer not to say
```

---

## 13. Step 5 — Photo & location

Reference fields:

```text
Photo
இருப்பிடம்
Location
```

### Photo UX

Create a premium photo-upload card:

- Large portrait preview.
- Maroon/gold border.
- Drag/drop on desktop.
- Click to choose on mobile.
- Upload progress.
- Replace photo.
- Remove photo.
- Error message.

Cloudinary workflow:

```text
Select image
   ↓
Validate locally
   ↓
Open/upload through Cloudinary widget
   ↓
Receive secure URL + public ID
   ↓
Store result in React state
   ↓
On final submit, write URL/public ID to Firestore
```

Never put Cloudinary API secret in the React app.

### Location

Use text or a simple city/area field for the first version.

Do not request browser geolocation automatically. A matrimony registration form does not need exact GPS location.

---

## 14. Step 6 — Expectations

Reference label:

```text
எதிர்பார்ப்பு
```

Provide a large textarea:

```text
உதாரணம்:
கல்வி, தொழில், குடும்ப பின்னணி, வசிப்பிடம், வயது விருப்பம் போன்ற எதிர்பார்ப்புகளை குறிப்பிடலாம்.
```

Do not impose unnecessarily restrictive character limits.

---

## 15. Step 7 — Review & submit

Show a clean summary before submission.

Display:

- Photo.
- Name.
- Age.
- DOB.
- Family details.
- Horoscope details.
- Education/career.
- Religion/caste.
- Location.
- Expectations.

Include:

```text
☐ நான் அளித்த தகவல்கள் சரியானவை என்பதை உறுதிப்படுத்துகிறேன்.
☐ திருமண சேவை மையம் இந்த தகவல்களை தொடர்பு மற்றும் மணமக்கள் அறிமுக நோக்கத்திற்காக பயன்படுத்தலாம்.
```

Submission button:

```text
பதிவை சமர்ப்பிக்கவும்
Submit Registration
```

Disable the button while saving.

Show a progress state:

```text
Submitting your profile…
```

---

## 16. Registration success screen

After Firestore successfully creates the document, navigate to:

```text
/register/success/:registrationId
```

Show a premium success card:

```text
பதிவு வெற்றிகரமாக நிறைவடைந்தது
Registration Successful

உங்கள் விவரங்கள் வெற்றிகரமாக பெறப்பட்டுள்ளன.
Our matrimonial service center will review your details.
```

Show:

```text
Registration ID: RANI-XXXXXXXX
```

Use a human-friendly reference derived from the generated Firestore ID. It should not expose sensitive database internals beyond what is necessary.

Buttons:

- `முகப்பு` / Back Home
- `புதிய பதிவு` / New Registration

Do not show the user's entire submitted data on the success page.

---

## 17. Admin login

Route:

```text
/admin/login
```

Design:

- Centered premium login card.
- Logo/brand.
- Maroon and gold theme.
- Email.
- Password.
- Show/hide password.
- Login button.
- Friendly error state.

### Authentication rule

Use Firebase Authentication.

Do not implement:

```text
localStorage admin = true
```

Do not hard-code:

```text
admin@example.com
password123
```

The frontend may use `VITE_ADMIN_UID` only as a secondary UI check. Firestore Security Rules must be the final protection.

---

## 18. Admin dashboard

Route:

```text
/admin
```

### Dashboard header

Show:

```text
ராணி திருமண சேவை மையம்
Admin Dashboard
```

Actions:

- Logout.
- Refresh.

### Summary cards

Examples:

```text
Total Registrations
Today
Pending Review
Profiles with Photos
```

These should be calculated from the currently loaded records.

### Registration table

Desktop columns:

```text
Photo
Name
Age
Location
Education
Occupation
Status
Registered On
Action
```

Mobile should become cards rather than an impossible horizontal table.

### Search

Search by:

- Name.
- Phone.
- Location.
- Occupation.
- Registration ID.

### Filters

Useful first-version filters:

- Status: New / Contacted / Shortlisted / Closed.
- Gender.
- Location.
- Age range.
- Has photo.

### Sort

Default:

```text
Newest first
```

Allow:

- Newest.
- Oldest.
- Name A–Z.
- Name Z–A.

---

## 19. Admin profile detail

Route:

```text
/admin/registrations/:id
```

Show a two-column desktop layout:

### Left

Large photo with a maroon/gold frame.

### Right

Profile identity and all submitted fields.

Sections:

```text
Basic Details
Family Details
Birth / Horoscope
Education & Career
Social Information
Location
Expectations
Registration Metadata
```

Actions:

- Mark as Contacted.
- Mark as Shortlisted.
- Mark as Closed.
- Delete registration.

Deletion must have confirmation:

```text
Are you sure you want to delete this registration?
This action cannot be undone.
```

Only add edit/delete functionality if the Firestore rules and UX are fully implemented.

---

## 20. Firestore data model

Use:

```text
registrations/{registrationId}
```

Example document shape:

```json
{
  "registrationId": "RANI-8F3K2A1C",
  "status": "new",

  "name": "",
  "fatherName": "",
  "motherName": "",
  "siblings": "",
  "age": 0,
  "dateOfBirth": null,
  "birthStar": "",
  "zodiacSign": "",
  "lagnam": "",
  "height": "",
  "education": "",
  "occupation": "",
  "income": "",
  "casteReligion": "",
  "location": "",
  "expectation": "",

  "profileFor": "",
  "gender": "",
  "maritalStatus": "",
  "phone": "",
  "email": "",

  "photoUrl": "",
  "photoPublicId": "",

  "consentAccepted": true,
  "createdAt": null,
  "updatedAt": null
}
```

Never store the raw uploaded file in Firestore.

---

## 21. Firestore security model

### Public registration

Allow a visitor to create a new registration.

Do NOT allow visitors to read all registrations.

Do NOT allow visitors to update another registration.

Do NOT allow visitors to delete registrations.

### Admin

Only the authorized admin UID can:

- list registrations.
- read registration details.
- update status.
- delete records.

The UI's `ProtectedRoute` is not the security boundary. Firestore rules are.

Use security-rule validation for important constraints.

Do not deploy permissive rules like:

```text
allow read, write: if true;
```

---

## 22. Authentication behavior

Create an auth provider/hook.

Recommended pattern:

```text
AuthProvider
   ↓
Firebase onAuthStateChanged
   ↓
Expose user + loading
   ↓
ProtectedRoute
   ↓
Admin pages
```

On admin login:

1. Call Firebase email/password sign-in.
2. Wait for auth state.
3. Check authenticated user's UID against `VITE_ADMIN_UID` for UI routing.
4. Navigate to `/admin`.
5. Let Firestore rules independently permit/deny the data read.

On logout:

```text
signOut(auth)
```

Then return to `/admin/login`.

---

## 23. Cloudinary implementation

Create a dedicated component:

```text
ProfilePhotoUploader.jsx
```

Responsibilities:

- Load the Cloudinary Upload Widget.
- Launch upload.
- Restrict image source to local/camera where useful.
- Receive success callback.
- Return:
  - secure URL
  - public ID
- Show preview.
- Show upload errors.

Never send Cloudinary API secret from the browser.

Use an unsigned upload preset for the frontend-only build, with restrictive preset settings.

---

## 24. Form architecture

Use a central form state object:

```js
const initialForm = {
  profileFor: '',
  gender: '',
  name: '',
  age: '',
  dateOfBirth: '',
  fatherName: '',
  motherName: '',
  siblings: '',
  birthStar: '',
  zodiacSign: '',
  lagnam: '',
  height: '',
  education: '',
  occupation: '',
  income: '',
  casteReligion: '',
  location: '',
  phone: '',
  email: '',
  maritalStatus: '',
  photoUrl: '',
  photoPublicId: '',
  expectation: '',
  consentAccepted: false
};
```

Create reusable field components so validation and styling are consistent.

---

## 25. Validation

Validation must happen before upload/submission.

### Required

At minimum:

- Name.
- Age.
- DOB.
- Father name.
- Mother name.
- Birth star.
- Zodiac sign.
- Lagnam.
- Height.
- Education.
- Occupation.
- Caste/religion.
- Location.
- Photo.
- Expectations.
- Phone.
- Consent.

Make the business-required fields configurable in `constants.js`.

### Validation UX

- Validate on blur after the user touches a field.
- Show errors beneath the field.
- On submit, focus the first invalid field.
- Avoid browser-native `alert()` for normal validation.
- Use accessible error text.

---

## 26. Responsive behavior

### Desktop

- Max content width around 1200–1280px.
- Two-column form sections where appropriate.
- Wide hero.
- Dashboard table.

### Tablet

- Reduce to one-column forms where necessary.
- Keep image preview visible.

### Mobile

- Single-column form.
- Sticky or easy-to-find Continue button where sensible.
- Large touch targets.
- Horizontal overflow must be avoided.
- Admin table becomes stacked cards.
- Header becomes compact.
- Avoid tiny Tamil labels.

Test at least approximately:

```text
390 x 844
768 x 1024
1440 x 900
```

---

## 27. Accessibility

Implement:

- Semantic headings.
- `<label>` for every field.
- Proper input types.
- `aria-invalid` on invalid fields.
- Keyboard accessible controls.
- Visible focus states.
- Sufficient text contrast.
- `alt` text for meaningful images.
- Decorative artwork marked as decorative where appropriate.

Do not rely on color alone to communicate validation state.

---

## 28. Error and loading states

Every network action needs three states:

```text
idle
loading
success/error
```

Examples:

### Cloudinary error

```text
Photo upload failed. Please choose the image again.
```

### Firestore error

```text
We could not save your registration right now.
Please try again in a moment.
```

### Admin auth error

```text
Invalid admin credentials or access is not authorized.
```

Never show raw Firebase exception messages directly to ordinary users.

---

## 29. Progressive enhancement / UX improvements

These are intentional improvements over the printed registration card.

### Auto-calculated age

If DOB is entered, calculate age automatically and keep it synchronized.

Let the user correct it only if business rules require manual age input.

### Review step

A final review step reduces incomplete submissions and spelling errors.

### Registration reference

Every successful submission gets a human-friendly ID.

### Admin status

Use:

```text
new
contacted
shortlisted
closed
```

This turns the admin panel into a useful working tool instead of only a read-only list.

### Empty states

When there are no registrations:

```text
No registrations found yet.
```

### Confirmation before destructive action

Never delete silently.

---

## 30. Components to create

Required components:

```text
BrandHeader
Footer
HeroSection
ServiceHighlights
ContactSection
SectionTitle
ProgressStepper
FormField
SelectField
TextAreaField
ProfilePhotoUploader
ReviewCard
RegistrationSuccessCard
ProtectedRoute
AdminSidebar
AdminHeader
StatsCard
RegistrationTable
RegistrationCard
RegistrationDetail
SearchBar
FilterBar
StatusBadge
ConfirmDialog
LoadingSpinner
ErrorBanner
EmptyState
```

Keep each component small and reusable.

---

## 31. Service modules

### `firebase.js`

Initialize Firebase once.

Export:

```text
app
auth
db
```

### `authService.js`

Functions:

```text
loginAdmin(email, password)
logoutAdmin()
subscribeToAuth(callback)
```

### `registrationService.js`

Functions:

```text
createRegistration(data)
getRegistration(id)
getRegistrations()
updateRegistrationStatus(id, status)
deleteRegistration(id)
```

### `cloudinaryService.js`

Functions/utilities:

```text
initializeUploadWidget()
uploadProfilePhoto()
```

Do not put Firebase query logic directly inside JSX.

---

## 32. Performance

Implement:

- Lazy-loaded routes for admin pages where reasonable.
- Compressed/optimized Cloudinary images.
- Avoid large local image files as page backgrounds.
- Avoid loading the full admin dataset repeatedly when not necessary.
- Use memoization only where it provides measurable benefit; do not over-engineer.

For a larger production dataset, the dashboard should eventually use Firestore pagination instead of loading every registration into memory. The first version can be simple if the expected registration count is small.

---

## 33. SEO and metadata

Set:

```text
Title:
ராணி திருமண சேவை மையம் | Rani Marriage Service Center

Description:
ராணி திருமண சேவை மையம் — மணமக்கள் பதிவு மற்றும் திருமண சேவை.
```

Add a favicon using the brand mark.

Use semantic HTML and descriptive page headings.

---

## 34. Assets

Use the supplied images as reference assets.

Do not stretch them unnaturally.

Recommended asset usage:

- Extract/crop the business logo for the header.
- Use the horizontal banner as a hero/supporting visual only if resolution is sufficient.
- Use the profile-card image mainly as design reference for the form layout.
- Recreate the printed form as responsive web components instead of embedding the whole screenshot.

If image extraction is not clean enough, preserve the original image as a reference asset and build a vector/CSS-based UI around it.

---

## 35. Suggested page styling details

### Home

Hero:

```text
Background: ivory
Top/bottom ornaments: gold
Main heading: maroon
CTA: maroon background + ivory text
Secondary CTA: ivory background + maroon border
```

### Registration

Use a large cream card with:

```text
Gold 1–2 px border
Soft maroon shadow
Round corners
Decorative top ornament
```

Section headings can use a pill/banner treatment inspired by the printed card:

```text
[  மணமக்கள் விவரம்  ]
```

but keep it subtle on small screens.

### Admin

Do not abandon the brand in the admin panel.

Use:

- Ivory background.
- Maroon sidebar/header.
- Gold accents.
- Cream data cards.

The admin dashboard should look like the same business, not a separate SaaS product.

---

## 36. Suggested constants

Create `src/utils/constants.js`:

```js
export const BRAND = {
  tamilName: 'ராணி திருமண சேவை மையம்',
  englishName: 'Rani Marriage Service Center',
  tagline: 'அனைத்து சமூகத்தினருக்கும்.',
  subTagline: 'நல்ல வரன்... நல்ல வாழ்க்கை... ❤️',
  email: 'ranithirumanasevaimayam@gmail.com',
  phones: ['9092177888', '9003192733', '04446621102'],
  address:
    'No 29, Mettukuppam Main Road, Sridevi Karumariamman Nagar, Nerkundram, Chennai 600107'
};

export const REGISTRATION_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  SHORTLISTED: 'shortlisted',
  CLOSED: 'closed'
};
```

Keep all labels/options centralized similarly.

---

## 37. Recommended admin-firestore rule strategy

For the frontend-only MVP, use one fixed admin UID.

Conceptual rule behavior:

```text
CREATE registrations:
  allowed for unauthenticated visitors only when the submitted data passes validation.

READ registrations:
  allowed only for authenticated admin UID.

UPDATE registrations:
  allowed only for authenticated admin UID.

DELETE registrations:
  allowed only for authenticated admin UID.
```

Do not use the `VITE_ADMIN_UID` variable as the only authorization mechanism. It is visible to the browser. The same admin UID must be enforced by Firestore rules.

---

## 38. Important privacy considerations

The registration contains personal and family information.

Therefore:

- Do not expose all registrations to the public.
- Do not place registration data in URLs.
- Do not log full profile data to the browser console.
- Do not store unnecessary sensitive information.
- Do not show private contact details publicly unless the business intentionally decides to do so.
- Keep Cloudinary assets in an appropriate folder and review whether unrestricted public image URLs are acceptable for the business.

Before real-world launch, define a privacy notice and retention/deletion policy suitable for the organization's operations and applicable law.

---

## 39. Testing plan

### Functional

- [ ] Home page loads.
- [ ] Registration route works.
- [ ] Step navigation works.
- [ ] Back navigation preserves values.
- [ ] Validation prevents invalid submission.
- [ ] Photo upload works.
- [ ] Registration saves to Firestore.
- [ ] Success page appears.
- [ ] Admin login works with authorized credentials.
- [ ] Unauthorized user cannot read registrations.
- [ ] Admin can view registrations.
- [ ] Search works.
- [ ] Filters work.
- [ ] Detail page works.
- [ ] Status changes work if enabled.
- [ ] Delete confirmation works if enabled.
- [ ] Logout works.

### UI

- [ ] Desktop checked.
- [ ] Tablet checked.
- [ ] Mobile checked.
- [ ] No overlapping elements.
- [ ] No text clipping.
- [ ] No horizontal page scrolling.
- [ ] Tamil text renders correctly.
- [ ] Images preserve aspect ratio.
- [ ] Buttons have appropriate hit areas.

### Failure testing

Test:

- Cloudinary upload failure.
- Firestore write failure.
- Invalid admin password.
- Admin session expired.
- Slow network.
- Missing image.
- Empty Firestore collection.
- Very long names/expectations.

---

## 40. Build verification

Run:

```bash
npm install
npm run dev
npm run build
npm run preview
```

The production build should finish without errors.

Vite's production workflow outputs a deployable static bundle, normally in `dist`. [Vite Build](https://vite.dev/guide/build)

Before final handoff:

```bash
npm run build
```

must succeed.

---

## 41. Code-quality requirements for Antigravity / Gemini

When generating code:

1. Build incrementally.
2. Do not replace working code unnecessarily.
3. Keep components focused.
4. Keep Firebase/Cloudinary logic outside page JSX.
5. Use stable keys for lists.
6. Handle async errors explicitly.
7. Do not swallow exceptions.
8. Do not hard-code secrets.
9. Keep user-facing copy centralized where practical.
10. Avoid giant 1000+ line React components.
11. Do not invent additional frameworks that conflict with the React-only requirement.
12. Keep the final application runnable with normal npm commands.

---

## 42. Implementation order

Build in this order and do not jump around:

### Phase 1 — Foundation

- Vite React project.
- Routing.
- Global styles.
- Design tokens.
- Fonts.
- Brand assets.

### Phase 2 — Public site

- Header.
- Hero.
- Services.
- About.
- Contact.
- Footer.

### Phase 3 — Registration form

- Multi-step state.
- Reusable form components.
- Validation.
- Review screen.
- Success page.

### Phase 4 — Firebase

- Firebase initialization.
- Firestore create-registration flow.
- Rules.
- Admin Authentication.

### Phase 5 — Cloudinary

- Upload Widget.
- Photo preview.
- Error/loading states.
- Store image URL/public ID with registration.

### Phase 6 — Admin

- Login.
- Route protection.
- Dashboard.
- Search/filter/sort.
- Profile detail.
- Status actions.

### Phase 7 — Production polish

- Responsive improvements.
- Accessibility.
- Empty/error/loading states.
- Build verification.
- Security review.
- Performance review.

---

## 43. Definition of done

The task is complete only when all of the following are true:

```text
✅ React/Vite frontend only
✅ Uses Firebase Authentication
✅ Uses Firestore for registration data
✅ Uses Cloudinary for photos
✅ Matches maroon/gold/cream brand identity
✅ Supports Tamil + English UI labels
✅ Registration contains every field from the reference design
✅ Registration-success page exists
✅ Admin login exists
✅ Admin dashboard exists
✅ Admin can see submitted profile data
✅ Public users cannot read registrations
✅ No hard-coded admin password
✅ No Cloudinary API secret in frontend
✅ Responsive on desktop/tablet/mobile
✅ Good validation
✅ Good loading/error states
✅ npm run build passes
✅ No console errors in normal flows
```

---

## 44. Final implementation principle

The experience should feel like:

> **The original Rani matrimonial registration card redesigned as a premium, easy-to-use digital service.**

Preserve the emotional character of the supplied artwork — **maroon, antique gold, ivory, traditional Tamil typography, family/marriage symbolism and trust** — while making the actual web interaction modern, clear, accessible and reliable.
