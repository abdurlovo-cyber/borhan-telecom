# BORHAN TELECOM
React + Vite + Tailwind + Firebase SPA (user panel + admin panel, Bangla/English).

## Run
npm install && npm run dev

## Firebase setup (manual, one time)
1. Console → Authentication → enable Email/Password; add your admin user.
2. Firestore Database → create (production mode). Storage → get started.
3. Deploy rules: `npm i -g firebase-tools && firebase login && firebase init` (Firestore + Storage, reuse `firestore.rules` / `storage.rules`), then `firebase deploy --only firestore:rules,storage`.
4. Grant admin role (custom claim): download a service-account key (keep it OUT of the repo), then
   `npm i firebase-admin && GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json node scripts/set-admin.mjs you@email.com`
   Sign out/in afterwards. The 10-click button only navigates; access is enforced by the claim + rules.
5. Auth → Settings → Authorized domains: add your `*.pages.dev` and custom domain.
6. If you later add queries mixing `where` + `orderBy`, Firestore will print an index link; click it.

## Cloudflare Pages
1. Push to GitHub. Cloudflare → Workers & Pages → Create → Pages → Connect to Git.
2. Build command `npm run build`, output directory `dist`, Node 18+.
3. Optional env vars: the `VITE_FIREBASE_*` keys from `.env.example` (defaults are built in; Firebase web keys are public identifiers, security comes from the rules).
4. `public/_redirects` provides the SPA fallback (refresh/direct URLs work). Add a custom domain in Pages → Custom domains (HTTPS automatic).
No Cloudflare Worker is needed.

## Not included yet
Admin pages for Operators, Categories, App Settings (operators/categories are constants in `src/utils/offers.js`), logo/favicon images (add `public/logo.png`, `favicon.ico`), Firestore server-side "Popular" ranking (category is admin-assigned).
No sample offers are seeded: the site shows only offers the admin enters.

## Cloudflare (Workers Static Assets mode)
`wrangler.jsonc` serves `dist/` with SPA fallback (no `_redirects` needed).
Dashboard settings: Build command `npm run build`, Deploy command `npx wrangler deploy`, Root directory `/`.
