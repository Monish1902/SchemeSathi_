# SchemeSathi (స్కీమ్‌సాథి / स्कीमसाथी)

> **Your Trusted Companion for Navigating & Accessing Government Schemes in India**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.9-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-11.9-ffca28?style=flat&logo=firebase)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## 📌 Problem Statement

Every year, state and central governments allocate trillions of rupees across hundreds of welfare programs designed to uplift farmers, women, students, senior citizens, and marginalized communities. Yet, **over 60% of eligible citizens fail to claim their rightful benefits**. 

The core challenges are:
1. **Information Asymmetry & Fragmentation**: Information is scattered across dozens of disjointed departmental websites, gazette notifications, and complex PDF circulars filled with bureaucratic jargon.
2. **Eligibility Ambiguity**: Strict multi-variable conditions (such as age limits, annual income ceilings, landholding acreage, caste categories, and housing status) make it difficult for ordinary citizens to know whether they qualify.
3. **Application Friction & Intermediary Exploitation**: Citizens frequently fall victim to predatory third-party agents or spend excessive time visiting offices due to lack of clarity regarding required documents, application procedures, and direct portal links.
4. **Lack of Unified Tracking**: Once an application is submitted, there is no centralized, single-pane dashboard to track the status across diverse welfare programs.

---

## 💡 Our Solution: SchemeSathi

**SchemeSathi** acts as a smart, citizen-first bridge between individuals and rightful welfare opportunities. 

By analyzing user demographic, financial, and occupational profiles, SchemeSathi **instantly identifies, filters, and recommends eligible schemes** in plain, accessible language with direct official application pathways.

### Key Pillars:
- 🎯 **Personalized Eligibility Engine**: Automatically cross-references 8+ demographic criteria (age, gender, caste, annual income, occupation, land ownership, housing status, and disability) against government schemes in real-time.
- 📋 **Curated Comprehensive Schemes Catalog**: Over 30 central and state welfare initiatives with transparent details regarding key financial payouts, non-financial benefits, required documentation checklists, and citizen helpline numbers.
- 🌐 **Zero Middlemen Application Routing**: Connects citizens directly to verified government portals (GSWS, NBM, Jnanabhumi, PM-KISAN, PMFBY, PMAY) for hassle-free direct-benefit enrollment.
- 📊 **Centralized Application Tracker**: Allows users to record, monitor, and manage the progress of submitted applications in one organized dashboard.
- ⚡ **Resilient High-Availability Architecture**: Built on Next.js 15 and Cloud Firestore with seamless local offline fallbacks, guaranteeing zero service disruption.

---

## 🏆 Why SchemeSathi is the Best in the Market

| Feature / Dimension | Traditional Government Portals | Generic Information Blogs | **SchemeSathi** |
| :--- | :--- | :--- | :--- |
| **Personalized Matching** | ❌ None (Manual keyword search only) | ❌ Static generic articles | ✅ **Automated multi-attribute matching engine** |
| **Eligibility Accuracy** | ⚠️ Complex rule PDFs with no calculator | ⚠️ Frequently outdated or misleading | ✅ **Real-time profile-based validation** |
| **User Experience (UX)** | 🛑 Cluttered, non-responsive, slow | 🛑 Filled with spam ads & clickbait | ✅ **Clean, modern, mobile-optimized UI** |
| **Middlemen Risk** | ⚠️ Prone to local agent dependency | ⚠️ Promotes unofficial commercial services | ✅ **100% Direct official government portal routing** |
| **Application Tracking** | ❌ Fragmented across separate portals | ❌ Not available | ✅ **Unified personal application tracker** |
| **Resilience & Speed** | ⚠️ Frequent server timeouts | ⚠️ Heavy ad scripts | ✅ **Sub-second Next.js 15 App Router performance** |

---

## ✨ Core Features

### 1. 🔍 My Eligible Schemes
- Instant evaluation of eligible welfare schemes customized to the logged-in user's profile.
- Real-time indicator displaying total matching programs and aggregate financial aid entitlements.

### 2. 📚 Comprehensive Schemes Directory
- Complete database of state and central schemes spanning **Agriculture, Women Empowerment, Education, Healthcare, Social Security, Housing, Skill Development, and Transportation**.
- Interactive category filter pills and live search for rapid exploration.

### 3. 📄 Detailed Scheme Dossier
- Highlights key financial benefits (e.g., *₹25 Lakh cashless treatment under Dr. NTR Vaidya Seva*, *₹20,000/yr Annadata Sukhibhava*, *₹18,000/yr Aadabidda Nidhi*).
- Clear breakdown of eligibility rules, required documentation checklists, application steps, and toll-free helpline numbers (e.g., GSWS 1902).

### 4. 📝 Application Tracker
- Record submissions and track application lifecycle statuses (**Draft**, **Submitted**, **Under-Review**, **Approved**, **Rejected**).

### 5. 👤 Profile & Eligibility Assessment
- Securely captures demographic indicators (district, mandal, occupation, category, income bracket, housing ownership, disability status) to power the matching engine.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework**: Next.js 15.5 (App Router, Standalone build)
- **Library**: React 19.2
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS, Shadcn UI primitives, Radix UI headless components
- **Icons**: Lucide React
- **Authentication & Database**: Firebase Auth (Email/Password & Google) + Cloud Firestore
- **State & Data Reliability**: Resilient local-cache fallback layer for uninterrupted citizen access
- **Form Handling**: React Hook Form + Zod validation

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v20 or v22
- **npm**: v10+

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Monish1902/SchemeSathi_.git
   cd SchemeSathi_
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   *(Firebase credentials are fully configured in `src/firebase/config.ts`)*.

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🔒 Security Rules (Cloud Firestore)

To ensure secure role-based and owner-isolated data access, deploy the hardened security rules from `firestore.rules` to your Firebase project:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSignedIn() { return request.auth != null; }
    function isOwner(userId) { return isSignedIn() && request.auth.uid == userId; }

    match /users/{userId} {
      allow read, write: if isOwner(userId);
    }
    match /schemes/{schemeId} {
      allow read: if true;
      allow write: if false;
    }
    match /eligibilityAssessments/{assessmentId} {
      allow read, write: if isSignedIn() && (resource == null || resource.data.userId == request.auth.uid);
      allow create: if isSignedIn() && request.resource.data.userId == request.auth.uid;
    }
    match /userApplications/{applicationId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn() && request.resource.data.userId == request.auth.uid;
      allow update, delete: if isSignedIn() && (resource == null || resource.data.userId == request.auth.uid);
    }
    match /schemeUpdates/{updateId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

---

## 🤝 Contributing

Contributions are welcome! If you'd like to add more state schemes, improve matching accuracy, or enhance UI accessibility:
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/NewSchemeSupport`).
3. Commit your changes (`git commit -m 'Add new welfare scheme support'`).
4. Push to the branch (`git push origin feature/NewSchemeSupport`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
