"use client";
import { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');  // Track active section
  const isProgrammaticScrolling = useRef(false); // Track if scroll is from navigation click
  const scrollLockTimeout = useRef<NodeJS.Timeout | null>(null); // Timeout reference
  
  // Handle scroll event to add shadow when page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      // Add 'scrolled' class when page is scrolled down more than 50px
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when clicking a navigation item
  const handleNavClick = (elementId?: string) => {
    setMobileMenuOpen(false);
    if (elementId) {
      setActiveSection(elementId);
      
      // Set programmatic scrolling flag to true
      isProgrammaticScrolling.current = true;
      
      // Clear any existing timeout
      if (scrollLockTimeout.current) {
        clearTimeout(scrollLockTimeout.current);
      }
      
      // Scroll to the element
      document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
      
      // Set a timeout to reset the programmatic scrolling flag
      // This timeout should be long enough to allow the smooth scroll to complete
      scrollLockTimeout.current = setTimeout(() => {
        isProgrammaticScrolling.current = false;
      }, 1000); // 1 second should be enough for most smooth scrolls
    }
  };
  
  // Set active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Skip scroll detection during programmatic scrolling
      if (isProgrammaticScrolling.current) {
        return;
      }
      
      const sections = ['experience', 'projects', 'contact'];
      
      // Check which section is in view
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInView = rect.top <= 150 && rect.bottom >= 150;
          
          if (isInView) {
            setActiveSection(section);
            break;
          } else if (window.scrollY < 100) {
            setActiveSection(''); // At the top of the page
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Clear the timeout on unmount to prevent memory leaks
      if (scrollLockTimeout.current) {
        clearTimeout(scrollLockTimeout.current);
      }
    };
  }, []);  
  
  // Toggle body scroll when mobile menu is open/closed
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);
  return (
    <div className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
      <header className="header">
        <a 
          href="#" 
          className="logo" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            handleNavClick();
          }}
        >AG.</a>
        
        {/* Mobile menu button */}
        <button 
          className={`mobileMenuButton ${mobileMenuOpen ? 'open' : ''}`} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {/* Desktop and Mobile Navigation */}
        <nav className={`nav ${mobileMenuOpen ? 'mobileNavOpen' : ''}`}>
          <a 
            href="#experience" 
            className={`navItem ${activeSection === 'experience' ? 'active' : ''}`} 
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('experience');
            }}
          >
            <svg className="navIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            Experience
          </a>
          <a 
            href="#projects" 
            className={`navItem ${activeSection === 'projects' ? 'active' : ''}`} 
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('projects');
            }}
          >
            <svg className="navIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            Projects
          </a>
          <a 
            href="/Alwin_George_Resume.pdf"
            download="Alwin_George_Resume.pdf"
            className="navItem"
            onClick={() => handleNavClick()}
          >
            <svg className="navIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Resume
          </a>
          <a 
            href="#contact" 
            className={`navItem ${activeSection === 'contact' ? 'active' : ''}`} 
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
          >
            <svg className="navIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Contact
          </a>
          <button 
            onClick={toggleTheme} 
            className={`themeToggle ${theme === "dark" ? "dark" : "light"}`}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <div className="switchTrack">
              <div className="switchThumb">
                {theme === "dark" ? (
                  <svg className="sunIcon" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
                    <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4.93 4.93L6.34 6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M17.66 17.66L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M2 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M20 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M6.34 17.66L4.93 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M19.07 4.93L17.66 6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg className="moonIcon" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor"/>
                  </svg>
                )}
              </div>
            </div>
          </button>
        </nav>
        
        {/* Mobile menu overlay */}
        {mobileMenuOpen && <div className="mobileOverlay" onClick={() => setMobileMenuOpen(false)}></div>}
      </header>
    </div>
  );
}
