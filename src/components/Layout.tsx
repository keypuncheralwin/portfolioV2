"use client";

import { ReactNode, useEffect, useState, ReactElement } from 'react';

type ThemeType = "light" | "dark";

interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
}

type LayoutChildren = ReactNode | ((props: ThemeContextProps) => ReactElement);

interface LayoutProps {
  children: LayoutChildren;
}

export default function Layout({ children }: LayoutProps) {
  const [theme, setTheme] = useState<ThemeType>("light");

  // Initialize theme based on user preference or system preference
  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme as ThemeType);
    } else {
      // Default to light theme if no saved preference
      setTheme("light");
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    // Store in localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="container">
      {/* Pass theme and toggleTheme to children that need it */}
      {typeof children === 'function' 
        ? (children as (props: ThemeContextProps) => ReactElement)({ theme, toggleTheme }) 
        : children}
    </div>
  );
}
