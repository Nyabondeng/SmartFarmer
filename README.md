# Smart Farmer

**A USSD and Offline Web-Based Agricultural Information System for Smallholder Farmers in South Sudan.**

Smart Farmer is a dual-platform system that delivers crop information, educational content, and a personal planting log to farmers in Yei County, South Sudan. It is built so it reaches farmers **on the phones they actually own**: a USSD service that works on any basic phone with no internet, and an offline-capable Progressive Web App for anyone with a browser. Everything is available in **English and Juba Arabic**.

Developed as the capstone project for the BSc in Software Engineering, African Leadership University.

- **Developer:** Nyabon Deng Adut
- **Supervisor:** Tunde Isiaq Gbadamosi

---

## 1. Live Deployment

| Component | Platform | Address |
|---|---|---|
| Frontend (PWA) | Netlify | https://smrtfarmer.netlify.app |
| Backend API + USSD | Render | https://smartfarmer-m7x3.onrender.com |
| USSD channel | Africa's Talking sandbox | `*384*12990#` |
| Database | PostgreSQL (Render) | (private) |

> **Note for reviewers:** the backend runs on Render's free tier, which sleeps after inactivity. The first request after a pause can take **30–50 seconds** to wake the server. Load the site or call `/api/health` once and wait, then use normally.

---

## 2. Features

| Feature | Description | Works offline? |
|---|---|---|
| **Crop information** | 30 staple crops (sorghum, maize, millet, groundnuts, cassava, …): planting season, spacing, soil, pests, diseases, market tips | Yes (after first visit) |
| **Voice output** | Reads crop and module content aloud for low-literacy users, in the selected language | Yes |
| **Education modules** | 10 illustrated modules (planting, pest, post-harvest, soil, climate, water, market, disease, fertilizer, tools) | Yes |
| **Crop log** | Personal planting records; cloud-synced when logged in, on-device when offline | Yes |
| **Cost forecast** | Estimates planting cost and expected profit per crop and land size | Yes |
| **Fertilizer guide** | Per-crop fertilizer type, amount, and timing | Yes |
| **USSD service** | Full bilingual menu on any basic phone, paginated, no internet | N/A (USSD) |
| **Accounts** | Register / login with phone + password (bcrypt + JWT) | Login needs the server |
| **Two languages** | English and Juba Arabic on every page, with right-to-left layout in Arabic | Yes |

---

## 3. Technology Stack (and why)

| Layer | Technology | Why it was chosen |
|---|---|---|
| Frontend | HTML5, CSS3, **vanilla JavaScript** | No build step or framework runtime, so the app is tiny and loads on low-end phones over weak networks. |
| Offline | **Service Worker (PWA)** + **IndexedDB** | The service worker caches the whole app for offline use; IndexedDB is a real on-device database for the crop log (see §7). |
| Backend | **Node.js + Express** | Lightweight, well-documented, and the same language as the frontend, reducing context-switching. |
| Auth | **bcrypt** (password hashing) + **JWT** (stateless sessions) | Passwords are never stored in readable form; JWT avoids server-side session storage. |
| Database | **PostgreSQL** | Reliable relational store for farmers and their planting logs. |
| USSD | **Africa's Talking API** | The most widely used USSD gateway in Africa; farmers already know USSD from mobile money. |
| Hosting | **Netlify** (frontend) + **Render** (backend + DB) | Free tiers with automatic deployment from GitHub. |

---

## 4. Running the Project Locally

### 4.1 Prerequisites

- **Node.js** v18 or newer (`node -v` to check) and npm
- **A PostgreSQL database.** Any of these works:
  - a local PostgreSQL install, or
  - a free hosted database from Render, Neon, or Supabase (copy its connection string)
- **Git**

### 4.2 Clone and install

```bash
git clone https://github.com/Nyabondeng/SmartFarmer.git
cd SmartFarmer/smartfarmer-backend
npm install
```

### 4.3 Create the environment file

Create `smartfarmer-backend/.env` with:

```
PORT=3000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DBNAME
JWT_SECRET=paste-a-long-random-string-here
```

Generate a strong `JWT_SECRET` with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

(Optional USSD live testing also needs `AFRICASTALKING_USERNAME` and `AFRICASTALKING_API_KEY`, but the app and its own USSD endpoint run without them.)

### 4.4 Start the server

```bash
npm start
```

The database tables are created automatically on first start. You should see `Smart Farmer server is running!`. Then open:

**http://localhost:3000**

The Express server serves **both** the API and the website, so this single command runs the whole application.

> Frontend-only alternative: open the project in VS Code and use the **Live Server** extension on `index.html`. The pages will call the live Render backend for login and crop-log sync.

---

## 5. How to Test Each Part

### 5.1 The web app
Open `http://localhost:3000`, then:
- Switch the language selector to **Juba Arabic** — the whole site, including layout direction, changes.
- Open **Crop Info**, expand a crop, press **🔊 Listen**.
- **Register**, add a crop-log record, and log in on a second browser to see it sync.

### 5.2 The USSD service
The backend exposes `POST /ussd`. Test it without a phone using `curl` (the `text` field is the accumulated key path, joined by `*`):

```bash
# Language menu
curl -X POST http://localhost:3000/ussd -d "sessionId=1&phoneNumber=+211000&text="
# Choose Arabic, page to crops 9-16, pick crop 12, planting guide
curl -X POST http://localhost:3000/ussd -d "sessionId=1&phoneNumber=+211000&text=2*99*12*1"
# Invalid input is handled gracefully (re-shows the menu with a notice)
curl -X POST http://localhost:3000/ussd -d "sessionId=1&phoneNumber=+211000&text=1*77"
```

Or run it interactively in the **Africa's Talking simulator** (`developers.africastalking.com/simulator`) by dialing `*384*12990#` against the deployed callback URL.

### 5.3 Offline mode
1. Open the site **online once** and click through the pages you want (so the service worker caches them).
2. Open Chrome **DevTools → Network → set to Offline** (this cuts only the tab, not your whole machine).
3. Reload and navigate — cached pages still work, and the crop log still reads and writes to the on-device IndexedDB database.

### 5.4 Automated backend tests
```bash
node test-backend.js
```
Runs a live suite against the deployed API: health, crops, registration, login, **authentication protection (401 without a token)**, authenticated crop-log CRUD, and USSD navigation flows.

---

## 6. System Architecture

```mermaid
flowchart TD
    subgraph Basic["Basic phone (no internet)"]
      P1["Farmer dials *384*12990#"]
    end
    subgraph Smart["Smartphone / browser"]
      P2["Offline web app (PWA)"]
    end

    P1 --> AT["Africa's Talking USSD gateway"]
    AT --> BE["Node.js + Express backend"]
    P2 -->|"REST / JSON"| BE
    P2 <-->|"reads/writes offline"| IDB[("IndexedDB on device")]
    P2 <-->|"cached shell"| SW["Service Worker cache"]
    BE --> DB[("PostgreSQL: farmers, crop_logs, ussd_logs")]

    classDef store fill:#e7f2e8,stroke:#2E7D32,color:#173b1e;
    class DB,IDB store;
```

The two channels share one backend and database. A basic phone reaches the system through the USSD gateway; a browser reaches it through REST, but also keeps a cached copy of the app (service worker) and an on-device database (IndexedDB) so it keeps working with no connection.

Full diagrams — **use case**, **class**, **entity-relationship**, and the **offline data-flow** — are in [`docs/DIAGRAMS.md`](docs/DIAGRAMS.md).

---

## 7. Offline Data Strategy

Offline storage uses **two layers**, not localStorage alone:

1. **Application shell** — a **service worker** (`sw.js`) caches every page, script, and style on first visit, so the interface loads with no network.
2. **Farmer data** — the crop log is stored in **IndexedDB** (`js/offline-store.js`), a transactional on-device database with a far larger quota than localStorage. It falls back to localStorage only on very old browsers, and migrates any records left by earlier versions.

When the farmer is **logged in and online**, records are written to the **PostgreSQL** cloud database via `/api/logs`, so they follow the farmer across devices. When **offline or not registered**, records live in IndexedDB on the device, and a one-tap upload syncs them to the cloud after login. This layered design (cloud of record + on-device database + cached shell) is what makes the app reliable on intermittent connections, rather than relying on a single browser key.

---

## 8. USSD Input Handling

USSD sessions send the full accumulated key path on each step. The `/ussd` handler (`smartfarmer-backend/server.js`) replays that path through a small state machine (language → crop list → crop → topic) and **validates every step**. Any input that is not a valid option — an unknown crop number, an out-of-range topic, a non-numeric entry, or stray spaces — sets an `invalid` flag and **re-displays the same menu with an "Invalid choice / اختيار غير صحيح" notice**, so a wrong keypress never crashes or ends the session. The long crop list is **paginated** (8 per page; `99` = more, `98` = back), the standard mobile-money pattern.

---

## 9. Project Structure

```
SmartFarmer/
├── index.html, about.html, crops.html, education.html …   # web pages
├── crop-log.html, cost-forecast.html, fertilizer.html
├── ussd.html, farmer-login.html, farmer-register.html
├── my-account.html, privacy-policy.html, offline.html
├── modules/                     # 10 education module pages
├── js/
│   ├── translations.js          # full EN + Juba Arabic dictionary
│   ├── script.js                # shared: nav, translation, RTL, voice, SW register
│   ├── crops.js, education.js, cost-forecast.js, fertilizer.js
│   ├── crop-log.js              # crop log (cloud + offline)
│   ├── offline-store.js         # IndexedDB on-device database
│   ├── module-detail.js, ussd.js, farmer-auth.js
│   └── translations.js
├── styles/                      # page stylesheets
├── sw.js                        # service worker (offline cache)
├── manifest.json                # PWA manifest
├── docs/DIAGRAMS.md             # UML + ER + architecture diagrams
├── test-backend.js              # live API test suite
└── smartfarmer-backend/
    ├── server.js                # Express app, USSD handler, table setup
    ├── ussd-arabic.js           # Arabic USSD crop content
    ├── config/db.js             # PostgreSQL pool
    ├── controllers/             # auth, farmer, crop log
    ├── routes/                  # auth, farmer, crop log routes
    ├── models/CropLogModel.js
    └── middleware/authMiddleware.js   # JWT verification
```

---

## 10. API Reference

| Method & path | Auth | Purpose |
|---|---|---|
| `POST /api/auth/register` | — | Register a farmer (name, phone, password, location); returns a JWT |
| `POST /api/auth/login` | — | Log in with phone + password; returns a JWT |
| `GET /api/farmer/profile` | Bearer | Current farmer's profile |
| `GET /api/logs` | Bearer | List the farmer's crop logs |
| `POST /api/logs` | Bearer | Create a crop log |
| `PUT /api/logs/:id` | Bearer | Update a crop log |
| `DELETE /api/logs/:id` | Bearer | Delete a crop log |
| `POST /ussd` | — | USSD callback (Africa's Talking) |
| `GET /api/crops` | — | List of crops |
| `GET /api/health` | — | Server health check |

Protected routes require an `Authorization: Bearer <token>` header and return **401** without a valid token.

---

## 11. Known Limitations

- **USSD is on the Africa's Talking sandbox.** No USSD aggregator currently covers South Sudan; a live short code requires a direct agreement with a local operator (MTN / Zain), which is beyond this project's scope.
- **Voice** uses the device's built-in speech synthesis; Arabic playback needs an Arabic voice installed on the device. Recorded audio clips are a planned enhancement.
- **Cost forecast** uses estimated figures — no public market-price API for South Sudan exists yet.
- **Field usability testing** with farmers in Yei County is planned as the next phase.

---

## 12. Contact

**Nyabon Deng Adut**
📧 nyabondeng0@gmail.com
🔗 https://github.com/Nyabondeng
