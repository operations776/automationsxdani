# Portfolio Redesign Plan

Owner: Daniyal Aziz. Drafted July 10, 2026. Status: awaiting Daniyal's answers on the 4 open questions at the bottom.

## 1. Audit: where the site stands today

- Lovable-generated Vite + React + TypeScript + Tailwind + shadcn/ui site, deployed to GitHub Pages (gh-pages branch, HashRouter). Last content update: February 2026.
- Content is frozen in the n8n era. Experience lists Xcorre, Trilles AI, Eynvision and TTC, all marked "Present". RecruiterGTM does not appear anywhere. The strongest 16 months (Claude agent systems, Clay, integrated GTM, live SaaS products) are completely missing.
- Design is the stock AI-portfolio template: deep navy background, electric cyan glow, neural-network canvas animation, typing headline, gradient text, glassmorphism. Thousands of Lovable sites look exactly like this. That is the "shaded, looks like AI" problem.
- "Interactive" today means click-to-expand cards and filter chips. Projects are static screenshots of workflow canvases. Nothing on the site lets a visitor experience what Daniyal actually builds.
- Housekeeping debt: repo name typo (protfolio), dist/ committed to git, empty README, URLs contain # from HashRouter, CV button points to an old Google Drive file, certifications-section.tsx and cv-section.tsx exist but are never rendered, contact email is personal gmail.

## 2. The repositioning

From: generic "Agentic AI Engineer" with a rotating list of job titles.

To: **GTM Engineer and AI Automation Specialist who builds Claude-powered GTM systems that run real revenue operations.** The site proves it by behaving like one of his systems: you can run things, not just scroll past them.

## 3. Content overhaul

### Experience timeline (corrected)

- **RecruiterGTM** (Mar 2026 to Present): GTM Engineer and AI Automation Specialist.
  - Builds and runs the Claude DFY practice: production Claude agent workspaces for recruitment founders, 20+ shipped, each wired to the client's ATS and outbound stack (Recruiterflow, Loxo, Bullhorn, HubSpot, PCRecruiter, Crelate, Stardex, Gem, Invenias).
  - Integrated GTM: Clay enrichment, Instantly and HeyReach outbound, inbound funnels, cross-channel reply suppression.
  - Shipped the client retainer portal, a live Next.js + Supabase product, including an in-house booking engine that replaced Calendly.
  - Ops layer: Slack automation and weekly client recaps, Notion client tracker as company source of truth, Skool community management.
- **Trilles AI** (Aug 2024 to Mar 2026): close out, keep highlights.
- **Xcorre** (Oct 2024 to Mar 2026): close out, keep highlights.
- **Eynvision, TTC**: keep as earlier roles, correct any stale "Present" dates.

### Projects: flagships vs archive

Flagship case studies (each gets a full case-study block with an interactive element):

1. **Claude DFY agent workspaces**: what a build contains (workspace config, recruiter profile ground truth, ATS integration modules, skills like /source, /content, /pipeline-report), 20+ shipped across 8+ ATS platforms. Client names anonymized ("a Sydney tech recruitment firm").
2. **RecruiterGTM client portal**: live SaaS, Next.js + Supabase, dashboards plus in-house booking engine (Google Calendar availability, reschedule and cancel flows, timezone handling).
3. **Cross-channel reply sync**: person-level suppression between Instantly (email) and HeyReach (LinkedIn) so a reply on one channel stops the other. Many-to-many campaign matching.
4. **Outbound brain and campaign engine**: swipe file, angle bank, distilled playbook, funding-signal intake (RSS to ICP-qualified CSV to Clay).
5. **Pulse Tracker**: SaaS marketing site with interactive product demos and a lead-capture backend.
6. **API key guide generator**: branded PDF pipeline that turns a client tool list into a designed setup document.
7. **Slack ops automation**: weekly per-client channel recaps feeding the company dashboard.

Archive grid (earlier automation work, kept but demoted): legal intake automation, Xero multi-entity invoicing, RAG agent, voice AI, agentic eBay scraper, lead-to-Odoo pipeline, survey automation, battery research agent, ZimedarDrive.

### Numbers and naming rules

- Client names: always anonymized to niche + geography.
- Internal revenue figures: never published.
- Fleet size, workspace count, ATS count: pending Daniyal's call (question 2 below).

## 4. Interactivity plan (the differentiator)

Priority order:

1. **Terminal hero**: the signature piece. A Claude Code style terminal where visitors click or type preset commands (/source, /campaign, /reply-sync, /brief) and watch realistic output stream in: enriched candidates, campaign copy, suppression logs. It demos the actual craft in 10 seconds and doubles as site navigation (typing "projects" scrolls there).
2. **Pipeline theater**: one animated data-flow diagram per flagship case study. SVG nodes (Clay, Instantly, HeyReach, ATS, Slack), packets visibly moving, a "run" button that plays the flow with mock data.
3. **Stack constellation**: an interactive graph of every tool he has integrated. Hover a node, see the projects that touch it.
4. **Cmd+K command palette** for navigation (cmdk is already a dependency).
5. **Proof strip**: compact counters and a "currently building" line, fed by a small JSON file he can update.
6. Case-study steppers: walk through a real flow step by step with mock data instead of a static screenshot.

## 5. Design system replacement

Kill list: neural-network canvas, glow shadows, gradient text, typing headline, glassmorphism, navy + cyan palette, circuit-board backgrounds, "Available for Projects" pulse badge.

Direction options:

- **A. Operator cockpit dark**: near-black neutral (not navy), one restrained accent, monospace details, dense grid, zero glow. Linear / Vercel dashboard energy.
- **B. Editorial light**: white or warm paper base, strong typography, product screenshots in clean frames. Reads senior and human.
- **C. Hybrid (recommended)**: light editorial base, with the interactive terminal and pipeline blocks as dark islands. Maximum contrast with the AI-template look, and the interactive pieces pop hardest.

Typography: one strong grotesk for headings, system or Inter for body, real monospace (JetBrains Mono or Geist Mono) for terminal blocks. Real screenshots of his actual products replace abstract illustrations.

## 6. Tech and plumbing

- Keep the stack (Vite + React + TS + Tailwind + shadcn). No rebuild needed. Strip lovable-tagger, prune unused shadcn components later.
- Add framer-motion for the animated diagrams and terminal streaming.
- Fix: repo rename to daniyal-aziz-portfolio (GitHub redirects the old URL), README, remove dist/ from git, meta tags + OG card + favicon, sitemap.
- Deployment: recommend moving to Vercel (clean URLs with BrowserRouter, preview deploys, custom domain support) but GitHub Pages works if preferred.
- CV: regenerate to match the new content, host in-repo as PDF instead of a Drive link.

## 7. Build order

1. Daniyal answers the 4 questions below.
2. Content pass: rewrite experience + project data files with the RecruiterGTM era. Fast, highest signal.
3. Design shell: new tokens, typography, layout, kill the template look.
4. Terminal hero + first pipeline diagram.
5. Remaining case studies, archive grid, proof strip, Cmd+K.
6. Polish: responsive, SEO, performance, CV regeneration.
7. Deploy: Vercel or Pages, repo rename, optional custom domain.

## 8. Open questions for Daniyal

1. Design direction: A (operator dark), B (editorial light), or C (hybrid, recommended)?
2. Public naming: OK to name RecruiterGTM as employer and link recruitergtm.io? Include Pulse Tracker even though its domain and pricing are not final? Publish a fleet-size stat like "supports a 75+ client operation"?
3. Deployment: move to Vercel with a custom domain (recommended), or stay on GitHub Pages? OK to rename the repo to fix the protfolio typo?
4. Contact identity: keep daniyalaziz184@gmail.com on the site, or switch to another address? And is the Drive CV current, or should the new CV be generated from this content?
