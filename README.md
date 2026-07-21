# Smart Farmer

Smart Farmer is a dual-platform agricultural information system designed to support smallholder farmers in Yei County, South Sudan. It combines an offline-capable web application with a USSD service prototype, so farmers can access crop information, educational content, and planting records on any device — from smartphones to basic feature phones.

This project was developed as part of the BSc Software Engineering program at African Leadership University.

**Developer:** Nyabon Deng Adut
**Program:** BSc Software Engineering
**Supervisor:** Tunde Isiaq Gbadamosi

## Live Deployment

| Component | Platform | URL |
|---|---|---|
| Frontend (PWA) | Netlify | https://smrtfarmer.netlify.app |
| Backend API | Render | https://smartfarmer-m7x3.onrender.com |
| USSD channel | Africa's Talking sandbox | `*384*12990#` |
| Database | PostgreSQL (Render) | — |

## Features

### Crop Information
Detailed guides for 30 crops grown in South Sudan (sorghum, maize, millet, groundnuts, cassava, and more): planting seasons, spacing, soil, pests, diseases, and market tips, with voice output.

### Education Modules
Ten learning modules covering planting techniques, pest management, post-harvest handling, soil, climate-smart farming, water, market access, disease, fertilizer, and tools — each with audio narration.

### Farmer Accounts & Cloud Crop Log
Farmers can register with a phone number and password (bcrypt-hashed, JWT sessions). The crop monitoring log works in two modes:
- **Logged in:** records sync to the cloud and follow the farmer across devices
- **Logged out / offline:** records stay in the browser's local storage, with a one-tap upload offer after logging in

### Cost Forecast & Fertilizer Guide
A planting cost/profit simulator and per-crop fertilizer recommendations.

### USSD
A working backend USSD endpoint (Africa's Talking sandbox) plus an interactive on-site simulator that talks to the live endpoint and falls back to a built-in simulation when offline.

### Two Languages, Fully Translated
English and Juba Arabic across every page — including right-to-left layout, translated voice output, dates, and dynamic content. The language choice persists across pages.

### Offline-First PWA
A service worker caches all pages and assets; the app keeps working without a connection and shows a dedicated offline page for uncached content.

## Technology Stack

**Frontend:** HTML5, CSS3, JavaScript (vanilla), Service Worker / PWA
**Backend:** Node.js, Express.js, PostgreSQL, JWT + bcrypt
**USSD:** Africa's Talking API (sandbox)
**Hosting:** Netlify (frontend), Render (backend + database)
**Design:** Figma

## Running Locally

The backend serves both the API and the frontend:

```bash
cd smartfarmer-backend
npm install
npm start
```

Then open **http://localhost:3000**.

You will need a `smartfarmer-backend/.env` file with:

```
PORT=3000
DATABASE_URL=<your PostgreSQL connection string>
JWT_SECRET=<a long random string>
```

Database tables are created automatically on first start.

Frontend-only alternative: open the project in VS Code and use the Live Server extension on `index.html` (API calls will go to the live Render backend).

## API Overview

| Endpoint | Auth | Purpose |
|---|---|---|
| `POST /api/auth/register` | — | Register farmer (name, phone, password, location) |
| `POST /api/auth/login` | — | Login, returns JWT |
| `GET /api/farmer/profile` | Bearer | Farmer profile |
| `GET/POST /api/logs`, `PUT/DELETE /api/logs/:id` | Bearer | Crop log CRUD (per-farmer) |
| `POST /ussd` | — | USSD callback (Africa's Talking) |
| `GET /api/crops` | — | Crop list |
| `GET /api/health` | — | Health check |

## Testing

- `node test-backend.js` — live API test suite (health, crops, register, login, auth protection, crop logs, USSD flows)
- Screenshots of manual testing are in the `Screenshots/` folder

## Design Resources

- Figma prototype: https://www.figma.com/design/mxazJuKrc45lla3wxTjcgf/Smart-Farmer-App?node-id=0-1
- Wireframes & documentation: https://docs.google.com/document/d/1csu_92AEcQ9iLpueJEOzYsfSYh4TSLN3nRx6udDLXoo/edit

## Known Limitations

- USSD runs in the Africa's Talking sandbox; live deployment requires a direct agreement with a South Sudan telecom operator (MTN/Zain), as no USSD aggregator currently covers South Sudan
- Voice output uses the device's speech synthesis; Arabic voice requires an Arabic TTS voice on the device (recorded audio files are a planned enhancement)
- Cost forecast uses estimated figures (no public market-price API for South Sudan exists yet)
- Bari language support was descoped to deliver two fully-supported languages

## Contact

Nyabon Deng Adut
📧 nyabondeng0@gmail.com
🔗 https://github.com/Nyabondeng
