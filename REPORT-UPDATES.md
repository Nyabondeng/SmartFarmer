# Report Update Guide

Concrete edits to bring the research report in line with the current system
(as of 22 July 2026). Work through these chapter by chapter before submission,
then delete this file.

## Suggested framing for the Bari descoping (use in scope + limitations)

> Bari was descoped not due to application constraints — the platform's
> translation architecture supports any Unicode language — but due to
> resource constraints unique to low-resource languages: no machine
> translation or text-to-speech technology for Bari exists, so complete
> support requires a human Bari translator and recorded audio by a native
> speaker. Within the project timeline, delivering two complete languages
> was prioritised over three partial ones. Adding Bari later requires no
> architectural changes: the translation dictionary accepts additional
> languages, and the audio system automatically plays recorded clips
> when present.

## NEW since the first version of this guide (22 July): USSD upgrades

a. **USSD menu pagination.** USSD screens display only ~160-182 characters,
   so the 30-crop menu is now paginated 8 crops per page with 99 = More and
   98 = Back — the pattern farmers know from mobile-money menus. Describe
   this in Chapter 4 (it shows understanding of a real USSD protocol
   constraint) and update the navigation-steps table in Chapter 5 (reaching
   a guide is now: language → [page] → crop → topic).
b. **Bilingual USSD.** The first USSD screen asks the farmer to choose
   1 = English or 2 = Juba Arabic; the entire flow (menus and all 90 crop
   guides) then runs in that language. This directly serves the low-literacy
   Arabic-speaking target population — worth highlighting in the results and
   conclusions (it strengthens RQ2 and conclusion 6.2.2/6.2.3).
c. **New limitation to add:** on live networks, Arabic USSD uses UCS-2
   encoding, which halves the per-screen budget to ~90 characters; some
   longer Arabic guides may need shortening for a real carrier deployment
   (not an issue in the Africa's Talking sandbox).
d. **New screenshots:** the language-choice USSD screen, an Arabic crop
   menu page, and an Arabic crop guide in the Africa's Talking simulator.

## Everywhere (global find-and-replace)

1. **Languages: 3 → 2.** Bari was descoped; the app now fully supports English
   and Juba Arabic (complete translations on every page, right-to-left layout,
   Arabic voice output). Update: the abstract, technical scope (1.5), the
   comparison table (Table 4 "Local languages" row), and any "3 languages"
   claims. Frame it positively: *"Bari was descoped in favour of delivering two
   fully-supported languages; Bari remains future work."*
2. **Database host.** The report says "PostgreSQL hosted on Supabase" in
   Chapter 4 (Feature 8) and Chapter 6 (recommendation 4). The actual database
   is **PostgreSQL on Render**. Make it consistent.
3. **Registration fields.** Chapter 4 Feature 8 says the form collects
   "name, email, phone number, location, and password" and login uses
   "email and password". Reality: **no email — registration uses name, phone,
   optional location, and password; login uses phone + password.**

## Chapter 4 (Implementation & Testing)

4. **Feature 8 (Account page):** update to reflect completed state — JWT
   issued on both register and login, bcrypt password hashing, and a
   "My Account" profile page backed by `GET /api/farmer/profile`.
5. **Add to the features list:** cloud-synced crop log. When logged in,
   records save to the backend (`/api/logs`, JWT-protected, per-farmer) and are
   accessible from any device; offline/guest records stay in localStorage with
   a one-tap upload offer after login.
6. **Testing section:** you can now cite the automated live-API suite
   (`test-backend.js`): 10/10 passing — health, crops, registration, login,
   **auth protection (401 without token)**, authenticated crop-log read/write,
   and three USSD flows. A test proving protected routes reject
   unauthenticated requests is strong evidence for the security section.
7. **USSD simulator:** now calls the live `/ussd` backend endpoint and falls
   back to a built-in simulation when offline — a true end-to-end demo.

## Chapter 6 (Conclusions & Recommendations)

8. **Limitation 4 ("Backend authentication incomplete") — REMOVE.** It is
   complete and verified in production.
9. **Recommendation 4 ("Complete backend authentication") — mark done** or
   reword to future enhancements (e.g. password reset).
10. **Feature implementation rate:** the 73% (8 of 11) figure and Figure 5.4
    should be recalculated — register/login and cloud sync are now complete;
    only Bari voice moved out of scope. If Bari is treated as descoped rather
    than pending, the delivered-scope completion is effectively 100%.
11. **New content for the security/ethics discussion:** unauthenticated
    endpoints that exposed farmer data (including password hashes and phone
    numbers) were identified and removed; all personal-data routes now require
    a JWT. This directly supports the Chapter 3 confidentiality commitments.

## Chapter 5 (Results)

12. **Figure 5.2 (feature comparison USSD vs web):** unchanged conceptually,
    but re-check the languages row (2, not 3).
13. **Deployment table (5.5):** URLs unchanged; you may add the database row
    (PostgreSQL on Render) for completeness.

## Honest remaining limitations (keep/add these)

- USSD is sandbox-only (unchanged — the Africa's Talking email evidence still
  stands).
- Field usability testing with farmers in Yei County still pending.
- Voice output relies on the device's text-to-speech; Arabic playback needs an
  Arabic TTS voice installed. **Recorded Juba Arabic audio clips require a
  human speaker and remain future work** (the `audio/juba/` folder is wired up
  and ready — any MP3s named `<topic>.mp3` placed there play automatically).
- Cost forecast uses estimates (no public market-price API for South Sudan).

## Screenshots to retake (UI changed)

- Home page (duplicate "Account" nav entry is fixed; stats row now shows
  2 languages)
- Account/register page (benefits list now says 2 languages)
- Crop log (new cloud-sync status banner; Arabic mode)
- Any screenshot showing the old navbar or Bari in the language dropdown
- New screenshots worth adding: Arabic mode with RTL layout, the My Account
  page, the USSD simulator talking to the live backend
