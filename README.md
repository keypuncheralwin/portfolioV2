# Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js and React. This portfolio showcases projects, work experience, and provides a contact form for visitors to get in touch.
## Features

- **Responsive Design**: Fully optimized for all device sizes
- **Dark/Light Mode**: Theme toggle with user preference detection
- **Project Showcase**: Modal system for previewing projects with:
  - Image previews
  - YouTube video embeds
  - Google Drive video embeds
- **Interactive Tabbed Sections**: Reusable component used in both Experience and Projects sections
- **Contact Form**: Integrated with Formspree for easy form submission handling
- **Resume Download**: Direct download option for resume/CV
- **Smooth Scrolling**: Enhanced navigation experience
- **Loading States**: Custom skeleton loader components with animations
- **Visitor Analytics**: Admin dashboard with custom detailed visitor tracking:
  - Location tracking (city/country)
  - Platform detection (Windows/Mac/Linux)
  - Device type analysis (mobile/desktop)
  - Referrer source tracking
  - Password-protected admin interface

## Technology Stack

- **Framework**: Next.js (React)
- **Styling**: CSS Modules
- **Form Handling**: Formspree
- **Animations**: CSS Keyframes
- **Deployment**: Vercel 

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
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
  /components     # React components
  /styles         # CSS modules and global styles
  /public         # Static assets
  /pages          # Next.js pages
```

## Customization

1. Update the personal information in appropriate components
2. Replace project images and details in the Projects component
3. Modify the experience details in the Experience component
4. Update the contact form endpoint in the Contact component (Formspree)

## Deployment

This portfolio is optimized for deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Deploy with default settings

Alternatively, you can deploy to any static site host:

```bash
npm run build
npm run export
```

Then deploy the generated `out` directory.

## License

MIT
