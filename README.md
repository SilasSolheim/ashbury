# Ashbury Chronicles (V4)

An immersive evidence/archive site for the Ashbury case. Next.js App Router + Markdown content.

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
