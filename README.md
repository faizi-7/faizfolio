# Faizfolio

A **modular, open-source** personal portfolio template. Fork it, edit JSON files, and make it yours—no code changes needed!

🌐 Demo: [ifaiz.in](https://ifaiz.in)

## ✨ Features

- **JSON-driven configuration** – customize everything from config files
- **Modular architecture** – add/remove pages by editing JSON
- **Dark mode support** – automatic + manual toggle
- **SEO optimized** – meta tags, structured data, sitemap
- **Responsive design** – looks great on all devices

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

---

## 📁 Project Structure

```
├── public/
│   ├── config/           # ⚙️ Site configuration (edit these!)
│   │   ├── site.json        # Name, bio, tagline, images
│   │   ├── navigation.json  # Nav menu items
│   │   ├── social.json      # Social links
│   │   └── seo.json         # SEO defaults
│   │
│   ├── content/          # 📝 Your content
│   │   ├── experience.json  # Work experience
│   │   ├── projects.json    # Portfolio projects
│   │   ├── education.json   # Education history
│   │   ├── thoughts.json    # Reflections/quotes
│   │   ├── status.json      # Rotating status phrases
│   │   └── writings/        # Markdown blog posts
│   │
│   └── images/           # 🖼️ Your images
│
└── src/
    ├── components/       # Reusable UI components
    ├── pages/            # Route pages (Home, Writings, Connect)
    └── utils/            # Helper functions
```

---

## ⚙️ Configuration Guide

### 1. Site Info (`public/config/site.json`)

```json
{
  "name": "Your Name",
  "headline": "Your Job Title",
  "greeting": {
    "prefix": "Hey, I'm",
    "name": "Your Name"
  },
  "tagline": "Your witty tagline here",
  "email": "you@example.com",
  "timezone": "America/New_York",
  "resumePath": "/resume.pdf"
}
```

### 2. Navigation (`public/config/navigation.json`)

Add or remove pages:

```json
{
  "items": [
    { "path": "/", "label": "Home", "icon": "HiHome" },
    { "path": "/writings", "label": "Writings", "icon": "HiPencilAlt" },
    { "path": "/connect", "label": "Connect", "icon": "HiMail" }
  ]
}
```

Available icons: `HiHome`, `HiPencilAlt`, `HiMail`

### 3. Social Links (`public/config/social.json`)

```json
{
  "links": [
    {
      "name": "GitHub",
      "url": "https://github.com/yourusername",
      "icon": "github",
      "showInFooter": true,
      "showInConnect": true
    }
  ]
}
```

Available icons: `github`, `twitter`, `linkedin`, `instagram`, `youtube`, `email`

### 4. Content Files

| File | Purpose |
|------|---------|
| `experience.json` | Your work history |
| `projects.json` | Portfolio projects (freelance & personal) |
| `education.json` | Education & certifications |
| `thoughts.json` | Quotes/reflections carousel |
| `status.json` | Rotating phrases on homepage |

---

## ✍️ Adding Blog Posts

1. Create a markdown file in `public/content/writings/`
2. Add metadata to `public/content/writings.json`:

```json
[
  {
    "id": "my-post",
    "filename": "my-post.md",
    "title": "My Amazing Post",
    "date": "2024-01-15",
    "excerpt": "A brief description..."
  }
]
```

---

## 🛠️ Tech Stack

- **React 19** + **Vite**
- **React Router** for routing
- **CSS Modules** for styling
- **markdown-to-jsx** for blog posts

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

---

## 🚢 Deployment

Build and deploy the `dist` folder to any static host:

```bash
npm run build
```

Works great on **Vercel**, **Netlify**, **Cloudflare Pages**, etc.

---

## 📄 License

MIT License - feel free to use this for your own portfolio!
