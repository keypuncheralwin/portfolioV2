"use client";

import { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";


export default function Home() {
  const { theme, toggleTheme } = useTheme();

  // Handle hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Scroll to top first
      window.scrollTo(0, 0);
      
      // Then smooth scroll to the section after a brief delay
      const timer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="container">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Experience />
      <Projects />
      <Footer />
    </div>
  );
}
