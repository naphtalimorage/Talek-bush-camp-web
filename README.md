# Talek Bush Camp Website

## Project Overview
This project is a responsive website for Talek Bush Camp, a safari lodge located in the Maasai Mara National Reserve in Kenya. The website showcases the camp's accommodations, services, and facilities, and provides a platform for potential guests to learn about the camp and make bookings.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Component Documentation](#component-documentation)
- [Custom Hooks](#custom-hooks)
- [Styling](#styling)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Features

### Key Features
1. **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop devices
2. **Interactive UI**: Smooth animations and transitions for an engaging user experience
3. **Live Chat**: Interactive chat feature for customer support
4. **Booking System**: Form for making accommodation reservations
5. **Image Gallery**: Showcase of the camp and its surroundings
6. **Testimonials**: Customer reviews and feedback
7. **Contact Information**: Multiple ways to get in touch with the camp

### Page Sections
- **Header**: Navigation menu with smooth scrolling to different sections
- **Hero**: Main banner with call-to-action
- **About**: Information about the camp and its history
- **Accommodations & Services**: Details about room types and facilities
- **Security**: Information about safety measures
- **Gallery**: Photo gallery of the camp and surroundings
- **Testimonials**: Customer reviews
- **Booking**: Reservation form
- **Contact**: Contact information and form
- **Footer**: Additional links and information
- **Live Chat**: Interactive customer support chat

## Technologies Used

### Core Technologies
- **React**: UI library for building the user interface
- **TypeScript**: Type-safe JavaScript for better development experience
- **Vite**: Fast build tool and development server

### Styling
- **Tailwind CSS**: Utility-first CSS framework for styling
- **PostCSS**: Tool for transforming CSS with JavaScript

### UI Components
- **Lucide React**: Icon library
- **React Icons**: Additional icon library

### Development Tools
- **ESLint**: Code linting
- **TypeScript ESLint**: TypeScript-specific linting

## Project Structure

```
talek-bush-camp-web/
├── src/                  # Source code
│   ├── assets/           # Static assets (images, etc.)
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global CSS
├── public/               # Public assets
├── index.html            # HTML template
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tsconfig.app.json     # App-specific TypeScript configuration
├── tsconfig.node.json    # Node-specific TypeScript configuration
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/talek-bush-camp-web.git
   cd talek-bush-camp-web
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts
- `npm run dev`: Start the development server
- `npm run build`: Build the project for production
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint to check for code issues

## Component Documentation

### Main Components

#### Header (`Header.tsx`)
The Header component provides navigation for the website with the following features:
- Responsive design with mobile menu
- Smooth scrolling to different sections
- Active section highlighting
- Contact information display

#### Hero (`Hero.tsx`)
The main banner section with:
- Background image
- Main heading and subheading
- Call-to-action buttons

#### About (`About.tsx`)
Information about the camp including:
- Camp description
- Key features
- Location information

#### Services (`Services.tsx`)
Displays accommodations and facilities:
- Different room types with details (Safari Tent, Cottage, Family Room)
- Room features and pricing
- Camp facilities and additional services

#### Security (`Security.tsx`)
Information about safety measures at the camp.

#### Gallery (`Gallery.tsx`)
Photo gallery showcasing the camp and surroundings.

#### Testimonials (`Testimonials.tsx`)
Customer reviews and feedback.

#### Booking (`Booking.tsx`)
Reservation form for making bookings.

#### Contact (`Contact.tsx`)
Contact information and contact form.

#### Footer (`Footer.tsx`)
Additional links and information.

#### LiveChat (`LiveChat.tsx`)
Interactive customer support chat with:
- Chat window with message history
- User input field
- Quick reply options
- Automated responses
- Minimizable interface

### Utility Components

#### AnimatedSection (`AnimatedSection.tsx`)
A wrapper component that adds scroll-triggered animations to its children:
- Supports multiple animation types (slideUp, slideLeft, slideRight, fadeIn, scaleUp)
- Configurable delay and duration
- Uses the Intersection Observer API via the useScrollAnimation hook

## Custom Hooks

### useScrollAnimation
Located in `src/hooks/useScrollAnimation.ts`, this hook:
- Uses the Intersection Observer API to detect when elements are visible in the viewport
- Returns a ref to attach to the element and a boolean indicating visibility
- Supports configuration options like threshold, root margin, and trigger behavior

Usage example:
```tsx
const { elementRef, isVisible } = useScrollAnimation({
  threshold: 0.2,
  rootMargin: '0px',
  triggerOnce: true
});

// Attach the ref to an element
<div ref={elementRef}>
  {isVisible ? 'Visible' : 'Not visible'}
</div>
```

## Styling

The project uses Tailwind CSS for styling with:
- Utility-first approach for consistent design
- Responsive classes for different screen sizes
- Custom transition durations in the Tailwind configuration
- PostCSS for processing

## Configuration

### Vite Configuration
The `vite.config.ts` file configures Vite with:
- React plugin for JSX support
- Optimization settings

### TypeScript Configuration
The project uses three TypeScript configuration files:
- `tsconfig.json`: Main configuration using project references
- `tsconfig.app.json`: Configuration for application code
- `tsconfig.node.json`: Configuration for Node.js code (build scripts)

### Tailwind CSS Configuration
The `tailwind.config.js` file configures Tailwind with:
- Content paths for purging unused styles
- Extended theme with custom transition durations

## Deployment

To deploy the website:

1. Build the project:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. The built files will be in the `dist` directory, which can be deployed to any static hosting service like:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3
   - Firebase Hosting

3. For specific deployment instructions, refer to the documentation of your chosen hosting provider.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request
