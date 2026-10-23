# Validation Ideas (PoC)

Scout → Validate → Report funnel for App Ideas bot output. Next.js 15 (App Router) + TypeScript + Tailwind v4.
100% mock data and simulated async, no Facebook or AI calls. State is kept in localStorage (`vi:*` keys); use "Reset demo" in the footer to clear it.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export → ./out (Cloudflare Pages: build cmd `npm run build`, output dir `out`)
npm start            # serves ./out on http://localhost:4180
```

Routes: `/`, `/idea/[topPickId]/` (#scout | #validate | #report), `/idea/[otherId]/create/`.
