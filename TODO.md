# Bagani Oil — To Do List

## Pending Tasks

### Chatbot
- [ ] **Add guardrails to AI chatbot** — Limit the AI to only answer Bagani Oil-related questions. If a customer asks anything off-topic (politics, recipes, other brands, etc.), the bot should reply with a fixed refusal message.
  - File to edit: `netlify/functions/chat.js` → replace `SYSTEM_PROMPT`
  - Ready-to-use prompt available — just say "apply the chatbot guardrails"

### SEO
- [ ] **SEO implementation** — Add sitemap, Open Graph tags, and JSON-LD structured data.
  - Blocked until the production domain (`baganioil.ph`) is fully live and indexed.

### CMS / Content
- [ ] **Update store locations** — Replace seed data with real store addresses, contact numbers, and hours via the CMS.
- [ ] **Facebook Messenger Page ID** — Add the real Page ID to enable the Messenger CTA button in the chatbot.

---

> Last updated: April 2026
