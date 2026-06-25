# Voice Audio Files for SmartFarmer

This directory contains pre-recorded audio files for **Juba Arabic** and **Bari** languages. The Web Speech API does not natively support these languages on most systems, so pre-recorded audio provides the best voice output experience.

## Directory Structure

```
audio/
├── juba/       # Juba Arabic voice files
├── bari/       # Bari language voice files
└── README.md   # This file
```

## Audio File Naming Convention

Files must be named to match the **topic keys** used in `js/script.js` in the `playAudio(topic)` function. Topic names are:

- `sorghum.mp3` — Sorghum crop information
- `maize.mp3` — Maize crop information
- `millet.mp3` — Millet crop information
- `groundnuts.mp3` — Groundnuts crop information
- `cassava.mp3` — Cassava crop information
- `planting.mp3` — Planting tips
- `pest.mp3` — Pest control information
- `postharvest.mp3` — Post-harvest handling
- `soil.mp3` — Soil management
- `climate.mp3` — Climate-smart farming

## Audio Format Requirements

- **Format**: MP3 (recommended for broad browser compatibility)
  - Alternative: OGG Vorbis (better compression, but less universal browser support)
- **Sample Rate**: 44.1 kHz or 48 kHz
- **Bitrate**: 128–192 kbps (good balance of quality and file size)
- **Duration**: Typically 20–45 seconds per clip

## Recording Instructions

1. **Record in a quiet environment** to minimize background noise.
2. **Speak clearly at a moderate pace** (the English messages in `js/script.js` are approximately 20–45 seconds when read aloud).
3. **Use a native speaker** of Juba Arabic or Bari for authentic pronunciation and intonation.
4. **Translate from English** or use the text from `js/translations.js` if Juba/Bari translations are available.
5. **Save as MP3** and place in the corresponding language folder.

### Example: Recording Sorghum for Juba Arabic

1. Record audio of a native Juba speaker reading the sorghum message (from `js/translations.js` or the English fallback).
2. Save as `audio/juba/sorghum.mp3`.
3. When users select "Juba Arabic" on the Crops page and click the Sorghum voice button, the app will play `audio/juba/sorghum.mp3`.

## How It Works

The updated `playAudio(topic)` function in `js/script.js`:

1. Checks the user's selected language (Juba Arabic, Bari, or English).
2. **For Juba/Bari**: Attempts to load and play `/audio/{language}/{topic}.mp3`.
   - If the file exists and plays successfully, it plays the audio.
   - If the file is missing or fails to load, it falls back to `speechSynthesis` with the English message.
3. **For English**: Uses the browser's Web Speech API (`speechSynthesis`) directly.

## Fallback Behavior

If an audio file is not found for a Juba or Bari topic, the app logs a message to the console and automatically falls back to speaking the English message using the browser's TTS engine. This ensures the app continues to work even if audio files are incomplete.

### Console Log Example

```
Audio file not found: /audio/juba/sorghum.mp3. Falling back to speechSynthesis.
```

## Service Worker Caching

The service worker (`sw.js`) may need to be updated to cache audio files for offline use. Consider adding audio paths to the `urlsToCache` array:

```javascript
const urlsToCache = [
    // ... existing paths ...
    '/audio/juba/',
    '/audio/bari/'
];
```

## Testing Audio Playback

1. Open a Crops page in the browser (e.g., `crops.html`).
2. Select a language: **English**, **Juba Arabic (ar)**, or **Bari (ba)**.
3. Click the voice button for a crop (e.g., Sorghum).
4. Open DevTools Console (F12) to see logs:
   - If audio exists: `Finished playing: /audio/juba/sorghum.mp3`
   - If audio missing: `Audio file not found: /audio/juba/sorghum.mp3. Falling back to speechSynthesis.`

## Recommended Tools

- **Audacity** (free, open-source): Record, edit, and export as MP3.
- **Adobe Audition**: Professional audio editing.
- **GarageBand** (Mac): Quick recording and editing.
- **Web-based**: `audiotool.com`, `soundtrap.com` (no software install required).

## Priority Audio Files

To get started, prioritize recording these core files:

1. `sorghum.mp3`
2. `maize.mp3`
3. `planting.mp3`
4. `pest.mp3`

These are the most frequently accessed topics in the app.

## Future Enhancements

- Add a UI button in the voice picker to trigger re-recording or audio file uploads.
- Integrate with a cloud storage service (e.g., AWS S3) to host and serve audio files.
- Implement audio compression on the server to reduce file sizes.
- Add a progress indicator while audio is loading.
