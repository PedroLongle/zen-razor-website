# 🌟 Zen Razor - Premium Barbershop Website

A modern, full-featured barbershop website built with Next.js 15, featuring appointment booking, service management, and location services. Perfect for barbershops looking to establish a professional online presence.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.0-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-11.6.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

## ✨ Features

### 🎯 Core Features
- **Appointment Booking System**: Full-featured appointment scheduling with date/time selection
- **Service Management**: Display services with descriptions, durations, and pricing
- **Barber Profiles**: Meet the team section with individual barber profiles
- **Contact Forms**: Customer inquiries and feedback management
- **Interactive Maps**: Google Maps integration with custom styling
- **Responsive Design**: Mobile-first responsive design for all devices

### 🛠️ Technical Features
- **Modern Stack**: Built with Next.js 15 and React 19
- **Type Safety**: Full TypeScript implementation
- **Form Validation**: React Hook Form with Yup schema validation
- **State Management**: Custom hooks for Firebase integration
- **Performance**: Optimized with Next.js App Router and Turbopack
- **Dark Theme**: Custom dark mode support with Tailwind CSS
- **Accessibility**: WCAG compliant components and navigation
- **Internationalization**: Multi-language support with next-intl

### 🎨 UI/UX Features
- **Modern Design**: Clean, professional barbershop aesthetic
- **Custom Icons**: Lucide React icon library integration
- **Smooth Animations**: CSS animations with tw-animate-css
- **Loading States**: Elegant loading components and skeletons
- **Error Handling**: User-friendly error messages and validation
- **Language Switching**: Dynamic language selector with 5 supported languages

## 🌍 Internationalization

This project includes comprehensive internationalization support using **next-intl**, supporting 5 languages:

### Supported Languages
- 🇺🇸 **English** (en) - Default
- 🇵🇹 **Portuguese** (pt)
- 🇪🇸 **Spanish** (es)
- 🇫🇷 **French** (fr)
- 🇩🇪 **German** (de)

### Implementation Details

#### Language Configuration
The internationalization is configured in `src/i18n/request.ts`:

```typescript
import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'pt', 'es', 'fr', 'de'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async () => {
  const locale = 'en'; // Default locale
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
```

#### Translation Files
Translation messages are stored in JSON files under `src/messages/`:
- `src/messages/en.json` - English translations
- `src/messages/pt.json` - Portuguese translations
- `src/messages/es.json` - Spanish translations
- `src/messages/fr.json` - French translations
- `src/messages/de.json` - German translations

#### Language Context
The application uses a custom `LanguageProvider` (`src/contexts/language-context.tsx`) that:
- Manages the current locale state
- Loads translation messages dynamically
- Persists language preference in localStorage
- Provides fallback to English if a locale fails to load

#### Using Translations in Components

**Custom Hook Approach:**
```typescript
import { useTranslations } from '@/hooks/use-translations';

function MyComponent() {
  const t = useTranslations('navigation');
  
  return (
    <nav>
      <a href="/">{t('home')}</a>
      <a href="/about">{t('about')}</a>
      <a href="/services">{t('services')}</a>
    </nav>
  );
}
```

**With Parameters:**
```typescript
const t = useTranslations('footer');
const currentYear = new Date().getFullYear();

return <p>{t('copyright', { year: currentYear })}</p>;
```

#### Language Selector Component
The `LanguageSelector` component (`src/components/language-selector.tsx`) provides:
- Dropdown interface with country flags
- Instant language switching
- Persistent language selection
- Visual feedback for current language

### Adding New Languages

1. **Add locale to configuration:**
```typescript
// src/i18n/request.ts
export const locales = ['en', 'pt', 'es', 'fr', 'de', 'it'] as const; // Add 'it'
```

2. **Create translation file:**
```bash
# Create new translation file
cp src/messages/en.json src/messages/it.json
# Translate all strings in the new file
```

3. **Update language selector:**
```typescript
// src/components/language-selector.tsx
const languages = [
  // ... existing languages
  { code: 'it' as Locale, name: 'Italiano', flag: '🇮🇹' },
];
```

### Translation Structure
Each translation file follows a nested structure:

```json
{
  "navigation": {
    "home": "Home",
    "about": "About Us",
    "services": "Services"
  },
  "hero": {
    "title": "Zen Razor",
    "subtitle": "Premium Barbershop",
    "description": "Experience the art of traditional barbering..."
  },
  "common": {
    "loading": "Loading...",
    "error": "Something went wrong..."
  }
}
```

### Best Practices
- **Namespace organization**: Group related translations (e.g., `navigation`, `hero`, `services`)
- **Consistent keys**: Use descriptive, consistent naming for translation keys
- **Fallback handling**: Always provide English fallbacks for missing translations
- **Parameter interpolation**: Use `{paramName}` syntax for dynamic content
- **Context awareness**: Consider cultural context, not just literal translation

## 🚀 Technologies

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | Next.js | 15.3.0 | React framework with App Router |
| **Frontend** | React | 19.0.0 | UI library with latest features |
| **Language** | TypeScript | 5.0 | Type-safe JavaScript |
| **Styling** | Tailwind CSS | 4.0 | Utility-first CSS framework |
| **Backend** | Firebase | 11.6.0 | Authentication, database, hosting |
| **Forms** | React Hook Form | 7.55.0 | Form state management |
| **Validation** | Yup | 1.6.1 | Schema validation |
| **Maps** | Google Maps API | 2.20.6 | Location services |
| **Icons** | Lucide React | 0.487.0 | Modern icon library |
| **Components** | Custom + CVA | - | Reusable component system |
| **Internationalization** | next-intl | Latest | Multi-language support |

## 📁 Project Structure

```
zen-razor/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with navigation
│   │   ├── page.tsx            # Homepage with hero section
│   │   ├── about/              # About us page
│   │   ├── appointments/       # Appointment booking page
│   │   ├── contact/            # Contact page
│   │   ├── team/               # Team members page
│   │   └── globals.css         # Global styles
│   ├── components/             # Reusable UI components
│   │   ├── forms/              # Form input components
│   │   ├── google-maps/        # Map components
│   │   ├── services/           # Service-related components
│   │   ├── navbar.tsx          # Navigation component
│   │   ├── footer.tsx          # Footer component
│   │   └── loading.tsx         # Loading states
│   ├── forms/                  # Form implementations
│   │   ├── appointment/        # Appointment booking form
│   │   └── contact/            # Contact form
│   ├── hooks/                  # Custom React hooks
│   ├── model/                  # TypeScript interfaces/types
│   └── utils.ts                # Utility functions
├── public/                     # Static assets
│   ├── images/                 # Images and illustrations
│   └── fonts/                  # Custom fonts
├── apphosting.yaml             # Firebase App Hosting config
├── .firebaserc                 # Firebase project config
└── package.json                # Dependencies and scripts
```

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: 18.17.0 or later
- **Google Maps API Key**: For maps functionality
- **Firebase Project**: For backend services

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/zen-razor.git
cd zen-razor

# Install dependencies
npm install

# Start development server with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔥 Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project named "zen-razor"
3. Enable Firestore Database
4. Set up authentication (if needed)

### 2. Google Maps Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Maps JavaScript API and Places API
3. Create an API key and restrict it to your domain
4. Add the API key to your environment variables

### 3. Deploy to Firebase

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy to Firebase App Hosting
firebase deploy
```

## 📝 Available Scripts

```bash
# Development with Turbopack (faster)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🎨 Customization

### Styling
- **Colors**: Modify `src/app/globals.css` for custom color schemes
- **Components**: Update components in `src/components/` directory
- **Layout**: Customize `src/app/layout.tsx` for different layouts

### Content
- **Services**: Update service data in the appropriate components
- **Team**: Modify barber profiles and images
- **Contact**: Update business information and contact details

### Maps
- **Styling**: Customize map theme in `src/components/google-maps/map.tsx`
- **Location**: Update default coordinates and business location

## 🚀 Deployment

### Firebase App Hosting (Recommended)
```bash
firebase deploy
```

### Vercel
```bash
npm run build
# Deploy to Vercel via dashboard or CLI
```

### Other Platforms
The project supports deployment to any platform that supports Next.js applications.

## 🔧 Performance Optimizations

- **Turbopack**: Lightning-fast development builds
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Static Generation**: Pre-rendered pages for better SEO
- **TypeScript**: Compile-time error checking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Firebase** - For backend infrastructure
- **Google Maps** - For location services
- **React Hook Form** - For form management
- **Lucide** - For beautiful icons

---
