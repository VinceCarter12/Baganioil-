# Bagani Oil — Hostinger Migration Plan

**From:** GoDaddy DNS + Netlify (countdown) → GoDaddy DNS + Hostinger (full site)
**Domain stays on GoDaddy. Only DNS records change. No nameserver or domain transfer.**

---

## Quick Summary

```
DURING COUNTDOWN:
  baganioil.ph        →  GoDaddy DNS  →  Netlify (countdown page)
  sub.baganioil.ph    →  GoDaddy DNS  →  Hostinger (full 11ty site, internal testing)

AFTER COUNTDOWN (launch day):
  baganioil.ph        →  GoDaddy DNS  →  Hostinger (full 11ty site) ✅
  Netlify             →  shut down ❌
  sub.baganioil.ph    →  keep as staging or remove (your choice)
```

---

## ⚠️ URGENT: Recovery — Revert Nameservers to GoDaddy

> **What happened:** Nameservers were changed from GoDaddy to Hostinger, which broke both the countdown page and Netlify connectivity. Both sites are currently down.

**Fix this NOW:**

- [ ] 1. Go to **GoDaddy** → My Products → `baganioil.ph` → **DNS** → **Nameservers**
- [ ] 2. Click **Change** → select **"Use GoDaddy's default nameservers"** (or "Reset to default")
- [ ] 3. Save
- [ ] 4. Wait **1–24 hours** for DNS propagation
- [ ] 5. Verify countdown page is back at `https://baganioil.ph`
- [ ] 6. Verify Netlify site is accessible again

> **Lesson learned:** NEVER change nameservers. We only add/edit individual DNS records (A records, CNAMEs) in GoDaddy. The nameservers must always stay on GoDaddy's defaults.

---

## The Golden Rule

```
╔══════════════════════════════════════════════════════════════╗
║  NAMESERVERS = NEVER TOUCH                                   ║
║  DNS RECORDS  = This is what we change (A records, CNAMEs)   ║
╚══════════════════════════════════════════════════════════════╝
```

- **Nameservers** control WHO manages your DNS. Changing them breaks everything that was set up under the old DNS manager.
- **DNS records** (A, CNAME) control WHERE each domain/subdomain points to. You can change these one at a time without breaking anything else.

---

## Phase 0 — Push to Company GitHub Account

> The company repo is: `https://github.com/baganioil/Baganioil-.git`
> Do this BEFORE setting up Hostinger so Hostinger connects to the correct repo from the start.

**Steps:**

- [ ] 1. On your machine, open terminal in the project folder
- [ ] 2. Add the company repo as the new remote:
  ```bash
  git remote set-url origin https://github.com/baganioil/Baganioil-.git
  ```
- [ ] 3. Push all code to the company repo:
  ```bash
  git push -u origin main
  ```
- [ ] 4. Verify at `https://github.com/baganioil/Baganioil-` — all code should be there
- [ ] 5. (Optional) Ask the company to add you as a **collaborator**:
  - Repo → Settings → Collaborators → Add people → `VinceCarter12`

> **Your personal repo** (`VinceCarter12/Bagani`) stays untouched as a backup.

---

## Phase 1 — Set Up Hostinger + Subdomain (do this NOW, while countdown runs)

### Step 1: Create Hostinger Account

- [ ] Sign up at [hostinger.com](https://hostinger.com)
- [ ] Choose **Web Hosting** (Premium or Business plan) — enough for a static 11ty site
- [ ] You do NOT need to buy a domain — you already have one on GoDaddy

### Step 2: Connect GitHub Repo to Hostinger

- [ ] Go to Hostinger **hPanel** → **Git** section
- [ ] Connect your GitHub account (or the company's `baganioil` account)
- [ ] Select repository: `baganioil/Bagani-oil-main`
- [ ] Set these values:

  | Setting | Value |
  |---------|-------|
  | Branch | `main` |
  | Build command | `npx @11ty/eleventy` |
  | Output directory | `_site` |
  | Node version | `18` |

### Step 3: Set Environment Variables

- [ ] Go to hPanel → **Advanced** → **Environment Variables**
- [ ] Add these exact values:

  | Variable | Value |
  |----------|-------|
  | `SANITY_PROJECT_ID` | `c7mgn6k7` |
  | `SANITY_DATASET` | `production` |
  | `NODE_VERSION` | `18` |

  > **About `SANITY_API_TOKEN`:** Check Netlify dashboard → Site Settings → Environment Variables. If there's a token there, copy it. If your Sanity dataset is public (read-only), you may not need it.

### Step 4: Test on Hostinger Temporary URL

- [ ] After deploy, Hostinger gives a temp URL like: `youraccount.hostingerapp.com`
- [ ] Open it and verify the full 11ty site loads
- [ ] Test: homepage, product pages, filters, mobile view
- [ ] If something is broken, check the deploy logs in hPanel → Git → Deployment History

### Step 5: Set Up Subdomain in GoDaddy DNS

> This makes `sub.baganioil.ph` point to Hostinger so the team can test the real site before launch.

- [ ] 1. In **Hostinger hPanel**, find your site's **IP address** — write it here:
  ```
  Hostinger IP: ___________________________
  ```
- [ ] 2. Go to **GoDaddy** → My Products → `baganioil.ph` → **DNS** → **DNS Records**
- [ ] 3. Click **Add Record** and enter:

  | Type | Name | Value | TTL |
  |------|------|-------|-----|
  | **A** | `sub` | `[Hostinger IP address]` | 600 |

- [ ] 4. Save — wait 15–60 minutes for propagation
- [ ] 5. Open `http://sub.baganioil.ph` — should show the full 11ty site from Hostinger

### Step 6: Set Up SSL for Subdomain

- [ ] In Hostinger hPanel → **Security** → **SSL** → install SSL for `sub.baganioil.ph`
- [ ] Wait ~15 minutes
- [ ] Verify `https://sub.baganioil.ph` works with green lock

### Step 7: Connect Sanity Webhook to Hostinger

- [ ] Go to **Sanity dashboard** → Settings → API → Webhooks
- [ ] Add a new webhook with Hostinger's deploy trigger URL
- [ ] Keep the existing **Netlify webhook active** (both rebuild during prep phase)
- [ ] Test: update a product in Sanity → verify the site rebuilds on Hostinger

---

## Phase 2 — Pre-Launch Verification (1–2 days before launch)

**Confirm everything works before touching the main domain:**

- [ ] 1. Open `https://sub.baganioil.ph` — full site loads correctly
- [ ] 2. Test all product pages, navigation, mobile view
- [ ] 3. Test Sanity CMS: edit a product → verify rebuild and content update
- [ ] 4. Open `https://baganioil.ph` — countdown page is still showing (untouched)
- [ ] 5. Note down the Hostinger IP address (same one used for subdomain)
- [ ] 6. **Lower the TTL** on the existing `baganioil.ph` A record in GoDaddy:
  - GoDaddy → DNS Records → find the A record for `@` (root domain)
  - Change TTL from `3600` (1 hour) to `600` (10 minutes)
  - This makes the launch-day switch propagate faster
- [ ] 7. Tell the team: "We're ready to switch. Launch day is confirmed."

---

## Phase 3 — Launch Day (Countdown Hits Zero)

**This is the moment. One DNS record change and you're live.**

### Before the Switch
- [ ] 1. Open `https://sub.baganioil.ph` — final check, everything works
- [ ] 2. Have GoDaddy DNS management open and ready

### The Switch (takes 2 minutes)
- [ ] 3. Go to **GoDaddy** → `baganioil.ph` → **DNS** → **DNS Records**
- [ ] 4. Find the **A record** for `@` (root domain) — it currently points to Netlify's IP
- [ ] 5. **Edit** it: change the IP address to your **Hostinger IP**

  | Type | Name | Old Value (Netlify) | New Value (Hostinger) |
  |------|------|--------------------|-----------------------|
  | **A** | `@` | `[Netlify IP]` | `[Hostinger IP]` |

- [ ] 6. If you have a **CNAME for www**, update it too:

  | Type | Name | Value |
  |------|------|-------|
  | **CNAME** | `www` | `sub.baganioil.ph` or Hostinger's hostname |

- [ ] 7. Save

### After the Switch
- [ ] 8. Wait **10–60 minutes** (faster because we lowered TTL in Phase 2)
- [ ] 9. Check propagation at [dnschecker.org](https://dnschecker.org) → search `baganioil.ph`
- [ ] 10. Open `https://baganioil.ph` — should now show the full 11ty site
- [ ] 11. In Hostinger hPanel → **Security** → **SSL** → install SSL for `baganioil.ph`
- [ ] 12. Wait ~15 minutes for SSL to activate
- [ ] 13. Verify `https://baganioil.ph` shows green lock
- [ ] 14. Test: product pages, navigation, mobile, contact form
- [ ] 15. Test Sanity: edit content → verify rebuild

---

## Phase 4 — Post-Launch Cleanup

### Netlify (do within 1–2 days after launch)
- [ ] Netlify → Site Settings → Domain Management → remove `baganioil.ph`
- [ ] Sanity → Settings → API → Webhooks → **delete the Netlify webhook**
- [ ] Delete the Netlify site entirely (optional, but recommended)

### GoDaddy DNS
- [ ] Remove the old Netlify-related DNS records (if any remain)
- [ ] **Subdomain decision:**
  - **Keep `sub.baganioil.ph`** as a staging/preview environment (recommended)
  - OR remove the `sub` A record from GoDaddy DNS if you don't need it

### GitHub Repo
- [ ] Delete `netlify.toml` from the repo root
- [ ] Remove `_redirects` or any other Netlify-specific files
- [ ] Remove `netlify/functions/` directory if it exists
- [ ] Commit: `git commit -m "Remove Netlify config after migration to Hostinger"`

---

## Phase 5 — GitHub Actions Auto-Deploy (Fallback)

> Use this ONLY if Hostinger's built-in Git deployment doesn't support 11ty builds natively.

Create this file: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build 11ty site
        run: npm run build
        env:
          SANITY_PROJECT_ID: ${{ secrets.SANITY_PROJECT_ID }}
          SANITY_DATASET: ${{ secrets.SANITY_DATASET }}
          SANITY_API_TOKEN: ${{ secrets.SANITY_API_TOKEN }}

      - name: Deploy via FTP to Hostinger
        uses: SamKirkland/FTP-Deploy-Action@v4.3.4
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./_site/
          server-dir: /public_html/
```

**GitHub Secrets to add** (repo → Settings → Secrets and Variables → Actions):

| Secret | Where to find it |
|--------|-----------------|
| `SANITY_PROJECT_ID` | `c7mgn6k7` |
| `SANITY_DATASET` | `production` |
| `SANITY_API_TOKEN` | Sanity dashboard → API → Tokens |
| `FTP_SERVER` | Hostinger hPanel → Files → FTP Accounts |
| `FTP_USERNAME` | Hostinger hPanel → Files → FTP Accounts |
| `FTP_PASSWORD` | Hostinger hPanel → Files → FTP Accounts |

---

## DNS Records Reference

### Before Launch (current state after recovery)

| Type | Name | Points To | Purpose |
|------|------|-----------|---------|
| A | `@` | Netlify IP | Countdown page at `baganioil.ph` |
| A | `sub` | Hostinger IP | Full site at `sub.baganioil.ph` (testing) |
| CNAME | `www` | Netlify hostname | www redirect |

### After Launch (what we change on launch day)

| Type | Name | Points To | Purpose |
|------|------|-----------|---------|
| A | `@` | **Hostinger IP** | Full site at `baganioil.ph` ✅ |
| A | `sub` | Hostinger IP | Staging (keep or remove) |
| CNAME | `www` | **Hostinger hostname** | www redirect ✅ |

> **Only 2 records change.** Everything else stays the same.

---

## Rollback Plan (if something goes wrong on launch day)

If the site breaks after the DNS switch:

1. Go to GoDaddy → DNS Records → change the A record for `@` **back to Netlify's IP**
2. Change CNAME for `www` back to Netlify's hostname
3. Save — countdown page will return within 10–60 minutes (since TTL is low)
4. Investigate what went wrong on Hostinger
5. Try again when fixed

**This is why we keep Netlify alive for 1–2 days after launch** — it's your safety net.

---

## Timeline Summary

| When | Action |
|------|--------|
| **RIGHT NOW** | Revert GoDaddy nameservers to default (recovery) |
| **Today** | Push code to `baganioil/Bagani-oil-main` GitHub repo |
| **Today** | Set up Hostinger, deploy 11ty, test on temp URL |
| **Today** | Add `sub` A record in GoDaddy DNS → Hostinger IP |
| **1–2 days before launch** | Verify `sub.baganioil.ph` works, lower TTL on main domain |
| **Launch day** | Change A record for `@` from Netlify IP → Hostinger IP |
| **Launch day** | Install SSL, verify everything works |
| **1–2 days after launch** | Delete Netlify site, remove webhook, clean up repo |

---

## Quick Reference — Key Locations

| Task | Where |
|------|-------|
| **GoDaddy DNS records** | GoDaddy → My Products → baganioil.ph → DNS → DNS Records |
| **GoDaddy nameservers** | GoDaddy → My Products → baganioil.ph → DNS → Nameservers (DO NOT TOUCH) |
| **Hostinger Git deploy** | hPanel → Hosting → your site → Git |
| **Hostinger env vars** | hPanel → Advanced → Environment Variables |
| **Hostinger IP address** | hPanel → Hosting → your site → Details |
| **Hostinger SSL** | hPanel → Security → SSL |
| **Hostinger FTP** | hPanel → Files → FTP Accounts |
| **Sanity webhooks** | sanity.io → Project → Settings → API → Webhooks |
| **Netlify site** | app.netlify.com → your site → Site Settings |

---

## Fill-In Section (write these down as you go)

```
Hostinger IP address:     ___________________________
Netlify IP address:       ___________________________
Hostinger hostname:       ___________________________
Netlify hostname:         ___________________________
Hostinger temp URL:       ___________________________
Company GitHub repo:      https://github.com/baganioil/Baganioil-
Subdomain:                sub.baganioil.ph
Launch date:              ___________________________
```
