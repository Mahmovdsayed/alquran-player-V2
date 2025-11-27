<div align="center">

# 🕌 AL-Quran Player

### Read, Listen & Explore the Holy Quran Online

[![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Live Demo](https://alquran-player.vercel.app/) • [Report Bug](https://github.com/Mahmovdsayed/alquran-player-V2/issues) • [Request Feature](https://github.com/Mahmovdsayed/alquran-player-V2/issues)

</div>

---

## 📖 Overview

**AL-Quran Player** is a modern, feature-rich web application that provides Muslims worldwide with an accessible platform to read, listen to, and explore the Holy Quran. Built with cutting-edge technologies, it offers a seamless experience across all devices with beautiful UI/UX design, multiple reciters, translations, and prayer time tracking.

### ✨ Key Highlights

- 🎧 **70+ Renowned Reciters** - Listen to beautiful recitations from world-famous Qaris
- 📚 **Complete Quran Text** - All 114 Surahs with Arabic text and translations
- 🕌 **Prayer Times** - Accurate Salah times based on your location
- 🎨 **Modern UI/UX** - Beautiful, responsive design with dark mode support
- 🔍 **Surah Information** - Detailed information about each Surah including Tafsir
- 📱 **Progressive Web App** - Install and use offline on any device
- 🌍 **Multi-language Support** - Translations in multiple languages
- 🎯 **Juz Navigation** - Browse and listen by Juz (Para)
- 💾 **State Persistence** - Your preferences and progress are saved
- ⚡ **Lightning Fast** - Optimized performance with Next.js 16

---

## 🚀 Features

### 📖 Reading Experience

- **Full Quran Text**: Complete Arabic text with Uthmani script
- **Multiple Translations**: English and other language translations
- **Verse-by-Verse Display**: Easy navigation through verses
- **Tafsir Integration**: Access detailed explanations of verses
- **Customizable View**: Adjust text size and layout preferences
- **Share Verses**: Share specific verses with others

### 🎵 Audio Player

- **70+ Reciters**: Choose from renowned Qaris worldwide
- **High-Quality Audio**: Crystal clear recitation audio
- **Playback Controls**: Play, pause, skip, and repeat controls
- **Auto-Play**: Continuous playback across verses
- **Speed Control**: Adjust playback speed
- **Background Play**: Continue listening while browsing

### 🕌 Prayer Times

- **5 Daily Prayers**: Accurate times for Fajr, Dhuhr, Asr, Maghrib, Isha
- **Location-Based**: Automatic detection or manual location selection
- **Multiple Calculation Methods**: Various Islamic calculation methods
- **Notifications**: Prayer time reminders (coming soon)

### 🎯 Navigation & Organization

- **Surah Browser**: Browse all 114 Surahs with details
- **Juz Navigation**: Navigate by Juz (30 parts)
- **Search Functionality**: Find specific Surahs quickly
- **Bookmarks**: Save your favorite verses (coming soon)
- **Reading History**: Track your reading progress

### 🎨 User Experience

- **Dark/Light Mode**: Comfortable reading in any lighting
- **Responsive Design**: Perfect on mobile, tablet, and desktop
- **Smooth Animations**: Polished UI with Framer Motion
- **Accessibility**: WCAG compliant for all users
- **Fast Loading**: Optimized performance and caching

---

## 🛠️ Tech Stack

### Core Framework

- **[Next.js 16.0.1](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.0](https://reactjs.org/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety

### Styling & UI

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon set
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark mode support

### State Management & Data Fetching

- **[Redux Toolkit](https://redux-toolkit.js.org/)** - State management
- **[Redux Persist](https://github.com/rt2zz/redux-persist)** - Persist state
- **[TanStack Query](https://tanstack.com/query)** - Server state management
- **[Axios](https://axios-http.com/)** - HTTP client

### APIs & Integrations

- **[@quranjs/api](https://www.npmjs.com/package/@quranjs/api)** - Quran data API
- **[Quran.com API](https://api.quran.com/)** - Verses, translations, and Tafsir
- **[AlQuran Cloud API](https://alquran.cloud/api)** - Audio recitations
- **[Vercel Analytics](https://vercel.com/analytics)** - Performance monitoring

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Critters](https://github.com/GoogleChromeLabs/critters)** - Critical CSS inlining

---

## 📁 Project Structure

```
alquran-player/
├── app/                      # Next.js App Router
│   ├── play/[slug]/         # Audio player pages
│   ├── read/[slug]/         # Reading pages
│   ├── info/                # Surah information pages
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── layout/              # Layout components
│   │   ├── Navigation.tsx   # Main navigation
│   │   ├── Footer.tsx       # Footer component
│   │   ├── Banner.tsx       # Hero banner
│   │   └── AsmaAlHusnaa.tsx # 99 Names of Allah
│   ├── sections/            # Page sections
│   │   ├── Home.tsx         # Home section with tabs
│   │   ├── Plays.tsx        # Audio player section
│   │   ├── Prayer.tsx       # Prayer times section
│   │   ├── SurahSection.tsx # Surah reading section
│   │   ├── Juzs.tsx         # Juz navigation
│   │   └── AboutSurah.tsx   # Surah information
│   └── ui/                  # Reusable UI components
│       ├── button.tsx       # Button component
│       ├── card.tsx         # Card component
│       ├── tabs.tsx         # Tabs component
│       ├── slider.tsx       # Slider component
│       └── ...              # Other UI components
├── redux/                   # State management
│   ├── store.ts            # Redux store configuration
│   ├── slices/             # Redux slices
│   └── storage.ts          # Redux persist config
├── sdk/                    # API SDK
│   └── surah.ts           # Quran API functions
├── functions/              # Utility functions
├── static/                 # Static data
│   └── surah.ts           # Surah metadata
├── utils/                  # Utilities
│   └── axios.ts           # Axios configuration
├── Providers/              # Context providers
│   └── Providers.tsx      # App providers wrapper
└── public/                 # Public assets
    └── images/            # Image assets
```

---

## 🎯 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Mahmovdsayed/alquran-player-V2.git
   cd alquran-player
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
npm run build
npm run start
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional: Add any custom API endpoints or keys
NEXT_PUBLIC_API_BASE_URL=https://api.quran.com/api/v4
```

### Customization

- **Theme Colors**: Edit `app/globals.css` to customize color schemes
- **Fonts**: Modify font imports in `app/layout.tsx`
- **Metadata**: Update SEO metadata in `app/layout.tsx`
- **Reciters**: Add or modify reciters in the audio player component

---

## 📚 API Integration

This project integrates with multiple Quran APIs:

### 1. Quran.com API

- **Base URL**: `https://api.quran.com/api/v4`
- **Endpoints Used**:
  - `/quran/verses/imlaei` - Verse text
  - `/quran/translations/{id}` - Translations
  - `/chapters/{id}` - Chapter information
  - `/chapters/{id}/info` - Detailed chapter info
  - `/quran/tafsirs/{id}` - Tafsir (exegesis)
  - `/verses/random` - Random verse

### 2. AlQuran Cloud API

- **Base URL**: `https://api.alquran.cloud/v1`
- **Endpoints Used**:
  - `/juz/{number}/{edition}` - Juz data with audio

### 3. QuranJS API

- **Package**: `@quranjs/api`
- Used for additional Quran data and utilities

---

## 🎨 UI Components

Built with **Radix UI** primitives for accessibility:

- **Dialog** - Modal dialogs
- **Select** - Dropdown selections
- **Slider** - Volume and speed controls
- **Tabs** - Navigation tabs
- **Separator** - Visual dividers
- **Label** - Form labels

All components are fully customizable and theme-aware.

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mahmovdsayed/alquran-player-V2)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Your app will be live in minutes!

### Other Platforms

This Next.js app can be deployed to:

- **Netlify**
- **AWS Amplify**
- **Google Cloud Platform**
- **Azure Static Web Apps**
- **Self-hosted** with Node.js

Refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for detailed instructions.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Ensure all linting passes (`npm run lint`)

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Quran.com** for providing comprehensive Quran APIs
- **AlQuran Cloud** for audio recitation services
- **Vercel** for hosting and analytics
- **Radix UI** for accessible component primitives
- All the Qaris whose beautiful recitations are featured
- The Muslim community for continuous feedback and support

---

## 📧 Contact & Support

- **Website**: [alquran-player.vercel.app](https://alquran-player.vercel.app/)
- **GitHub**: [@Mahmovdsayed](https://github.com/Mahmovdsayed)
- **Issues**: [GitHub Issues](https://github.com/Mahmovdsayed/alquran-player-V2/issues)

---

## 🌟 Star History

If you find this project useful, please consider giving it a ⭐ on GitHub!

---

<div align="center">

**Made with ❤️ for the Muslim Ummah**

_"Indeed, it is We who sent down the Quran and indeed, We will be its guardian."_ - **Quran 15:9**

</div>
