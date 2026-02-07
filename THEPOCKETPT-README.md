# ThePocketPT Website - Complete Ownership Guide

## Quick Reference

| Item | Details |
|------|---------|
| **Live URL** | https://mp26jkt6vbuc4.ok.kimi.link |
| **Framework** | React + TypeScript + Vite |
| **Styling** | Tailwind CSS |
| **Animations** | GSAP ScrollTrigger |
| **Build Output** | Static HTML/CSS/JS in `dist/` folder |

---

## Table of Contents

1. [Getting Started (Local Development)](#getting-started)
2. [Project Structure](#project-structure)
3. [Editing Content](#editing-content)
4. [Changing Images](#changing-images)
5. [Deploying to Production](#deploying)
6. [Connecting Your Domain](#custom-domain)
7. [Backing Up](#backing-up)
8. [Transferring to Another Host](#transferring)

---

## Getting Started

### Prerequisites

1. **Install Node.js** (LTS version)
   - Download: https://nodejs.org/
   - Verify: `node --version` (should show v18+)

2. **Install a Code Editor**
   - Recommended: VS Code (https://code.visualstudio.com/)

### Setup Instructions

```bash
# 1. Extract the source code
tar -xzvf ThePocketPT-source-code.tar.gz

# 2. Navigate to project folder
cd app

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev

# 5. Open browser to http://localhost:5173
```

### Build for Production

```bash
# Create optimized build in dist/ folder
npm run build

# The dist/ folder contains your static website files
```

---

## Project Structure

```
app/
├── public/                    # Static assets (images)
│   ├── hero_gym_woman.jpg
│   ├── hoodie_confident.jpg
│   └── ... (8 images total)
│
├── src/
│   ├── sections/              # Page sections
│   │   ├── HeroSection.tsx    # Homepage hero
│   │   ├── StatementSection.tsx  # Reusable statement sections
│   │   ├── YellowImpactSection.tsx  # Yellow highlight section
│   │   └── PricingSection.tsx   # Pricing, FAQ, Contact
│   │
│   ├── components/            # Reusable components
│   │   ├── Navigation.tsx     # Top navigation bar
│   │   └── ui/                # UI components (buttons, forms, etc.)
│   │
│   ├── App.tsx                # Main app component
│   ├── index.css              # Global styles
│   └── main.tsx               # Entry point
│
├── index.html                 # HTML template
├── package.json               # Dependencies
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript config
└── vite.config.ts             # Vite build config
```

---

## Editing Content

### Method 1: Edit Files Directly

#### Change Hero Headline

**File:** `src/sections/HeroSection.tsx`

Find this section (around line 100):
```tsx
<h1 className="font-display font-black...">
  <span className="headline-word block...">ONLINE</span>
  <span className="headline-word block...">COACHING</span>
  <span className="headline-word block...">THAT ACTUALLY</span>
  <span className="headline-word block... accent-yellow">FITS YOUR LIFE</span>
</h1>
```

Change to:
```tsx
<h1>
  <span>YOUR</span>
  <span>NEW</span>
  <span>HEADLINE</span>
  <span>HERE</span>
</h1>
```

#### Change Subheadline

Find:
```tsx
<p className="text-[#b9b9b9]...">
  Fat-loss, strength & confidence—built around your schedule...
</p>
```

Change the text inside the `<p>` tags.

#### Change CTA Button Text

Find:
```tsx
<button className="btn-primary...">
  Apply for coaching
</button>
```

Change the text between the button tags.

---

### Method 2: Create a Content File (Recommended)

Create `src/content/siteContent.ts`:

```typescript
export const siteContent = {
  hero: {
    badge: "NEW 8-WEEK PROGRAM",
    headline: ["ONLINE", "COACHING", "THAT ACTUALLY", "FITS YOUR LIFE"],
    subheadline: "Fat-loss, strength & confidence—built around your schedule...",
    primaryCta: "Apply for coaching",
    secondaryCta: "See how it works"
  },
  
  statements: [
    {
      id: "excuses",
      headline: "NO MORE EXCUSES",
      body: "You don't need more time...",
      cta: "Book a free call"
    },
    // ... more sections
  ],
  
  pricing: {
    title: "CHOOSE YOUR COACHING",
    plans: [
      {
        name: "8-Week Kickstart",
        price: "£199",
        features: ["Custom workout plan", "Nutrition guidance", ...]
      },
      // ... more plans
    ]
  }
};
```

Then import in components:
```typescript
import { siteContent } from '../content/siteContent';

// Use it
<h1>{siteContent.hero.headline.join(" ")}</h1>
```

---

## Changing Images

### Step 1: Add New Images

Copy your new images to the `public/` folder:
```bash
cp your-new-image.jpg app/public/
```

**Image Requirements:**
- Format: JPG or PNG
- Size: At least 1200x1600px (for full-height sections)
- Style: High-contrast B&W with warm tint (for consistency)

### Step 2: Update Image References

**File:** `src/sections/HeroSection.tsx`

Find:
```tsx
<img src="/hero_gym_woman.jpg" alt="Fitness coaching" />
```

Change to:
```tsx
<img src="/your-new-image.jpg" alt="Your description" />
```

### For Statement Sections

**File:** `src/App.tsx`

Find the section you want to change:
```tsx
<StatementSection
  image="/hoodie_confident.jpg"
  // ...
/>
```

Change the `image` prop to your new image path.

---

## Deploying

### Option 1: Vercel (Recommended - Free)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login (opens browser)
vercel login

# 3. Deploy
vercel --prod
```

Your site will be live at `https://your-project.vercel.app`

### Option 2: Netlify (Free)

```bash
# 1. Install Netlify CLI
npm i -g netlify-cli

# 2. Login
netlify login

# 3. Deploy
netlify deploy --prod --dir=dist
```

### Option 3: Manual Upload

1. Run `npm run build`
2. Upload the `dist/` folder contents to any web host via FTP

---

## Connecting Your Domain

### On Vercel:

1. Go to https://vercel.com/dashboard
2. Select your project
3. Click "Settings" → "Domains"
4. Enter your domain: `thepocketpt.co.uk`
5. Vercel will show you DNS records to add

### DNS Settings at Your Registrar:

**Option A: Using Nameservers (Easiest)**
- Change nameservers to Vercel's:
  - `ns1.vercel-dns.com`
  - `ns2.vercel-dns.com`

**Option B: Using CNAME Record**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### On Netlify:

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain
4. Update DNS as instructed

---

## Backing Up

### Method 1: Git Repository (Recommended)

```bash
# 1. Initialize git
cd app
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit"

# 4. Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/thepocketpt.git
git push -u origin main
```

### Method 2: Local Backup

```bash
# Create timestamped backup
tar -czvf "ThePocketPT-backup-$(date +%Y%m%d).tar.gz" app/
```

### Method 3: Cloud Backup

Upload to:
- Google Drive
- Dropbox
- iCloud

---

## Transferring to Another Host

Since this is a static website, you can host it anywhere:

### Compatible Hosts:
- **Vercel** (vercel.com) - Free tier
- **Netlify** (netlify.com) - Free tier
- **Cloudflare Pages** (pages.cloudflare.com) - Free
- **GitHub Pages** (github.com) - Free
- **AWS S3** (aws.amazon.com) - Pay per use
- **Any shared hosting** (Bluehost, HostGator, etc.)

### Transfer Steps:

1. **Download your site:**
   ```bash
   npm run build
   ```

2. **The `dist/` folder contains everything you need**

3. **Upload to new host:**
   - Drag & drop to Netlify/Vercel
   - Or use FTP for traditional hosts

---

## Color Reference

| Use | Color Code |
|-----|------------|
| Background | `#353539` |
| Text Primary | `#eaeaea` |
| Text Secondary | `#b9b9b9` |
| Accent (CTAs) | `#FFD895` |
| Dark Text (on yellow) | `#1F1F23` |

---

## Typography

| Use | Font |
|-----|------|
| Headlines | Sora (Google Fonts) |
| Body | Inter (Google Fonts) |
| Labels/Mono | IBM Plex Mono |

---

## Need Help?

### Documentation:
- React: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/docs
- GSAP: https://greensock.com/docs/
- Vite: https://vitejs.dev/guide/

### Common Issues:

**Build fails:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Changes not showing:**
- Clear browser cache (Ctrl+Shift+R)
- Make sure you ran `npm run build`

---

## License

You own this website completely. Do whatever you want with it.

---

## Support Files Included

1. `ThePocketPT-source-code.tar.gz` - Complete source code
2. `THEPOCKETPT-README.md` - This file

---

**Last Updated:** 2024
**Built with:** React + TypeScript + Tailwind + GSAP
