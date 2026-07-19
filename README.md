# 🧾 AI Resume Builder

A full-stack, AI-powered resume builder built with **Next.js 16**, **MongoDB**, and **Google Gemini AI**. Create professional, ATS-friendly resumes in minutes with AI-generated content for summaries, skills, project descriptions, and work experience.

---

## ✨ Features

- **🔐 Authentication** — Secure JWT-based auth with HTTP-only cookies (Register, Login, Logout)
- **🛡️ Route Protection** — Edge middleware protects both frontend pages and API routes
- **📝 6-Step Resume Builder** — Guided wizard: Personal Info → Education → Skills → Projects → Experience → Summary
- **🤖 AI-Powered Content Generation** — Powered by Google Gemini AI:
  - Auto-generate professional summaries
  - Generate relevant skills based on job title
  - Generate project descriptions from tech stack
  - Generate work experience descriptions
  - Improve existing content with AI suggestions
- **📊 ATS Score Analysis** — Get an AI-powered ATS compatibility score with strengths, weaknesses, and recommendations
- **📄 Resume Preview & PDF Export** — Clean, printable resume preview with browser-native PDF download (`window.print()`)
- **🗂️ Multi-Resume Dashboard** — Create, view, edit, and delete multiple resumes per user
- **🎨 Modern UI** — Built with Tailwind CSS v4, Lucide icons, and smooth transitions

---

## 🛠️ Tech Stack

| Layer        | Technology                                                      |
| ------------ | --------------------------------------------------------------- |
| **Framework**    | [Next.js 16](https://nextjs.org/) (App Router, Turbopack)       |
| **Frontend**     | React 19, TypeScript, Tailwind CSS v4                           |
| **Forms**        | [React Hook Form](https://react-hook-form.com/)                |
| **Icons**        | [Lucide React](https://lucide.dev/)                             |
| **Notifications**| [React Hot Toast](https://react-hot-toast.com/)                 |
| **Database**     | [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) |
| **Auth**         | JWT ([jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)) + [bcrypt](https://github.com/kelektiv/node.bcrypt.js) |
| **AI**           | [Google Gemini AI](https://ai.google.dev/) (`@google/genai`)    |
| **HTTP Client**  | [Axios](https://axios-http.com/)                                |

---

## 📁 Project Structure

```
resume-builder/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Landing page
│   │   ├── layout.tsx                # Root layout (fonts, toast provider)
│   │   ├── globals.css               # Global styles (Tailwind)
│   │   │
│   │   ├── auth/                     # Auth pages
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   │
│   │   ├── resume/                   # Resume pages
│   │   │   ├── page.tsx              # Dashboard (list all resumes)
│   │   │   ├── layout.tsx            # App shell with Navbar
│   │   │   └── [resumeId]/
│   │   │       ├── page.tsx          # 6-step resume builder
│   │   │       ├── layout.tsx        # Resume editor layout
│   │   │       └── preview/
│   │   │           └── page.tsx      # Resume preview & ATS score
│   │   │
│   │   └── api/                      # API Routes
│   │       ├── auth/
│   │       │   ├── register/route.ts
│   │       │   ├── login/route.ts
│   │       │   ├── me/route.ts
│   │       │   └── logout/route.ts
│   │       ├── resume/
│   │       │   ├── route.ts          # GET all resumes
│   │       │   ├── create/route.ts   # POST create resume
│   │       │   └── [resumeId]/
│   │       │       └── route.ts      # GET / PATCH / DELETE single resume
│   │       └── ai/
│   │           ├── generate-summary/route.ts
│   │           ├── generate-skills/route.ts
│   │           ├── generate-project-description/route.ts
│   │           ├── generate-experience/route.ts
│   │           ├── improve-content/route.ts
│   │           └── ats-score/route.ts
│   │
│   ├── components/                   # React components
│   │   ├── Navbar.tsx                # Top navigation bar
│   │   ├── StepHeader.tsx            # Reusable step header
│   │   ├── PersonalInfoStep.tsx      # Step 1: Personal info form
│   │   ├── EducationStep.tsx         # Step 2: Education form
│   │   ├── SkillStep.tsx             # Step 3: Skills + AI generation
│   │   ├── ProjectSetup.tsx          # Step 4: Projects + AI descriptions
│   │   ├── ExperienceStep.tsx        # Step 5: Work experience + AI
│   │   └── SummaryStep.tsx           # Step 6: Professional summary + AI
│   │
│   ├── apis/                         # Frontend API client functions
│   │   └── resume.api.ts             # getAllResumes, createResume, deleteResume
│   │
│   ├── lib/                          # Utility libraries
│   │   ├── mongodb.ts                # MongoDB connection (cached)
│   │   ├── jwt.ts                    # JWT generate & verify helpers
│   │   └── getCurrentUser.ts         # Extract userId from JWT cookie
│   │
│   ├── models/                       # Mongoose schemas
│   │   ├── User.model.ts             # User schema (name, email, password)
│   │   └── Resume.model.ts           # Resume schema (all resume fields)
│   │
│   ├── types/                        # TypeScript types
│   │   ├── api.types.ts              # ApiResponse interface
│   │   ├── user.types.ts             # User & JWT types
│   │   └── resume.types.ts           # iResume interface
│   │
│   ├── middleware.ts                  # Edge middleware (route protection)
│   └── middlewares/                   # Server-side middleware helpers
│
├── .env.example                      # Environment variable template
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **MongoDB** — Atlas cluster or local instance
- **Google Gemini API Key** — Get one from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the repository

```bash
git clone https://github.com/nikhil12458/resume-builder.git
cd resume-builder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```env
# MongoDB connection string
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/resume-builder?retryWrites=true&w=majority

# JWT Secret for authentication
JWT_SECRET=your_jwt_secret_here

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
```

---

## 🔌 API Reference

### Auth

| Method | Endpoint              | Description              | Auth |
| ------ | --------------------- | ------------------------ | ---- |
| POST   | `/api/auth/register`  | Register a new user      | ❌   |
| POST   | `/api/auth/login`     | Login & receive JWT      | ❌   |
| GET    | `/api/auth/me`        | Get current user info    | ✅   |
| POST   | `/api/auth/logout`    | Clear auth cookie        | ✅   |

### Resume

| Method | Endpoint                    | Description              | Auth |
| ------ | --------------------------- | ------------------------ | ---- |
| GET    | `/api/resume`               | Get all user's resumes   | ✅   |
| POST   | `/api/resume/create`        | Create a new resume      | ✅   |
| GET    | `/api/resume/[resumeId]`    | Get a single resume      | ✅   |
| PATCH  | `/api/resume/[resumeId]`    | Update resume fields     | ✅   |
| DELETE | `/api/resume/[resumeId]`    | Delete a resume          | ✅   |

### AI

| Method | Endpoint                              | Description                           | Auth |
| ------ | ------------------------------------- | ------------------------------------- | ---- |
| POST   | `/api/ai/generate-summary`            | Generate professional summary         | ✅   |
| POST   | `/api/ai/generate-skills`             | Generate skills for a job title       | ✅   |
| POST   | `/api/ai/generate-project-description`| Generate project description          | ✅   |
| POST   | `/api/ai/generate-experience`         | Generate work experience description  | ✅   |
| POST   | `/api/ai/improve-content`             | Improve existing content with AI      | ✅   |
| POST   | `/api/ai/ats-score`                   | Analyze resume for ATS compatibility  | ✅   |

---

## 🗄️ Database Schema

### User

| Field      | Type   | Required |
| ---------- | ------ | -------- |
| name       | String | ✅       |
| email      | String | ✅ (unique) |
| password   | String | ✅ (hashed) |

### Resume

| Field           | Type                | Default   |
| --------------- | ------------------- | --------- |
| user_id         | ObjectId (ref: User)| required  |
| title           | String              | `""`      |
| jobTitle        | String              | `""`      |
| experienceLevel | String              | `"Fresher"` |
| summary         | String              | `""`      |
| personalInfo    | Object              | `{}`      |
| education       | Array of Objects    | `[]`      |
| workExperience  | Array of Objects    | `[]`      |
| projects        | Array of Objects    | `[]`      |
| skills          | Array of Strings    | `[]`      |
| certifications  | Array of Strings    | `[]`      |

---

## 🔒 Security

- **JWT Authentication** — Tokens stored in HTTP-only cookies (not accessible via JavaScript)
- **Password Hashing** — All passwords hashed with bcrypt before storage
- **Route Protection** — Edge middleware blocks unauthenticated access to `/resume/*` pages and all protected API routes
- **Ownership Checks** — Every resume API query filters by `user_id` to prevent cross-user data access
- **API Protection** — Protected API routes return `401 Unauthorized` JSON for unauthenticated requests

---

## 🌐 Deployment

The app is optimized for deployment on **Vercel**:

1. Push your code to GitHub
2. Connect the repository to [Vercel](https://vercel.com)
3. Add the environment variables (`MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`) in the Vercel dashboard under **Settings → Environment Variables**
4. Deploy!

---

## 📜 License

This project is private and not licensed for redistribution.

---

## 👤 Author

**Nikhil** — [GitHub](https://github.com/nikhil12458)
