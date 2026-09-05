# Setup Guide: Firebase Firestore & Cloudinary

This guide provides step-by-step instructions to configure **Firebase (Authentication & Cloud Firestore)** and **Cloudinary (Photo Uploads)** for the **Rani Thirumana Sevai Maiyam** (ராணி திருமண சேவை மையம்) web application.

---

## Table of Contents

1. [Quick Start & Demo Mode](#1-quick-start--demo-mode)
2. [Firebase Setup (Authentication & Firestore)](#2-firebase-setup)
   - [Step 2.1: Create Firebase Project](#step-21-create-a-firebase-project)
   - [Step 2.2: Enable Firebase Authentication](#step-22-enable-firebase-authentication)
   - [Step 2.3: Create Cloud Firestore Database](#step-23-create-cloud-firestore-database)
   - [Step 2.4: Deploy Firestore Security Rules](#step-24-deploy-firestore-security-rules)
   - [Step 2.5: Register Web App & Get API Keys](#step-25-register-web-app--get-api-keys)
3. [Cloudinary Setup (Unsigned Upload Preset)](#3-cloudinary-setup)
   - [Step 3.1: Create Cloudinary Account](#step-31-create-a-cloudinary-account)
   - [Step 3.2: Create Unsigned Upload Preset](#step-32-create-an-unsigned-upload-preset)
4. [Environment Configuration (`.env`)](#4-environment-configuration)
5. [Running and Testing the Application](#5-running-and-testing)

---

## 1. Quick Start & Demo Mode

The application is built with an **intelligent fallback demo mode**. You can run the app immediately even before configuring Firebase or Cloudinary:

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```

In Demo Mode:
- Registrations are saved in browser storage (`localStorage`).
- Admin portal login uses demo credentials:
  - **Email:** `admin@ranimatrimony.com`
  - **Password:** `Admin@123`

---

## 2. Firebase Setup

### Step 2.1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **"Add project"** (or **"Create a project"**).
3. Enter your project name (e.g. `rani-matrimony`).
4. Google Analytics is optional (enable or disable based on preference) and click **"Create project"**.

---

### Step 2.2: Enable Firebase Authentication

1. In the Firebase Console left sidebar, navigate to **Build** → **Authentication**.
2. Click **"Get started"**.
3. Under the **"Sign-in method"** tab, select **Email/Password**.
4. Toggle **Enable** on and click **Save**.
5. Switch to the **"Users"** tab:
   - Click **"Add user"**.
   - Enter your Administrator email (e.g. `admin@ranimatrimony.com`) and a strong password.
   - Click **"Add user"**.
   - Copy the **User UID** of this newly created user (you will use this in `.env` as `VITE_ADMIN_UID`).

---

### Step 2.3: Create Cloud Firestore Database

1. In the left sidebar, navigate to **Build** → **Firestore Database**.
2. Click **"Create database"**.
3. Choose a database location close to your users (e.g., `asia-south1 (Mumbai)` for India).
4. Select **Start in production mode** and click **Create**.

---

### Step 2.4: Deploy Firestore Security Rules

1. In Firestore, click on the **"Rules"** tab.
2. Paste the contents of the [`firestore.rules`](./firestore.rules) file:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return request.auth != null;
    }

    match /registrations/{registrationId} {
      // 1. Anyone can submit a registration with basic validations
      allow create: if request.resource.data.name is string
                    && request.resource.data.name.size() >= 2
                    && request.resource.data.phone is string
                    && request.resource.data.phone.size() >= 10
                    && request.resource.data.consentAccepted == true;

      // 2. Only authenticated Administrator can view, list, update, or delete profiles
      allow get, list: if isAdmin();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. Click **"Publish"**.

---

### Step 2.5: Register Web App & Get API Keys

1. In the Firebase Console, click the **Gear icon (⚙️)** next to "Project Overview" → **Project settings**.
2. Under the **"General"** tab, scroll down to **"Your apps"** and click the **Web icon (</>)**.
3. Register app nickname: `Rani Matrimony Web` and click **"Register app"**.
4. Copy the values inside `firebaseConfig`:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

---

## 3. Cloudinary Setup

Cloudinary is used for uploading and hosting matrimonial portrait photos directly from the client without storing secrets in the frontend.

### Step 3.1: Create a Cloudinary Account

1. Sign up for a free account at [Cloudinary](https://cloudinary.com/).
2. On your Cloudinary Dashboard, note down your **Cloud Name** (e.g. `dxyza123`).

---

### Step 3.2: Create an Unsigned Upload Preset

1. In Cloudinary Console, click the **Settings icon (⚙️)** in the top right.
2. Navigate to the **Upload** tab.
3. Scroll down to the **Upload presets** section and click **"Add upload preset"**.
4. Configure the preset:
   - **Upload preset name:** `rani_matrimony_preset`
   - **Signing Mode:** Select **Unsigned** *(Crucial: allows client-side direct uploads)*
   - **Folder:** `rani_matrimony_profiles`
   - **Allowed formats:** `jpg, png, webp, jpeg`
   - **Max file size:** `10 MB`
5. Click **Save**.

> [!CAUTION]
> **Never** expose or store your Cloudinary `API Secret` in the frontend codebase. The application only needs your **Cloud Name** and the **Unsigned Upload Preset Name**.

---

## 4. Environment Configuration

Create a file named `.env` in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Fill in your actual values in `.env`:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyD-YourActualApiKeyHere
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=rani_matrimony_preset

# Admin User UID (From Firebase Auth > Users)
VITE_ADMIN_UID=your_admin_user_uid_from_firebase_auth
```

---

## 5. Running and Testing

### Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Verification Steps:
1. **Public Home Page:** Visit `/` to see the full bilingual landing page and contact details.
2. **Registration Wizard:** Visit `/register` and complete all 7 steps:
   - Fill in Basic details, Family details, Birth/Horoscope details, Career details.
   - Upload a photo (via Cloudinary widget or direct selection).
   - Review submitted information and accept the consent checkbox.
   - Click submit to receive your `RANI-XXXXXXXX` reference ID.
3. **Admin Login:** Visit `/admin/login` and log in with your configured admin credentials.
4. **Admin Dashboard:** Visit `/admin` to view the newly submitted profile, filter by status, search by name/phone/ID, update status, and print bio-data.

### Build for Production
```bash
npm run build
```
The deployable static output will be generated in the `dist/` directory, ready to deploy to Firebase Hosting, Vercel, Netlify, or GitHub Pages.
