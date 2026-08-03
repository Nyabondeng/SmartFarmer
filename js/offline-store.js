// ============================================================
// OFFLINE STORE — IndexedDB-backed local database for crop logs
// ------------------------------------------------------------
// Why IndexedDB rather than localStorage alone:
//   - It is a real transactional database (atomic writes), not a single
//     JSON string that must be re-parsed and re-serialised on every change.
//   - It stores structured records with a key path, and has a much larger
//     quota than the ~5 MB localStorage limit, so a farmer can keep many
//     seasons of planting records offline.
//   - It is asynchronous, so large reads/writes never block the UI.
//
// Design: the cloud (PostgreSQL via /api/logs) is the primary store for
// logged-in farmers. This module is the on-device store used when the
// farmer is offline or has not registered. If IndexedDB is unavailable
// (very old browser) it degrades gracefully to localStorage, and it
// migrates any records left by the previous localStorage-only version.
// ============================================================

(function () {
    'use strict';

    const DB_NAME = 'smartfarmer';
    const DB_VERSION = 1;
    const STORE = 'cropLogs';
    const LS_KEY = 'cropLogs'; // legacy localStorage key (for migration + fallback)

    const hasIDB = typeof indexedDB !== 'undefined';
    let dbPromise = null;
    let migrated = false;

    // ---- localStorage fallback helpers ----
    function lsGet() {
        try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; }
        catch (e) { return []; }
    }
    function lsSet(logs) {
        localStorage.setItem(LS_KEY, JSON.stringify(logs));
    }

    // ---- IndexedDB helpers ----
    function openDB() {
        if (dbPromise) return dbPromise;
        dbPromise = new Promise(function (resolve, reject) {
            const req = indexedDB.open(DB_NAME, DB_VERSION);
            req.onupgradeneeded = function () {
                const db = req.result;
                if (!db.objectStoreNames.contains(STORE)) {
                    db.createObjectStore(STORE, { keyPath: 'id' });
                }
            };
            req.onsuccess = function () { resolve(req.result); };
            req.onerror = function () { reject(req.error); };
        });
        return dbPromise;
    }

    function idbGetAll() {
        return openDB().then(function (db) {
            return new Promise(function (resolve, reject) {
                const tx = db.transaction(STORE, 'readonly');
                const req = tx.objectStore(STORE).getAll();
                req.onsuccess = function () { resolve(req.result || []); };
                req.onerror = function () { reject(req.error); };
            });
        });
    }

    function idbReplaceAll(logs) {
        return openDB().then(function (db) {
            return new Promise(function (resolve, reject) {
                const tx = db.transaction(STORE, 'readwrite');
                const store = tx.objectStore(STORE);
                store.clear();
                logs.forEach(function (log) { store.put(log); });
                tx.oncomplete = function () { resolve(); };
                tx.onerror = function () { reject(tx.error); };
            });
        });
    }

    // One-time move of any records left by the old localStorage-only version
    async function migrateOnce() {
        if (migrated) return;
        migrated = true;
        const legacy = lsGet();
        if (!legacy.length) return;
        try {
            const existing = await idbGetAll();
            if (!existing.length) await idbReplaceAll(legacy);
            localStorage.removeItem(LS_KEY);
        } catch (e) { /* keep legacy data in place if migration fails */ }
    }

    // ---- Public API (always resolves; never throws) ----
    async function getAll() {
        if (!hasIDB) return lsGet();
        try {
            await migrateOnce();
            const logs = await idbGetAll();
            // Newest first (ids are timestamps for local records)
            return logs.sort(function (a, b) { return (b.id || 0) - (a.id || 0); });
        } catch (e) {
            return lsGet();
        }
    }

    async function replaceAll(logs) {
        if (!hasIDB) { lsSet(logs); return; }
        try { await idbReplaceAll(logs); }
        catch (e) { lsSet(logs); }
    }

    window.OfflineStore = {
        getAll: getAll,
        replaceAll: replaceAll,
        engine: hasIDB ? 'indexeddb' : 'localstorage'
    };
})();
