"use client";

import { useState, useRef, useEffect } from 'react';

interface ExperienceData {
  company: string;
  role: string;
  period: string;
  location: string;
  responsibilities: string[];
}

export default function Experience() {
  const [activeCompany, setActiveCompany] = useState<string>("Selfbook");

  const experienceData: Record<string, ExperienceData> = {
    "Selfbook": {
      company: "Selfbook",
      role: "Software Developer (Remote)",
      period: "Jun 2021 - Present",
      location: "Selfbook / US - New York",
      responsibilities: [
        "Developing screens and UI components for the web application using React and Tailwind.",
        "Fixing UI issues and integrating backend APIs with Redux Saga.",
        "Collaborating with the design team to implement pixel-perfect interfaces.",
        "Building reusable components and maintaining code quality standards."
      ]
    },
    "Wevoz": {
      company: "Wevoz",
      role: "Frontend Engineer",
      period: "Mar 2020 - May 2021",
      location: "Wevoz / Canada - Remote",
      responsibilities: [
        "Led the development of an interactive dashboard using Vue.js and D3 for data visualization.",
        "Implemented responsive designs across multiple devices and browsers.",
        "Optimized application performance, reducing load time by 40%.",
        "Mentored junior developers and conducted code reviews."
      ]
    },
    "FreeBeings": {
      company: "FreeBeings",
      role: "UI/UX Developer",
      period: "Sep 2019 - Feb 2020",
      location: "FreeBeings / Australia - Sydney",
      responsibilities: [
        "Created prototypes and wireframes for mobile applications using Figma.",
        "Implemented user interfaces with React Native for cross-platform compatibility.",
        "Conducted user testing sessions and incorporated feedback into design iterations.",
        "Collaborated with backend developers to ensure seamless API integration."
      ]
    },
    "TDF": {
      company: "TDF",
      role: "Full Stack Developer",
      period: "Jan 2019 - Aug 2019",
      location: "TDF / UK - London (Remote)",
      responsibilities: [
        "Developed and maintained RESTful APIs using Node.js and Express.",
        "Built responsive frontends with React and styled-components.",
        "Implemented authentication and authorization systems using JWT.",
        "Deployed applications using Docker and AWS services."
      ]
    },
    "Upwork": {
      company: "Upwork",
      role: "Freelance Developer",
      period: "Jun 2018 - Dec 2018",
      location: "Upwork / Worldwide - Remote",
      responsibilities: [
        "Completed over 15 projects for clients across diverse industries.",
        "Developed e-commerce solutions using Shopify and custom integrations.",
        "Created custom WordPress themes and plugins for small businesses.",
        "Maintained high client satisfaction with 100% positive feedback."
      ]
    },
    "Shoppy": {
      company: "Shoppy",
      role: "Junior Web Developer",
      period: "Jan 2018 - May 2018",
      location: "Shoppy / Singapore - Singapore",
      responsibilities: [
        "Assisted in maintaining and updating the company's e-commerce platform.",
        "Fixed bugs and implemented minor features under senior guidance.",
        "Participated in daily stand-ups and sprint planning meetings.",
        "Gained experience with agile development methodologies."
      ]
    }
  };

  // Refs for the sliding highlight animation
  const tabsRef = useRef<Record<string, HTMLDivElement | null>>({});
  const highlightRef = useRef<HTMLDivElement | null>(null);

  // Update the highlight position when the active company changes
  useEffect(() => {
    const activeTab = tabsRef.current[activeCompany];
    const highlight = highlightRef.current;
    
    if (activeTab && highlight) {
      // For desktop (vertical tabs)
      if (window.innerWidth > 768) {
        highlight.style.transform = `translateY(${activeTab.offsetTop}px)`;
        highlight.style.height = `${activeTab.offsetHeight}px`;
        highlight.style.width = '2px';
        highlight.style.left = '0';
        highlight.style.top = '0';
      } 
      // For mobile (horizontal tabs)
      else {
        highlight.style.transform = `translateX(${activeTab.offsetLeft}px)`;
        highlight.style.width = `${activeTab.offsetWidth}px`;
        highlight.style.height = '2px';
        highlight.style.left = '0';
        highlight.style.top = 'auto';
        highlight.style.bottom = '0px';
      }
    }
  }, [activeCompany]);

  // Update highlight position on window resize
  useEffect(() => {
    const handleResize = () => {
      const activeTab = tabsRef.current[activeCompany];
      const highlight = highlightRef.current;
      
      if (activeTab && highlight) {
        if (window.innerWidth > 768) {
          highlight.style.transform = `translateY(${activeTab.offsetTop}px)`;
          highlight.style.height = `${activeTab.offsetHeight}px`;
          highlight.style.width = '2px';
          highlight.style.left = '0';
          highlight.style.top = '0';
        } else {
          highlight.style.transform = `translateX(${activeTab.offsetLeft}px)`;
          highlight.style.width = `${activeTab.offsetWidth}px`;
          highlight.style.height = '2px';
          highlight.style.left = '0';
          highlight.style.top = 'auto';
          highlight.style.bottom = '0px';
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeCompany]);

  const handleCompanyClick = (company: string) => {
    setActiveCompany(company);
  };

  const activeData = experienceData[activeCompany];

  return (
    <section className="experience" id="experience">
      <h2 className="sectionTitle">Where I've Worked</h2>
      
      <div className="experienceContainer">
        <div className="experienceCompaniesScroll">
          <div className="experienceCompanies">
            {/* Animated highlight that slides to active tab */}
            <div 
              ref={highlightRef} 
              className="tabHighlight"
            />
            
            {Object.keys(experienceData).map((company) => (
              <div 
                key={company}
                ref={(el: HTMLDivElement | null) => { tabsRef.current[company] = el; }}
                className={`companyTab ${activeCompany === company ? 'active' : ''}`}
                onClick={() => handleCompanyClick(company)}
              >
                {company}
              </div>
            ))}
          </div>
        </div>
        
        <div className="experienceDetails">
          <div className="roleHeader">
            <h3 className="roleTitle">{activeData.role}</h3>
            <p className="rolePeriod">{activeData.period}</p>
          </div>
          
          <p className="companyInfo">{activeData.location}</p>
          
          <ul className="responsibilities">
            {activeData.responsibilities.map((responsibility, index) => (
              <li key={index}>
                <span className="bulletPoint">›</span> {responsibility}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
