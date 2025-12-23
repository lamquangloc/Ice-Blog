# IceBlog ❄️

Welcome to **IceBlog** – a personal tech blog built with **Next.js 14**, **Tailwind CSS**, and a touch of Cyberpunk aesthetic. This platform serves as a space to share knowledge, tutorials, and insights about modern web development, focusing on **JavaScript**, **Java**, and **Software Engineering**.

![IceBlog Preview](./public/assets/blog/preview/cover.jpg)
*(Note: Replace with an actual screenshot of your homepage if available)*

## 🚀 Features

- **Modern & Cyberpunk UI/UX**: unique design with detailed animations, glassmorphism, and a distinct "developer workspace" feel.
- **Dark/Light Mode**: seamless theme switching with adaptive diverse color palettes (Neon Cyberpunk in Dark Mode, Clean Modern in Light Mode).
- **Markdown-based Content**: write posts in Markdown with full support for syntax highlighting, categories, and tags.
- **Advanced Search**: fast, client-side search functionality with filtering by Categories and Tags.
- **Certificates Showcase**: a dedicated page to display professional certifications and achievements.
- **Responsive Design**: fully optimized for all devices, from mobile phones to large desktop screens.
- **Performance Optimized**: built on Next.js App Router for blazing fast static site generation (SSG) and dynamic rendering.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & `tailwindcss-animate`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Content**: Markdown / Remark / Rehype
- **Deployment**: Vercel (recommended)

## 📂 Project Structure

```bash
.
├── _posts/             # Markdown blog posts
├── public/             # Static assets (images, favicons, certificates)
├── src/
│   ├── app/            # App Router pages (Home, About, Certificates, Search, etc.)
│   ├── components/     # Reusable UI components
│   ├── lib/            # Utility functions (API, constants, markdown parsers)
│   └── interfaces/     # TypeScript interfaces
└── ...
```

## ⚡ Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Adding New Posts

1. Create a new `.md` file in the `_posts` directory.
2. Add the required frontmatter:

```yaml
---
title: "Your Post Title"
excerpt: "A short summary of the post..."
coverImage: "/assets/blog/cover/your-image.jpg"
date: "2025-12-23T05:35:07.322Z"
author:
  name: "Lâm Quang Lộc"
  picture: "/assets/blog/authors/avatar.png"
ogImage:
  url: "/assets/blog/preview/your-image.jpg"
categories: ["JavaScript", "React"]
tags: ["frontend", "web-dev"]
---
```

3. Write your content below the frontmatter using standard Markdown.

## 👤 Author

**Lâm Quang Lộc**
- **Role**: Software Engineer
- **Github**: [@lamquangloc](https://github.com/lamquangloc)
- **Email**: lamquangloc81@gmail.com

---

Designed and built with ❤️ by Lâm Quang Lộc.
