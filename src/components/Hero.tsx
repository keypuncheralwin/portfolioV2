"use client";

import { useState } from 'react';
import ContactModal from './ContactModal';

export default function Hero() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <section className="hero">
        <div className="heroContent">
          <p className="intro">Hey, my name is</p>
          <h1 className="name">
            <span>Alwin George</span>
          </h1>
          
          <div className="bioWrapper">
            <p className="bio">
              I'm a Software Engineer with strong expertise in modern JavaScript/TypeScript ecosystems. I focus on building performant, scalable applications and optimising existing systems for speed and reliability.
              <br />
              I thrive in high-responsibility environments, including leading teams, architecting scalable solutions, and rapidly adapting to both team and user needs.
              <br />
              My work is guided by empathy, clarity, and a drive to build products that genuinely serve their users and the wider community.
            </p>
          </div>

          <div className="socialLinks">
            <a href="https://www.linkedin.com/in/alwin-george-7599271a8/" target="_blank" rel="noopener noreferrer" className="socialIconLink">
              <svg className="socialIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="https://github.com/keypuncheralwin" target="_blank" rel="noopener noreferrer" className="socialIconLink">
              <svg className="socialIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 19C4.7 20.4 4.7 16.5 3 16M15 21V17.5C15 16.5 15.1 16.1 14.5 15.5C17.3 15.2 20 14.1 20 9.5C19.9988 8.30564 19.5325 7.15578 18.7 6.3C19.0905 5.26264 19.0545 4.11812 18.6 3.1C18.6 3.1 17.5 2.8 15.6 4C13.9 3.5 12.1 3.5 10.4 4C8.5 2.8 7.4 3.1 7.4 3.1C6.94548 4.11812 6.90947 5.26264 7.3 6.3C6.46745 7.15578 6.00122 8.30564 6 9.5C6 14.1 8.7 15.2 11.5 15.5C10.9 16.1 10.8 16.7 10.8 17.5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <button 
              onClick={() => setIsContactModalOpen(true)} 
              className="socialIconLink"
              aria-label="Contact"
            >
              <svg className="socialIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
}
