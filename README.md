# Portfolio v3 - Frontend

A modern portfolio website built with Astro, React, and Tailwind CSS. Features a bento-grid layout with live integrations for Spotify, reading list, and weather.

**Live Site:** [joseavila.dev](https://joseavila.dev)

## 🚀 Tech Stack

- **Framework:** Astro 3.6.1
- **UI Library:** React 18.2.0
- **Styling:** Tailwind CSS 3.3.3
- **Deployment:** GitHub Pages
- **Package Manager:** npm

## 📦 Project Structure

```
portfolio-v3/
├── src/
│   ├── assets/          # Images, SVGs
│   ├── components/      # Astro & React components
│   │   ├── audioPlayer/ # Spotify integration
│   │   ├── Reading/     # Raindrop.io reading list
│   │   ├── Weather/     # Weather widget
│   │   └── blog/        # Blog components
│   ├── layouts/         # Page layouts
│   ├── pages/           # Routes
│   │   ├── index.astro  # Homepage
│   │   ├── blog.astro   # Blog listing
│   │   └── posts/       # Blog posts
│   ├── i18n/            # Internationalization
│   ├── store/           # State management (nanostores)
│   └── utils/           # Utility functions
├── public/              # Static assets
└── .github/workflows/   # CI/CD configuration
```

## 🎨 Features

- **Bento Grid Layout** - Modern, responsive grid design
- **Live Spotify Player** - Shows recently played tracks
- **Reading List** - Displays articles from Raindrop.io
- **Weather Widget** - Real-time weather information
- **Dark/Light Mode** - Theme switcher
- **Internationalization** - Multi-language support
- **Blog** - Personal lab/experiments section
- **Responsive Design** - Mobile-first approach

## 🧞 Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```bash
PUBLIC_PORTFOLIO_URL=https://joseavila.dev
PUBLIC_SPOTIFY_API=https://your-backend-api.com/now-playing
PUBLIC_POCKET_API=https://your-backend-api.com/now-reading
PUBLIC_OPEN_WEATHER_API=https://api.openweathermap.org/data/2.5/weather
```

## 🚀 Deployment

This project is deployed to GitHub Pages using GitHub Actions.

**Deployment Process:**

1. Push to `master` branch
2. GitHub Actions workflow triggers
3. Builds the project with `npm run build`
4. Deploys to GitHub Pages

**Workflow:** `.github/workflows/deploy.yml`

## ✅ Improvement Checklist

Track progress on recommended enhancements for this project.

### 🔴 High Priority (Performance & UX)

- [ ] **Add localStorage caching** - Cache API responses client-side
- [ ] **Implement service worker** - Enable offline support
- [ ] **Optimize bundle size** - Analyze and reduce JavaScript bundle
- [ ] **Add lazy loading** - Defer loading of below-the-fold components
- [ ] **Improve loading states** - Better skeleton screens

### 🟡 Medium Priority (Testing & Quality)

- [ ] **Add testing framework** - Install Vitest or Jest
  ```bash
  npm install -D vitest @testing-library/react @testing-library/user-event
  ```
- [ ] **Write component tests** - Test AudioPlayer, Reading, Weather components
- [ ] **Add E2E tests** - Use Playwright or Cypress
- [ ] **Set up test coverage** - Aim for >80% coverage
- [ ] **Add ESLint** - Configure linting for the project
  ```bash
  npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
  ```

### 🟢 Medium Priority (Analytics & Monitoring)

- [ ] **Add Google Analytics 4** - Track user behavior
- [ ] **Implement Core Web Vitals tracking** - Monitor performance
- [ ] **Add custom event tracking** - Track component interactions
- [ ] **Set up conversion tracking** - Track resume downloads, contact clicks
- [ ] **Add error boundary** - Graceful error handling in React components

### 🔵 Low Priority (Documentation & DevEx)

- [ ] **Update README** - Add component architecture documentation
- [ ] **Add inline code comments** - Document complex logic
- [ ] **Create component documentation** - Document props and usage
- [ ] **Add pre-commit hooks** - Husky for linting/formatting
  ```bash
  npm install -D husky lint-staged
  ```
- [ ] **Add VS Code settings** - Shared editor configuration
- [ ] **Create architecture diagrams** - Visual documentation

### 🟣 Future Enhancements

- [ ] **Add blog CMS** - Integrate with Contentful or similar
- [ ] **Newsletter subscription** - Email list integration
- [ ] **Contact form** - Add contact form with backend integration
- [ ] **Photo gallery** - Showcase photography work
- [ ] **Project showcase** - Dedicated projects page
- [ ] **Resume builder** - Dynamic resume generation
- [ ] **Analytics dashboard** - Personal analytics page

## 📚 Resources

- [Astro Documentation](https://docs.astro.build)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Astro Discord](https://astro.build/chat)

## 👨‍💻 Author

**Jose Avila**

- Website: [joseavila.dev](https://joseavila.dev)
- Email: hola@joseavila.dev
- GitHub: [@josefosaurus](https://github.com/josefosaurus)
- LinkedIn: [avilajose](https://www.linkedin.com/in/avilajose/)
- Twitter: [@josefosaurus](https://twitter.com/josefosaurus)
