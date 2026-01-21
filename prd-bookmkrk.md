# Product Requirements Document (PRD)
# bookmkrk - Weekly Bookmark Digest App

## Document Info
- **Version:** 1.0
- **Last Updated:** January 2025
- **Author:** Adnaan
- **Status:** Ready for Development

---

## 1. Executive Summary

### Problem Statement
People bookmark and save tweets, threads, and articles with the intention of revisiting them later, but rarely do. These saves accumulate into a "bookmark graveyard" - valuable content that's effectively lost. The friction of going back to check bookmarks, combined with the overwhelming volume, means most saved content is never consumed.

### Solution
bookmkrk is a web application that transforms passive bookmarking into active learning. Users save content throughout the week via a simple web form, and receive a curated weekly email digest featuring AI-generated summaries, thematic grouping, and intelligent resurfacing of older saves they never acted on.

### Core Value Proposition
- **Capture:** Frictionless saving of tweets/URLs
- **Process:** AI summarizes and categorizes content automatically
- **Deliver:** Weekly digest emails that are actually worth reading
- **Resurface:** Spaced repetition brings back forgotten saves

---

## 2. Tech Stack

### Frontend
| Technology | Purpose | Rationale |
|------------|---------|-----------|
| Next.js 14 (App Router) | Framework | SSR for landing page SEO, API routes for backend logic, middleware for auth, Vercel Cron for scheduled jobs |
| TypeScript | Language | Type safety, better DX with Convex |
| Tailwind CSS | Styling | Rapid UI development, consistent design |
| shadcn/ui | Component Library | Accessible, customizable, works great with Tailwind |
| Lucide Icons | Icons | Clean, consistent icon set |
| React Hook Form + Zod | Forms & Validation | Type-safe form handling |

### Backend & Database
| Technology | Purpose | Rationale |
|------------|---------|-----------|
| Convex | Database + Backend | Real-time sync, TypeScript-native, handles mutations/queries/actions, scheduled functions for cron jobs |
| Clerk | Authentication | Best-in-class auth DX, pre-built components, works seamlessly with Convex |

### External Services
| Technology | Purpose | Rationale |
|------------|---------|-----------|
| Gemini 2.0 Flash | AI Summarization & Categorization | Fast, cost-effective, high-quality outputs, generous free tier |
| Resend | Transactional Email | Excellent DX, React Email support, reliable delivery |
| Vercel | Hosting | Seamless Next.js deployment, edge functions, cron jobs |

### Tweet/URL Content Extraction
| Technology | Purpose | Rationale |
|------------|---------|-----------|
| @extractus/article-extractor | Article content extraction | Handles most URLs, extracts clean text |
| Custom Twitter scraper / Nitter | Tweet content extraction | Twitter API is expensive; fallback to scraping |

---

## 3. User Stories & Requirements

### 3.1 Authentication

**US-001: User Registration**
- As a new user, I want to sign up with email/password or Google OAuth so I can start saving content
- **Acceptance Criteria:**
  - User can sign up with email + password
  - User can sign up with Google OAuth (one-click)
  - Email verification is required for email/password signups
  - User is redirected to onboarding after signup

**US-002: User Login**
- As a returning user, I want to log in quickly so I can access my saved content
- **Acceptance Criteria:**
  - User can log in with email/password
  - User can log in with Google OAuth
  - "Remember me" functionality
  - Redirect to dashboard after login

**US-003: Password Reset**
- As a user who forgot my password, I want to reset it via email
- **Acceptance Criteria:**
  - User can request password reset email
  - Reset link expires after 24 hours
  - User can set new password via link

### 3.2 Content Saving

**US-004: Save via Web Form**
- As a user, I want to paste a URL and save it with one click
- **Acceptance Criteria:**
  - Simple input field on dashboard for URL
  - Supports Twitter/X URLs (tweets, threads)
  - Supports general article URLs
  - Shows loading state while processing
  - Displays success confirmation with summary preview
  - Handles invalid URLs gracefully with error message

**US-005: Automatic Content Extraction**
- As a user, I want the app to automatically extract the content from my saved URL
- **Acceptance Criteria:**
  - For tweets: Extract tweet text, author, timestamp, engagement metrics
  - For threads: Extract full thread content in order
  - For articles: Extract title, author, main body text, publication date
  - Store original URL for reference
  - Handle extraction failures gracefully (store URL with "pending" status)

**US-006: AI Summarization**
- As a user, I want each save to have an AI-generated summary so I remember why I saved it
- **Acceptance Criteria:**
  - Generate 2-3 sentence summary capturing key insight
  - Summary should answer: "Why is this worth revisiting?"
  - Process asynchronously (don't block save action)
  - Retry failed summarizations up to 3 times

**US-007: Automatic Categorization**
- As a user, I want my saves auto-categorized so my digest is organized
- **Acceptance Criteria:**
  - AI assigns one primary category from predefined list:
    - Career & Professional
    - Technology & AI
    - Personal Development
    - Business & Finance
    - Health & Wellness
    - Entertainment
    - News & Current Events
    - Other
  - User can manually recategorize if needed

**US-008: Optional Notes**
- As a user, I want to add personal notes to a save
- **Acceptance Criteria:**
  - Optional text field when saving
  - Can edit notes later from library
  - Notes appear in digest email

### 3.3 Library & Dashboard

**US-009: Dashboard Overview**
- As a user, I want to see my recent saves and stats at a glance
- **Acceptance Criteria:**
  - Quick-save form prominently displayed
  - Show last 5 saves with summaries
  - Stats: Total saves, saves this week, digest streak
  - Next digest countdown

**US-010: Library View**
- As a user, I want to browse all my saved content
- **Acceptance Criteria:**
  - List view of all saves (newest first)
  - Show: Title/preview, summary, category, date saved
  - Filter by category
  - Filter by date range
  - Search by keyword (searches title, content, summary, notes)
  - Pagination (20 items per page)

**US-011: Individual Save View**
- As a user, I want to view details of a specific save
- **Acceptance Criteria:**
  - Full extracted content
  - AI summary
  - Category (editable)
  - Personal notes (editable)
  - Original URL (clickable)
  - Date saved
  - Whether included in digest (and which date)
  - Delete option

**US-012: Delete Save**
- As a user, I want to delete saves I no longer want
- **Acceptance Criteria:**
  - Delete button with confirmation
  - Soft delete (retain for 30 days, then hard delete)
  - Deleted items don't appear in library or digests

### 3.4 Digest & Email

**US-013: Weekly Digest Email**
- As a user, I want to receive a weekly email summarizing my saves
- **Acceptance Criteria:**
  - Email contains all saves from the past week not yet included in a digest
  - Grouped by category
  - Each item shows: Title, summary, personal notes (if any), link to original
  - "Highlight of the Week" - AI picks most valuable save with explanation
  - "From the Archive" section - 2-3 older saves resurfaced via spaced repetition
  - Clean, readable email design (mobile-friendly)
  - Unsubscribe link in footer

**US-014: Digest Preferences**
- As a user, I want to configure when and how I receive digests
- **Acceptance Criteria:**
  - Choose day of week (default: Sunday)
  - Choose time (default: 9:00 AM in user's timezone)
  - Choose frequency: Weekly, Twice weekly, Daily
  - Option to pause digests temporarily
  - Timezone auto-detected, manually adjustable

**US-015: Empty Digest Handling**
- As a user, I don't want to receive empty digests
- **Acceptance Criteria:**
  - If no new saves, send brief "no new saves" email with archive highlights only
  - Or option to skip email entirely if no new saves

**US-016: Digest History**
- As a user, I want to view past digests
- **Acceptance Criteria:**
  - List of all sent digests with date
  - Click to view web version of any past digest
  - See which items were included in each digest

### 3.5 Settings

**US-017: Profile Settings**
- As a user, I want to manage my account
- **Acceptance Criteria:**
  - Update display name
  - Update email (with verification)
  - Change password
  - Delete account (with data export option)

**US-018: Notification Settings**
- As a user, I want to control my notifications
- **Acceptance Criteria:**
  - Toggle digest emails on/off
  - Toggle save confirmation emails on/off
  - Digest preferences (see US-014)

---

## 4. Data Models (Convex Schema)

```typescript
// schema.ts

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table (synced from Clerk)
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    timezone: v.optional(v.string()), // e.g., "America/Toronto"
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  // Saved content
  saves: defineTable({
    userId: v.id("users"),
    url: v.string(),
    type: v.union(v.literal("tweet"), v.literal("thread"), v.literal("article"), v.literal("other")),
    
    // Extracted content
    title: v.optional(v.string()),
    content: v.optional(v.string()), // Full extracted text
    author: v.optional(v.string()),
    authorHandle: v.optional(v.string()), // For tweets
    publishedAt: v.optional(v.number()),
    imageUrl: v.optional(v.string()), // Preview image
    
    // AI-generated
    summary: v.optional(v.string()),
    category: v.optional(v.string()),
    
    // User-provided
    notes: v.optional(v.string()),
    
    // Processing status
    status: v.union(
      v.literal("pending"),      // Just saved, not yet processed
      v.literal("processing"),   // Currently extracting/summarizing
      v.literal("completed"),    // Fully processed
      v.literal("failed")        // Extraction failed
    ),
    errorMessage: v.optional(v.string()),
    
    // Digest tracking
    includedInDigestAt: v.optional(v.number()), // Timestamp when included in digest
    digestId: v.optional(v.id("digests")),
    
    // Spaced repetition
    resurfacedCount: v.number(), // Times shown in "From the Archive"
    lastResurfacedAt: v.optional(v.number()),
    
    // Soft delete
    deletedAt: v.optional(v.number()),
    
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_status", ["userId", "status"])
    .index("by_user_and_category", ["userId", "category"])
    .index("by_user_created", ["userId", "createdAt"])
    .index("by_status", ["status"])
    .index("by_user_not_in_digest", ["userId", "includedInDigestAt"]),

  // Digest history
  digests: defineTable({
    userId: v.id("users"),
    sentAt: v.number(),
    emailId: v.optional(v.string()), // Resend email ID
    
    // Snapshot of what was included
    saveCount: v.number(),
    highlightSaveId: v.optional(v.id("saves")),
    archivedSaveIds: v.array(v.id("saves")), // "From the Archive" items
    
    // For web view
    htmlContent: v.optional(v.string()),
    
    status: v.union(
      v.literal("scheduled"),
      v.literal("sent"),
      v.literal("failed")
    ),
    errorMessage: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_sent", ["userId", "sentAt"]),

  // User preferences
  digestPreferences: defineTable({
    userId: v.id("users"),
    
    frequency: v.union(
      v.literal("daily"),
      v.literal("twice_weekly"),
      v.literal("weekly")
    ),
    dayOfWeek: v.number(), // 0 = Sunday, 6 = Saturday
    secondDayOfWeek: v.optional(v.number()), // For twice_weekly
    timeOfDay: v.string(), // "09:00" in 24h format
    
    isPaused: v.boolean(),
    pausedUntil: v.optional(v.number()),
    
    skipIfEmpty: v.boolean(), // Don't send if no new saves
    includeArchiveHighlights: v.boolean(), // Include "From the Archive"
    
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"]),

  // Processing queue (for async jobs)
  processingQueue: defineTable({
    saveId: v.id("saves"),
    type: v.union(
      v.literal("extract"),
      v.literal("summarize"),
      v.literal("categorize")
    ),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed")
    ),
    attempts: v.number(),
    lastAttemptAt: v.optional(v.number()),
    errorMessage: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_save", ["saveId"]),
});
```

---

## 5. API Routes / Convex Functions

### 5.1 Mutations (Write Operations)

```typescript
// convex/saves.ts

// Create a new save
createSave(args: { url: string, notes?: string }) => saveId

// Update save (notes, category)
updateSave(args: { saveId: Id, notes?: string, category?: string }) => void

// Delete save (soft delete)
deleteSave(args: { saveId: Id }) => void

// Restore deleted save
restoreSave(args: { saveId: Id }) => void
```

```typescript
// convex/users.ts

// Create/update user from Clerk webhook
upsertUser(args: { clerkId, email, name, imageUrl }) => userId

// Update user preferences
updateUserTimezone(args: { timezone: string }) => void
```

```typescript
// convex/digestPreferences.ts

// Update digest preferences
updateDigestPreferences(args: { 
  frequency, dayOfWeek, timeOfDay, skipIfEmpty, etc. 
}) => void

// Pause/resume digests
toggleDigestPause(args: { isPaused: boolean, pausedUntil?: number }) => void
```

### 5.2 Queries (Read Operations)

```typescript
// convex/saves.ts

// Get user's saves with filters
getSaves(args: { 
  category?: string, 
  search?: string,
  startDate?: number,
  endDate?: number,
  limit?: number,
  cursor?: string 
}) => { saves: Save[], nextCursor?: string }

// Get single save
getSave(args: { saveId: Id }) => Save | null

// Get recent saves for dashboard
getRecentSaves(args: { limit: number }) => Save[]

// Get stats
getUserStats() => { 
  totalSaves: number, 
  savesThisWeek: number,
  digestStreak: number,
  nextDigestDate: number
}
```

```typescript
// convex/digests.ts

// Get digest history
getDigests(args: { limit: number, cursor?: string }) => { digests: Digest[], nextCursor?: string }

// Get single digest for web view
getDigest(args: { digestId: Id }) => Digest | null
```

### 5.3 Actions (External API Calls)

```typescript
// convex/actions/extract.ts

// Extract content from URL
extractContent(args: { saveId: Id }) => { 
  title, content, author, type, imageUrl, publishedAt 
}
```

```typescript
// convex/actions/ai.ts

// Generate summary using Gemini
generateSummary(args: { saveId: Id, content: string }) => string

// Categorize content using Gemini
categorizeContent(args: { saveId: Id, content: string, title: string }) => string

// Select highlight of the week
selectHighlight(args: { saves: Save[] }) => { saveId: Id, reason: string }
```

```typescript
// convex/actions/email.ts

// Send digest email via Resend
sendDigestEmail(args: { userId: Id, digestId: Id }) => { emailId: string }

// Send welcome email
sendWelcomeEmail(args: { userId: Id }) => void
```

### 5.4 Scheduled Functions (Cron Jobs)

```typescript
// convex/crons.ts

// Run every hour - check for digests to send
checkAndSendDigests: scheduled hourly
  - Query users whose digest time has passed
  - For each user: compile saves, generate digest, send email

// Run every 5 minutes - process pending saves
processQueue: scheduled every 5 minutes
  - Pick up pending extraction/summarization jobs
  - Process with rate limiting

// Run daily - cleanup
dailyCleanup: scheduled daily at 3 AM UTC
  - Hard delete saves soft-deleted > 30 days ago
  - Clean up failed processing queue items > 7 days old
```

---

## 6. Page Structure & Routes

```
/                           - Landing page (public)
/sign-in                    - Clerk sign-in (public)
/sign-up                    - Clerk sign-up (public)

/dashboard                  - Main dashboard (protected)
/library                    - All saves (protected)
/library/[saveId]           - Individual save detail (protected)
/digests                    - Digest history (protected)
/digests/[digestId]         - View past digest (protected)
/settings                   - User settings (protected)
/settings/digest            - Digest preferences (protected)
/settings/account           - Account settings (protected)
```

---

## 7. UI/UX Specifications

### 7.1 Design System

**Colors:**
- Primary: Indigo (#6366F1)
- Secondary: Slate (#64748B)
- Success: Emerald (#10B981)
- Warning: Amber (#F59E0B)
- Error: Rose (#F43F5E)
- Background: White (#FFFFFF) / Slate-50 (#F8FAFC)
- Text: Slate-900 (#0F172A) / Slate-600 (#475569)

**Typography:**
- Font: Inter (Google Fonts)
- Headings: Semi-bold
- Body: Regular

**Spacing:**
- Use Tailwind's default spacing scale
- Consistent padding: p-4 for cards, p-6 for sections

**Components (shadcn/ui):**
- Button, Input, Card, Badge, Avatar
- Dialog, Dropdown Menu, Select
- Toast for notifications
- Skeleton for loading states

### 7.2 Key Screens

**Landing Page:**
- Hero with value prop and CTA
- How it works (3 steps)
- Feature highlights
- Testimonials/social proof (future)
- Pricing (if applicable, future)
- Footer with links

**Dashboard:**
- Header with user avatar, notifications
- Quick save form (prominent, center)
- Stats cards row
- Recent saves list
- Next digest countdown card

**Library:**
- Search bar
- Filter dropdowns (category, date)
- Save cards in list/grid view
- Pagination
- Empty state with CTA

**Save Detail:**
- Back button
- Content preview card
- Summary section
- Metadata (author, date, source)
- Notes editor
- Category selector
- Delete button
- Original link button

**Settings:**
- Sidebar navigation
- Form sections
- Save confirmation toasts

### 7.3 Mobile Responsiveness
- Fully responsive design
- Mobile-first approach
- Bottom navigation on mobile (optional)
- Collapsible sidebar on tablet

---

## 8. Email Templates

### 8.1 Weekly Digest Email

```
Subject: Your bookmkrk Digest - [Date]

Structure:
1. Header with logo
2. Greeting: "Hey [Name], here's what you saved this week"
3. Stats: X new saves across Y categories

4. 🌟 Highlight of the Week
   - Title
   - Summary
   - Why it's the highlight (AI-generated reason)
   - Link

5. By Category sections:
   📁 [Category Name] (X saves)
   - Save 1: Title | Summary | Notes (if any) | Link
   - Save 2: ...

6. 📚 From the Archive
   "Some gems from your past saves worth revisiting:"
   - Archive Save 1 (saved X weeks ago)
   - Archive Save 2

7. Footer
   - "Saved X items total since joining"
   - Manage preferences link
   - Unsubscribe link
```

### 8.2 Welcome Email

```
Subject: Welcome to bookmkrk! 🎉

Structure:
1. Welcome message
2. Quick start guide (3 steps)
3. Link to dashboard
4. Support contact
```

### 8.3 No New Saves Email (if not skipped)

```
Subject: Your bookmkrk Weekly Check-in

Structure:
1. "No new saves this week - that's okay!"
2. From the Archive section (3 items)
3. CTA to save something
```

---

## 9. Third-Party Integrations

### 9.1 Clerk (Authentication)

**Setup:**
- Create Clerk application
- Enable Email/Password + Google OAuth
- Configure redirect URLs
- Set up webhook for user sync

**Webhook Events to Handle:**
- `user.created` → Create user in Convex
- `user.updated` → Update user in Convex
- `user.deleted` → Mark user as deleted, trigger data cleanup

**Environment Variables:**
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
```

### 9.2 Convex

**Setup:**
- Create Convex project
- Link to GitHub repo
- Configure environment variables in Convex dashboard

**Environment Variables (in Convex):**
```
CLERK_ISSUER_URL=
ANTHROPIC_API_KEY=
RESEND_API_KEY=
```

### 9.3 Gemini API (Google AI)

**Usage:**
- Model: `gemini-2.0-flash` (fast, cost-effective for summaries)
- Max tokens: 300 for summaries, 50 for categories

**Setup:**
- Create Google AI Studio account
- Generate API key
- Use `@google/generative-ai` npm package

**Implementation:**
```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function generateSummary(content: string): Promise<string> {
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      maxOutputTokens: 300,
      temperature: 0.7,
    },
  });
  return result.response.text();
}
```

**Prompts:**

Summary prompt:
```
You are helping a user remember why they saved a piece of content. 
Given the following content, write a 2-3 sentence summary that:
1. Captures the key insight or takeaway
2. Explains why this might be worth revisiting
3. Is written in a friendly, second-person tone

Content:
[CONTENT]

Summary:
```

Categorization prompt:
```
Categorize the following content into exactly one of these categories:
- Career & Professional
- Technology & AI
- Personal Development
- Business & Finance
- Health & Wellness
- Entertainment
- News & Current Events
- Other

Content title: [TITLE]
Content: [CONTENT]

Respond with only the category name, nothing else.
```

### 9.4 Resend (Email)

**Setup:**
- Create Resend account
- Verify sending domain
- Create API key

**Environment Variables:**
```
RESEND_API_KEY=
RESEND_FROM_EMAIL=digest@yourdomain.com
```

**React Email Templates:**
- Use `@react-email/components` for email templates
- Store templates in `/emails` directory

---

## 10. Content Extraction Strategy

### 10.1 Tweet Extraction

**Option A: Twitter API (Expensive)**
- Requires Twitter API access ($100/month minimum)
- Most reliable

**Option B: Nitter Instances (Free, less reliable)**
- Use public Nitter instances to scrape
- Parse HTML for tweet content
- Handle rate limiting and instance rotation

**Option C: Hybrid Approach (Recommended)**
- Try direct Twitter embed oEmbed API first (free, limited)
- Fallback to Nitter scraping
- Store raw HTML as backup

**Implementation:**
```typescript
async function extractTweet(url: string) {
  // 1. Try oEmbed API
  const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}`;
  const oembed = await fetch(oembedUrl).then(r => r.json()).catch(() => null);
  
  if (oembed) {
    // Parse tweet text from HTML
    return parseOembedHtml(oembed.html);
  }
  
  // 2. Fallback to Nitter
  const nitterUrl = url.replace('twitter.com', 'nitter.net')
                       .replace('x.com', 'nitter.net');
  const html = await fetch(nitterUrl).then(r => r.text());
  return parseNitterHtml(html);
}
```

### 10.2 Article Extraction

**Library: `@extractus/article-extractor`**

```typescript
import { extract } from '@extractus/article-extractor';

async function extractArticle(url: string) {
  const article = await extract(url);
  return {
    title: article.title,
    content: article.content, // HTML content
    textContent: article.textContent, // Plain text
    author: article.author,
    publishedAt: article.published,
    imageUrl: article.image,
  };
}
```

**Fallbacks:**
- If extraction fails, try Mozilla Readability
- Store URL with "pending" status for manual review

---

## 11. Security Considerations

### 11.1 Authentication
- All API routes protected via Clerk middleware
- Convex functions verify user identity via auth context
- Rate limiting on save creation (50/hour per user)

### 11.2 Data Privacy
- Users can only access their own saves
- Soft delete allows recovery
- Hard delete after 30 days is permanent
- Data export available before account deletion

### 11.3 API Security
- Clerk webhook signature verification
- Gemini API key stored in Convex environment (not exposed to client)
- Resend API key stored in Convex environment

### 11.4 Input Validation
- URL validation before processing
- Zod schemas for all inputs
- Sanitize extracted content before storage

---

## 12. Performance Considerations

### 12.1 Database
- Proper indexes on all query patterns
- Pagination for list views
- Cursor-based pagination for infinite scroll

### 12.2 Processing
- Async processing queue for extraction/summarization
- Don't block save creation on AI processing
- Batch AI requests where possible

### 12.3 Email
- Pre-generate digest HTML during cron job
- Store generated HTML for web view
- Use React Email for consistent rendering

---

## 13. Analytics & Monitoring

### 13.1 Key Metrics
- Daily/Weekly Active Users
- Saves per user per week
- Digest open rate
- Digest click-through rate
- Extraction success rate
- Average processing time

### 13.2 Error Tracking
- Log extraction failures with URL for debugging
- Log AI API errors
- Log email delivery failures
- Set up alerts for elevated error rates

### 13.3 Recommended Tools
- Vercel Analytics (built-in)
- Convex dashboard for function metrics
- Resend dashboard for email metrics
- Consider: PostHog for product analytics (future)

---

## 14. Development Phases

### Phase 1: MVP (Week 1-2)
- [x] Project setup (Next.js, Convex, Clerk, Tailwind)
- [ ] Authentication flow (sign up, sign in, sign out)
- [ ] Basic save functionality (URL input, store in DB)
- [ ] Content extraction (tweets + articles)
- [ ] AI summarization
- [ ] Basic dashboard UI
- [ ] Library view with list of saves

### Phase 2: Core Features (Week 3)
- [ ] AI categorization
- [ ] Category filtering in library
- [ ] Search functionality
- [ ] Save detail view with editing
- [ ] Digest preferences settings
- [ ] Weekly digest email generation

### Phase 3: Polish (Week 4)
- [ ] Landing page
- [ ] Digest history view
- [ ] "From the Archive" spaced repetition
- [ ] "Highlight of the Week" feature
- [ ] Mobile responsiveness polish
- [ ] Error handling and edge cases

### Phase 4: Launch Prep (Week 5)
- [ ] Testing and bug fixes
- [ ] Performance optimization
- [ ] Documentation
- [ ] Deployment and domain setup
- [ ] Monitoring setup

---

## 15. Future Enhancements (Post-MVP)

- **Browser Extension:** One-click save from any page
- **Mobile App:** Share sheet integration for iOS/Android
- **Telegram Bot:** Forward links to save
- **Email Forwarding:** Send emails to save@saveflow.com
- **AI Chat:** "What did I save about X?" conversational interface
- **Tags:** User-defined tags in addition to auto-categories
- **Collections:** Group saves into custom collections
- **Sharing:** Share collections or individual saves publicly
- **Team Features:** Shared team digest
- **Integrations:** Notion, Readwise, Obsidian export

---

## 16. Open Questions

1. **Pricing Model:** Free tier limits? Premium features?
2. **Tweet API:** Invest in Twitter API or rely on scraping?
3. **Email Provider:** Stick with Resend or consider alternatives?
4. **Digest Customization:** How much control should users have over digest format?

---

## 17. Success Criteria

### MVP Success
- User can sign up and save 10 URLs successfully
- AI generates meaningful summaries for 90%+ of saves
- Weekly digest email is sent on schedule
- Email renders correctly on Gmail, Apple Mail, Outlook

### Product-Market Fit Indicators
- 50%+ of users save at least 3 items per week
- 60%+ digest email open rate
- Users return weekly (WAU/MAU > 0.4)
- Positive qualitative feedback

---

## Appendix A: Environment Variables

### Next.js (.env.local)
```
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
```

### Convex Dashboard (Environment Variables)
```
CLERK_ISSUER_URL=https://your-clerk-instance.clerk.accounts.dev
GEMINI_API_KEY=your-gemini-api-key
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=bookmkrk <digest@bookmkrk.com>
```

---

## Appendix B: File Structure

```
bookmkrk/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   ├── (marketing)/
│   │   └── page.tsx                 # Landing page
│   ├── (dashboard)/
│   │   ├── layout.tsx               # Dashboard layout with sidebar
│   │   ├── dashboard/page.tsx
│   │   ├── library/
│   │   │   ├── page.tsx
│   │   │   └── [saveId]/page.tsx
│   │   ├── digests/
│   │   │   ├── page.tsx
│   │   │   └── [digestId]/page.tsx
│   │   └── settings/
│   │       ├── page.tsx
│   │       ├── digest/page.tsx
│   │       └── account/page.tsx
│   ├── api/
│   │   └── webhooks/
│   │       └── clerk/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                          # shadcn/ui components
│   ├── dashboard/
│   │   ├── quick-save-form.tsx
│   │   ├── recent-saves.tsx
│   │   ├── stats-cards.tsx
│   │   └── digest-countdown.tsx
│   ├── library/
│   │   ├── save-card.tsx
│   │   ├── save-filters.tsx
│   │   └── save-detail.tsx
│   ├── settings/
│   │   ├── digest-preferences-form.tsx
│   │   └── account-form.tsx
│   └── shared/
│       ├── header.tsx
│       ├── sidebar.tsx
│       └── loading-skeleton.tsx
├── convex/
│   ├── _generated/
│   ├── schema.ts
│   ├── saves.ts
│   ├── users.ts
│   ├── digests.ts
│   ├── digestPreferences.ts
│   ├── processingQueue.ts
│   ├── actions/
│   │   ├── extract.ts
│   │   ├── ai.ts
│   │   └── email.ts
│   ├── crons.ts
│   └── auth.config.ts
├── emails/
│   ├── digest.tsx
│   ├── welcome.tsx
│   └── components/
├── lib/
│   ├── utils.ts
│   ├── gemini.ts                    # Gemini API client
│   ├── extract/
│   │   ├── twitter.ts
│   │   └── article.ts
│   └── validators/
│       └── url.ts
├── hooks/
│   ├── use-saves.ts
│   └── use-digest-preferences.ts
├── public/
│   └── ...
├── .env.local
├── convex.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Appendix C: Gemini Prompts Reference

### Summary Generation
```
You are helping a user remember why they saved a piece of content for later reading.

Given the following content, write a 2-3 sentence summary that:
1. Captures the single most important insight or takeaway
2. Explains why this might be worth revisiting later  
3. Uses a friendly, conversational tone

Rules:
- Be specific, not generic
- Focus on actionable insights or memorable ideas
- Keep it under 75 words

Content Type: {tweet|thread|article}
Title: {title}
Author: {author}
Content:
{content}

Summary:
```

### Categorization
```
Categorize this content into exactly ONE of these categories:

- Career & Professional (job advice, workplace, networking, skills)
- Technology & AI (tech news, programming, AI/ML, tools)
- Personal Development (productivity, habits, mindset, learning)
- Business & Finance (startups, investing, economics, entrepreneurship)
- Health & Wellness (fitness, mental health, nutrition, medical)
- Entertainment (movies, music, games, sports, pop culture)
- News & Current Events (politics, world events, breaking news)
- Other (doesn't fit above categories)

Title: {title}
Content preview: {first 500 chars of content}

Respond with ONLY the category name, exactly as written above.
```

### Highlight Selection
```
You are selecting the "Highlight of the Week" from a user's saved content.

Pick the ONE save that is most valuable to revisit. Consider:
- Actionable insights they can apply
- Ideas that challenge conventional thinking  
- Content with lasting relevance (not just news)
- Depth of insight

Saves from this week:
{for each save}
ID: {id}
Title: {title}
Summary: {summary}
Category: {category}
{end for}

Respond in JSON format:
{
  "saveId": "the ID of the chosen save",
  "reason": "A 1-2 sentence explanation of why this is the highlight (speak directly to the user using 'you')"
}
```

---

*End of PRD*
