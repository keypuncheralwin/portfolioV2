# Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js and React. This portfolio showcases projects, work experience, and includes advanced features like HTML to PDF resume generation and Firebase Analytics integration.

## Features

- **Responsive Design**: Fully optimized for all device sizes with mobile-first approach
- **Dark/Light Mode**: Theme toggle with system preference detection and persistent storage
- **Project Showcase**: Modal system for previewing projects with:
  - Image previews
  - YouTube video embeds
  - Google Drive video embeds
- **Interactive Tabbed Sections**: Reusable component used in both Experience and Projects sections
- **Contact Modal**: Quick contact modal with:
  - Email and phone display
  - One-click copy to clipboard functionality
  - Mobile-optimized layout
- **ATS-Compliant Resume PDF**: 
  - Built with `@react-pdf/renderer` for native text generation
  - Ensures perfect parsing by Applicant Tracking Systems (ATS)
  - Accessible, vector-based text output
  - Automatic page breaks and layout management
  - High-quality A4 format export
- **Firebase Analytics Integration**:
  - Production-only tracking to keep analytics data clean
  - Page view tracking across all routes
  - Resume download event tracking
  - Privacy-focused with URL-based opt-out (`?notrack` / `?yestrack`)
  - localStorage persistence for tracking preferences
- **Smooth Scrolling**: Enhanced navigation experience
- **Loading States**: Custom skeleton loader components with animations

## Technology Stack

- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: CSS with CSS Variables for theming
- **PDF Generation**: @react-pdf/renderer
- **Analytics**: Firebase Analytics
- **Deployment**: Vercel 

## Getting Started

### Prerequisites

- Node.js (v22.x recommended)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## Project Structure

```
/src
  /app            # Next.js app directory (pages and layouts)
  /components     # React components
  /contexts       # React context providers (ThemeContext)
  /lib            # Utility libraries (Firebase config)
  /styles         # Global CSS styles
  /svgs           # SVG icon components
/public           # Static assets
```

## Key Components

- **FirebaseAnalytics**: Handles page view tracking and analytics initialization
- **ContactModal**: Reusable modal for displaying contact information
- **Hero**: Landing section with contact modal integration
- **Projects**: Tabbed project showcase with modal previews
- **Experience**: Work history with tabbed interface
- **Resume**: HTML to PDF resume generator page

## Configuration

### Firebase Analytics Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Add your Firebase config to `/src/lib/firebase.ts`
3. Analytics will only track in production builds

### Customization

1. Update personal information in components (Hero, Resume, etc.)
2. Replace project details in `/src/components/Projects.tsx`
3. Modify work experience in `/src/components/Experience.tsx`
4. Update contact information in `/src/components/ContactModal.tsx`
5. Customize theme colors in `/src/styles/main.css` (CSS variables)

## Deployment

This portfolio is optimized for deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Deploy with default settings
4. Firebase Analytics will automatically activate in production

### Build Commands

```bash
npm run build    # Build for production
npm run start    # Start production server
npm run dev      # Start development server with Turbopack
```

## Privacy & Analytics

The portfolio includes privacy-focused analytics:

- **Disable tracking**: Visit `https://alwingeorge.dev?notrack` to opt-out
- **Enable tracking**: Visit `https://alwingeorge.dev?yestrack` to opt-in
- Preference is saved in localStorage and persists across sessions
- Analytics only runs in production (not during development)

## License

MIT
