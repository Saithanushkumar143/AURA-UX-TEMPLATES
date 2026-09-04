# AURA UX — Multi-Website Templates Platform (Single Vercel Project)

Deploy unlimited website templates inside **one single Vercel project** without managing multiple repositories or hitting project tier limits.

---

## 📁 Project Structure

```text
AURA UX TEMPLATES/
├── src/
│   ├── app/
│   │   ├── page.tsx                           # 🌐 Main Template Hub & Marketplace
│   │   │
│   │   ├── templates/                         # 📁 TEMPLATES DIRECTORY
│   │   │   │
│   │   │   ├── business/                      # 🏢 1. BUSINESS FOLDER
│   │   │   │   ├── corporate-agency/          # Apex Agency Pro Template
│   │   │   │   ├── saas-startup/              # CloudFlow SaaS Template
│   │   │   │   ├── consulting-pro/            # Vanguard Advisory Template
│   │   │   │   └── page.tsx                   # Business Showcase Catalog
│   │   │   │
│   │   │   └── celebrations/                  # 🎉 2. CELEBRATIONS FOLDER
│   │   │       ├── wedding-elegance/          # Eternal Union Luxury Wedding Template
│   │   │       ├── birthday-party/            # GlowNight VIP Birthday Bash Template
│   │   │       ├── anniversary-gala/          # Golden Jubilee Gala Template
│   │   │       └── page.tsx                   # Celebrations Showcase Catalog
│   │   │
│   │   ├── preview/                           # 📱 Multi-Device Interactive Previewer
│   │   │   └── [...slug]/page.tsx             # (Desktop / Tablet / Mobile switchers)
│   │   │
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── Navbar.tsx                         # Header with Category Navigation
│   │   ├── Footer.tsx                         # Footer
│   │   ├── TemplateCard.tsx                   # Template Showcase Cards
│   │   └── PreviewHeader.tsx                  # Topbar for Live Template Demos
│   │
│   └── data/
│       └── templates.ts                       # Template Metadata & Tag Registry
│
├── package.json
└── tailwind.config.ts
```

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to Vercel (1 Project)

1. Push this repository to GitHub / GitLab / Bitbucket.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import this repository (`AURA UX TEMPLATES`).
4. Click **Deploy**.

Vercel will build and serve all templates under a single domain:
- `your-domain.vercel.app/` &rarr; Main Aura UX Catalog
- `your-domain.vercel.app/templates/business/corporate-agency`
- `your-domain.vercel.app/templates/business/saas-startup`
- `your-domain.vercel.app/templates/business/consulting-pro`
- `your-domain.vercel.app/templates/celebrations/wedding-elegance`
- `your-domain.vercel.app/templates/celebrations/birthday-party`
- `your-domain.vercel.app/templates/celebrations/anniversary-gala`

---

## ➕ Adding a New Template

1. **For Business**: Create a folder in `src/app/templates/business/<template-name>/page.tsx`.
2. **For Celebrations**: Create a folder in `src/app/templates/celebrations/<template-name>/page.tsx`.
3. Add the template's details in `src/data/templates.ts` to show it automatically on the Hub page!
