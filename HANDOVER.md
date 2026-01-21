# bookmkrk - Phase 0 Complete - Agent Handover

## Summary

Phase 0 (Foundation Setup) is complete. The project is set up with Next.js 14, Clerk authentication, Convex database, and shadcn/ui components. The build passes with placeholder environment variables.

## Completed (Phase 0)

### 0.1 Project Initialization
- Next.js 14 with App Router, TypeScript, Tailwind CSS 4
- shadcn/ui components: button, input, card, badge, skeleton, sonner, select, textarea
- All dependencies installed per the plan

### 0.2 Clerk Authentication
- Sign-in page: `app/(auth)/sign-in/[[...sign-in]]/page.tsx`
- Sign-up page: `app/(auth)/sign-up/[[...sign-up]]/page.tsx`
- Middleware: `middleware.ts` (route protection)
- Provider: `components/providers/index.tsx` (combined Clerk + Convex)

### 0.3 Convex Schema & User Sync
- Schema: `convex/schema.ts` (users, saves, digestPreferences, digests tables)
- User mutations/queries: `convex/users.ts`
- Clerk webhook handler: `app/api/webhooks/clerk/route.ts`
- Auth config: `convex/auth.config.ts`

### Environment Variables
- `.env.local.example` - Template with all required variables
- `.env.local` - Placeholder values (must be replaced with real credentials)

## Project Structure

```
bookmkrk/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx (placeholder)
│   │   ├── library/ (empty - Phase 2)
│   │   ├── settings/ (empty - Phase 3)
│   │   └── layout.tsx
│   ├── api/webhooks/clerk/route.ts
│   ├── layout.tsx
│   ├── page.tsx (landing page placeholder)
│   └── globals.css
├── components/
│   ├── providers/
│   │   ├── index.tsx (main providers)
│   │   └── convex-provider.tsx (standalone)
│   └── ui/ (shadcn components)
├── convex/
│   ├── _generated/ (stub files - will be replaced by `npx convex dev`)
│   │   ├── api.ts
│   │   ├── server.ts
│   │   └── dataModel.ts
│   ├── schema.ts (full schema)
│   ├── users.ts (user CRUD)
│   └── auth.config.ts
├── lib/
│   ├── utils.ts (cn function)
│   └── validators/url.ts (URL validation helpers)
├── .env.local (placeholder values)
├── .env.local.example (template)
├── middleware.ts
└── package.json
```

## Next Steps (Phase 1)

### 1.1 Dashboard Layout & Quick-Save Form
Files to create:
- `app/(dashboard)/layout.tsx` - Update with header and mobile nav
- `components/shared/header.tsx` - Top navigation
- `components/shared/mobile-nav.tsx` - Bottom nav (MVP priority)
- `components/dashboard/quick-save-form.tsx` - Prominent URL input

Key behaviors:
- Quick-save form is hero element (center, prominent)
- Immediate URL validation on input
- Mobile bottom nav with Home/Library/Settings

### 1.2 Save Creation & Storage
Files to create:
- `convex/saves.ts` - createSave mutation with duplicate check
- Use existing `lib/validators/url.ts` for validation

Key behaviors:
- Detect URL type (tweet vs article)
- Check for duplicates → block with link to existing
- Schedule extraction job on save

### 1.3 Content Extraction
Files to create:
- `convex/actions/extract.ts` - extraction orchestration
- `lib/extract/article.ts` - @extractus/article-extractor
- `lib/extract/twitter.ts` - oEmbed with URL-only fallback

### 1.4 AI Summarization & Categorization
Files to create:
- `convex/actions/ai.ts` - Gemini integration
- `lib/gemini.ts` - Gemini client

Fallbacks:
- Summary: First 200 chars if AI fails
- Category: "Other" as default

### 1.5 Dashboard Display
Files to create:
- `components/dashboard/recent-saves.tsx`
- `components/dashboard/save-card.tsx`
- `components/dashboard/stats-cards.tsx`

## Important Notes

1. **Convex Setup Required**: The next agent should run `npx convex dev` to:
   - Create a Convex project
   - Generate proper types in `convex/_generated/`
   - Deploy the schema

2. **Environment Variables**: User needs to set up:
   - Clerk: Get keys from https://dashboard.clerk.dev
   - Convex: Will be provided after `npx convex dev`
   - In Convex Dashboard: CLERK_ISSUER_URL, GEMINI_API_KEY, RESEND_API_KEY

3. **Middleware Warning**: Next.js shows a deprecation warning about middleware → proxy. This is informational and doesn't affect functionality.

4. **Placeholder Files**: `convex/_generated/*` contains stub files that will be overwritten when Convex is properly initialized.

## Commands

```bash
# Development
npm run dev

# Build (requires valid env vars)
npm run build

# Initialize Convex (required before first run)
npx convex dev
```

## Dependencies Installed

- convex, @clerk/nextjs (auth + db)
- @radix-ui/react-slot, class-variance-authority, clsx, tailwind-merge, lucide-react (UI)
- react-hook-form, @hookform/resolvers, zod (forms)
- @google/generative-ai, resend, @react-email/components (AI + email)
- @extractus/article-extractor (content extraction)
- svix (webhooks)

## Verification Checklist for Phase 0

- [x] Project builds successfully with `npm run build`
- [x] All shadcn/ui components installed
- [x] Clerk auth pages exist
- [x] Convex schema defined
- [x] User sync webhook handler created
- [x] Environment variable templates created
- [ ] Real credentials configured (user task)
- [ ] Convex project created via `npx convex dev` (user task)

## Reference

See `prd-bookmkrk.md` for the full product requirements document and the original implementation plan at the top of this conversation.
