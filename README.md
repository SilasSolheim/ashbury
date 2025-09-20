# Ashbury Chronicles (V2)

An immersive evidence/archive site for the Ashbury case. Next.js App Router + Markdown content.

## Quick start
```bash
pnpm install
pnpm dev
# visit http://localhost:3000/gate
```

## Build for GitHub Pages
- Set repo variable `NEXT_PUBLIC_BASE_PATH` to the repo slug (e.g., `ashbury-chronicles`).
- (Optional) Set `NEXT_PUBLIC_SITE_URL` to `https://<USER>.github.io/<REPO>` for OG images.
- Push to `main` — GitHub Actions deploys to Pages.

## Routes
`/gate`, `/cases`, `/evidence`, `/evidence/[slug]`, `/accounts`, `/accounts/[slug]`, `/notes`, `/notes/[id]`, `/surveillance`, `/surveillance/[id]`, `/characters`, `/characters/[slug]`, `/timeline`, `/search`

## Legal
No real-person likenesses. Portraits are synthetic (AI composites) with partial redaction optional.

## Accessibility & Performance
≥ 4.5:1 contrast, visible focus rings, respects reduced motion; LCP ≤ 3s target.

## Roadmap
- `next/image` once on Vercel
- Methods page (reliability rubric UI)
- ConvertKit/Resend newsletter wiring


## Characters importer
- Paste your master character dump into `scripts/in/ashbury-characters.txt`
- Run **ts-node**: `npx ts-node scripts/ingest-characters.ts`
- It will generate `/content/characters/*.md` using our schema (optional extended fields supported).
