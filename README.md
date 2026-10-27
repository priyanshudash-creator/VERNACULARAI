# VernacularAI — Teach in Hindi. Learn in Your Mother Tongue.

VernacularAI is an AI-powered vernacular education platform designed to empower government primary school teachers with real-time translation, NIPUN Bharat pedagogical assistance, and mother-tongue learning tools (supporting Odia, Santhali, Ho, Mundari, Hindi, and 20+ Indian languages).

---

## 🏛️ Full-Stack Architecture

```
VERNACULARAI/
├── server/                       # Express.js REST API Backend
│   ├── config/
│   │   └── db.js                 # MongoDB connection & resilient fallback
│   ├── controllers/
│   │   ├── authController.js     # Register, Login, Me, Profile, Password Reset
│   │   ├── copilotController.js  # AI Pedagogy Assistant
│   │   ├── lessonController.js   # FLN Lesson Generator & Management
│   │   ├── studentController.js  # Student Roster & Tracking
│   │   └── translationController.js # Real AI Translation & User History
│   ├── middleware/
│   │   ├── auth.js               # JWT Bearer Token validation
│   │   ├── errorHandler.js       # Centralized error & 404 handler
│   │   ├── rateLimiter.js        # IP rate limiting for Auth & AI APIs
│   │   └── validate.js           # Express-validator input schemas
│   ├── models/
│   │   ├── Lesson.js             # FLN Lesson Mongoose Schema
│   │   ├── Student.js            # Student Roster Schema
│   │   ├── Translation.js        # Translation History Schema (indexed)
│   │   └── User.js               # User & Teacher Profile Schema (bcrypt)
│   ├── routes/
│   │   ├── authRoutes.js         # /api/v1/auth
│   │   ├── copilotRoutes.js      # /api/v1/copilot
│   │   ├── healthRoutes.js       # /api/v1/health
│   │   ├── lessonRoutes.js       # /api/v1/lessons
│   │   ├── studentRoutes.js      # /api/v1/students
│   │   └── translationRoutes.js  # /api/v1/translate & /api/v1/translations
│   ├── services/
│   │   ├── copilotService.js     # AI Pedagogy Reasoning Engine
│   │   ├── lessonService.js      # Curriculum & FLN generator
│   │   └── translationService.js # Multi-tier Translation Gateway (Gemini + MyMemory API)
│   ├── tests/
│   │   └── api.test.js           # Automated End-to-End API Test Suite
│   ├── utils/
│   │   └── seed.js               # MongoDB Seeding Script
│   ├── app.js                    # Express Application setup & middleware
│   └── server.js                 # HTTP listener & process lifecycle
│
├── src/                          # React + Vite Frontend
│   ├── components/               # Common UI, Navigation, Modals
│   ├── context/
│   │   ├── AuthContext.jsx       # Real Backend Auth Context & Token Management
│   │   ├── OfflineContext.jsx    # Offline storage context
│   │   └── ThemeContext.jsx      # Dark / Light theme context
│   ├── data/
│   │   └── mockData.js           # Base catalog & language metadata
│   ├── layouts/
│   │   ├── AppLayout.jsx         # Teacher dashboard layout
│   │   └── PublicLayout.jsx      # Public pages layout
│   ├── pages/
│   │   ├── auth/                 # LoginPage, RegisterPage, ForgotPasswordPage
│   │   ├── AITranslatorPage.jsx  # Connected AI Translation & History Studio
│   │   ├── LessonGeneratorPage.jsx # Connected AI Lesson Generator
│   │   ├── LessonsPage.jsx       # Connected Lessons Library
│   │   ├── AICopilotPage.jsx     # Connected AI Pedagogy Copilot
│   │   └── SettingsPage.jsx      # Connected Profile & Preferences
│   └── services/
│       ├── api.js                # Unified HTTP Client with JWT interceptors
│       ├── authService.js        # Authentication API Client
│       ├── copilotService.js     # AI Copilot API Client
│       ├── lessonService.js      # Lessons API Client
│       ├── studentService.js     # Student Roster API Client
│       └── translationService.js # Translation API Client
│
├── .env.example                  # Environment template
├── vite.config.js                # Vite configuration with /api reverse proxy
└── package.json                  # Scripts & dependencies
```

---

## ⚡ Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **MongoDB**: Optional for initial evaluation (the server contains an in-memory resilient engine), recommended for production persistence.

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default configuration inside `.env`:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000
MONGODB_URI=mongodb://127.0.0.1:27017/vernacularai
JWT_SECRET=vernacularai-development-super-secret-jwt-key-2026-secure
VITE_API_BASE_URL=http://localhost:5000/api/v1
TRANSLATION_API_KEY=
GEMINI_API_KEY=
```

> **Note on Translation Provider**: If you have a Google Gemini API key or Google Translate key, paste it into `GEMINI_API_KEY`. If left blank, VernacularAI automatically uses its live external gateway (MyMemory API supporting 100+ languages including Odia and Hindi, plus indigenous Ol Chiki models) so real translation works out of the box!

### 4. Run Frontend and Backend Together
```bash
npm run dev:all
```
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000/api/v1](http://localhost:5000/api/v1)
- **Health Check**: [http://localhost:5000/api/v1/health](http://localhost:5000/api/v1/health)

Alternatively, run in separate terminals:
```bash
# Terminal 1: Backend Server
npm run server

# Terminal 2: Frontend Client
npm run dev
```

---

## 🧪 Testing and Verification

Run the automated end-to-end API test suite:
```bash
npm run test:api
```
This executes 18 automated tests covering:
- Health check endpoint
- Teacher registration, duplicate account prevention (409)
- Login validation & bad password rejection (401)
- Protected JWT routes (`GET /api/v1/auth/me`, `PUT /api/v1/auth/profile`)
- Unauthorized request rejection
- Live translation execution (Hindi to Odia) with real text verification
- Input validation (empty text rejection)
- User-scoped translation history retrieval & single record deletion
- AI Lesson generation & catalog retrieval
- AI Pedagogy Copilot chat assistance
- Classroom student roster retrieval

To verify the frontend production build:
```bash
npm run build
```

---

## 📚 REST API Reference (`/api/v1`)

### Health
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/v1/health` | Service status, uptime & DB status | No |

### Authentication (`/api/v1/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Register new primary teacher | No |
| `POST` | `/api/v1/auth/login` | Teacher sign in & JWT generation | No |
| `POST` | `/api/v1/auth/logout` | Clear session | No |
| `GET` | `/api/v1/auth/me` | Fetch authenticated profile | Yes (`Bearer <token>`) |
| `PUT` | `/api/v1/auth/profile` | Update profile fields | Yes (`Bearer <token>`) |
| `POST` | `/api/v1/auth/forgot-password`| Request password reset OTP | No |
| `POST` | `/api/v1/auth/reset-password` | Reset password using OTP | No |

### AI Translation (`/api/v1/translate` & `/api/v1/translations`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/v1/translate` | Translate text between 26+ languages | Optional (saves to user history if logged in) |
| `GET` | `/api/v1/translations` | Retrieve logged-in user's history | Yes |
| `DELETE`| `/api/v1/translations/:id` | Delete single translation record | Yes (owner only) |
| `DELETE`| `/api/v1/translations` | Clear all user translation history | Yes |

### Lessons & Copilot
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/v1/lessons` | List standard and custom lessons | No |
| `GET` | `/api/v1/lessons/:id` | Fetch lesson plan by ID | No |
| `POST` | `/api/v1/lessons/generate` | Generate FLN-aligned bilingual lesson | No |
| `POST` | `/api/v1/lessons` | Save generated lesson to library | Optional |
| `POST` | `/api/v1/copilot/chat` | AI pedagogy guidance & local analogies | No |
| `GET` | `/api/v1/students` | Get classroom student roster | No |

---

## 🔒 Security Features
- **Password Security**: Passwords hashed using `bcryptjs` with salt rounds. Plaintext passwords never stored or returned.
- **JWT Authentication**: Signed tokens with expiration (`7d`).
- **Rate Limiting**: `express-rate-limit` prevents brute-force on authentication (30 attempts/15 min) and API abuse (60 AI requests/min).
- **HTTP Security Headers**: `helmet` enabled to prevent clickjacking, MIME-sniffing, and cross-site scripting.
- **Cross-Origin Resource Sharing (CORS)**: Restricted to configured frontend origins with credentials support.
- **Resource Isolation**: Translation history queries strictly filter by `userId: req.user._id` preventing users from viewing or modifying other users' records.
- **Secret Protection**: Provider API keys (`GEMINI_API_KEY`, `TRANSLATION_API_KEY`) stay strictly on the server and are excluded from Git via `.gitignore`.

---

## 🚀 Deployment Guide

### Deploying the Backend
1. **Choose a platform**: Render, Railway, Fly.io, or AWS EC2.
2. **Environment Variables**:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `CLIENT_URL=https://your-frontend-domain.com`
   - `MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/vernacularai`
   - `JWT_SECRET=<strong-random-secret>`
   - `GEMINI_API_KEY=<your-key>`
3. **Start Command**:
   ```bash
   node server/server.js
   ```

### Deploying the Frontend (Vercel / Netlify / Cloudflare Pages)
1. **Build Command**: `npm run build`
2. **Output Directory**: `dist`
3. **Environment Variables**:
   - `VITE_API_BASE_URL=https://your-backend-api-domain.com/api/v1`