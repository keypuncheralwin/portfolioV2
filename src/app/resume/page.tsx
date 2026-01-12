"use client";

import { useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import html2pdf from "jspdf-html2canvas";
import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

export default function Resume() {
  const { theme, toggleTheme } = useTheme();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    
    // Track resume download event
    if (analytics) {
      logEvent(analytics, 'resume_download', {
        download_time: new Date().toISOString(),
        file_name: 'Alwin_George_Resume.pdf',
      });
    }
    
    setIsGenerating(true);
    
    // Clone the resume element for PDF generation
    const clone = resumeRef.current.cloneNode(true) as HTMLElement;
    clone.classList.add('pdf-generating');
    
    // Position clone off-screen
    clone.style.position = 'fixed';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    
    // Append to body
    document.body.appendChild(clone);
    
    try {
      await html2pdf(clone, {
        jsPDF: {
          format: 'a4',
          orientation: 'portrait',
          unit: 'mm',
        },
        imageType: 'image/jpeg',
        imageQuality: 0.95,
        margin: { top: 10, right: 10, bottom: 10, left: 10 },
        output: 'Alwin_George_Resume.pdf',
        html2canvas: {
          scale: 2,
          useCORS: true,
          width: 794, // A4 width in pixels at 96 DPI
          windowWidth: 794,
        },
        init: function(pdf) {
          pdf.setProperties({
            title: 'Alwin George - Resume',
            subject: 'Software Engineer Resume',
            author: 'Alwin George',
          });
        },
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      // Remove the clone
      document.body.removeChild(clone);
      setIsGenerating(false);
    }
  };

  return (
    <div className="container">
      <Header theme={theme} toggleTheme={toggleTheme} />
      
      {/* Download PDF Button */}
      <div className="resume-download-container">
        <button 
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="resume-download-btn"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          {isGenerating ? 'Generating PDF...' : 'Download PDF'}
        </button>
      </div>

      <div className="resume-page" ref={resumeRef}>
            {/* Header Section with Summary */}
            <header className="resume-header-section">
              <div className="resume-header-left">
                <h1 className="resume-name">Alwin George</h1>
                <p className="resume-title">Software Engineer</p>
                <div className="resume-contact-info">
                  <div>Brisbane, Australia</div>
                  <div>linkedin.com/in/alwin-george-7599271a8</div>
                  <div>alwingeorge.dev</div>
                  <div>alwingeorge11@gmail.com</div>
                  <div>0469441155</div>
                </div>
              </div>
              <div className="resume-header-right">
                <p className="resume-summary">
                  Software Engineer with strong expertise in modern JavaScript/TypeScript ecosystems. I 
                  focus on building performant, scalable applications and optimising existing systems for 
                  speed and reliability. I thrive in high responsibility environments such as leading teams, 
                  architecting scalable solutions and rapidly adapting to my team and my user's needs. My 
                  work is guided by empathy, clarity and a drive to build products that genuinely serve their 
                  users and my surrounding community.
                </p>
              </div>
            </header>

            {/* Work Experience Section */}
            <section className="resume-section">
              <h2 className="resume-section-title">Work Experience</h2>
              
              {/* Flight Centre */}
              <div className="resume-job">
                <div className="resume-job-header">
                  <h3 className="resume-job-title">Mobile Software Engineer,</h3>
                  <p className="resume-company">Flight centre travel group</p>
                  <p className="resume-date">Apr 2024 – Current</p>
                </div>
                <p className="resume-company-description">
                  At Flight Centre Travel Group (FCTG), a global leader in leisure and corporate travel retailing, I contribute to the mobile app team as a Mobile Software Engineer. I work on the flagship Flight Centre app, which has over a million downloads serving millions of users worldwide, along with apps for other FCTG brands including the recently launched World360 Rewards loyalty program app that enables earning and redeeming points on flights, hotels, cruises, tours, and more.
                </p>
                <ul className="resume-list">
                  <li>Reworked the existing Salesforce push notification implementation to ensure the user is correctly being opted in/out of the correct business units while also identifying unnecessary calls being made to the endpoint and refactoring the code to reduce the number of calls being made which in turn sped up the push notification opt in/opt out process.</li>
                  <li>Implemented an on-device logger for production and staging app builds, significantly improving debugging speed and accelerating app deployments. This self-driven initiative enhanced efficiency and streamlined issue resolution.</li>
                  <li>Optimised app performance by refactoring key components to eliminate unnecessary API calls and redundant image processing, significantly reducing operations blocking the main thread.</li>
                  <li>Collaborated with the team to rebuild the app home screen based on UX team designs, focusing on improving user navigation and engagement.</li>
                </ul>
              </div>

              {/* Liftango */}
              <div className="resume-job">
                <div className="resume-job-header">
                  <h3 className="resume-job-title">Software Engineer,</h3>
                  <p className="resume-company">Liftango</p>
                  <p className="resume-date">Sep 2022 - Mar 2024</p>
                </div>
                <p className="resume-company-description">
                  At Liftango, a leading provider of on-demand shared transport technology, I worked as a full-stack developer implementing end-to-end features for their mobile app, web dashboard, and supporting backend systems. The company helps global regions and organizations plan, launch, and scale sustainable mobility solutions using a multi-modal platform for fixed-route shuttles, demand-responsive services, carpool programs, public transport digitization, employee shuttles, and community access initiatives.
                </p>
                <ul className="resume-list">
                  <li>Optimised monthly Twilio costs by analysing SMS triggers, prioritising push notifications as the primary communication method, and reserving SMS for cases where push notifications fail. Additionally, refined SMS content to reduce character usage, further lowering expenses.</li>
                  <li>Contributed to refining the front-end, in React Native to meet evolving feature demands and enhance user experience.</li>
                  <li>Added to the back-end service, working with Express JS to update and overhaul API endpoints for new functionalities and user needs.</li>
                </ul>
              </div>

              {/* Brightspark Labs */}
              <div className="resume-job">
                <div className="resume-job-header">
                  <h3 className="resume-job-title">Software Engineer,</h3>
                  <p className="resume-company">Brightspark Labs</p>
                  <p className="resume-date">Jan 2022 – Aug 2022</p>
                </div>
                <p className="resume-company-description">
                  At brightSPARK Labs, a software development agency specializing in high stakes solutions for government and defence clients, I worked as a full-stack developer. The company delivers mission critical projects, including accredited Defence networks with virtualized infrastructure, SharePoint document management, HP Quality Center testing, continuous integration, and scalable services supporting up to 200 virtual machines.
                </p>
                <ul className="resume-list">
                  <li>Contributed to the development of an enhanced prototype for the existing node graph visualiser using React Fiber, enabling finer control over every aspect of the 3D graph due to the limited flexibility of the react-force-graph library.</li>
                  <li>Enhanced the in-house codebase by contributing to the Angular front end and Java-based Dropwizard backend, resulting in improved application performance.</li>
                  <li>Simplified software setup with bash scripts that automated configuration and reduced execution time enhancing efficiency and ease of use, fostering a collaborative work environment.</li>
                </ul>
              </div>

              {/* Ipau */}
              <div className="resume-job">
                <div className="resume-job-header">
                  <h3 className="resume-job-title">I.T Client Relations Consultant,</h3>
                  <p className="resume-company">Ipau</p>
                  <p className="resume-date">Jan 2021 – Jan 2022</p>
                </div>
                <p className="resume-company-description">
                  At Ipau, an IT services provider with nearly two decades of experience across education, defence, manufacturing, and logistics, I worked as an IT Specialist providing support for multiple primary schools.
                </p>
                <ul className="resume-list">
                  <li>Managed IT operations for multiple primary schools, administering servers, networks, and overall IT infrastructure while optimizing workflows through scripting.</li>
                  <li>Delivered effective onsite and remote technical support for various IT issues.</li>
                </ul>
              </div>
            </section>

            {/* Education Section */}
            <section className="resume-section resume-page-break">
              <h2 className="resume-section-title">Education</h2>
              
              {/* General Assembly */}
              <div className="resume-job">
                <div className="resume-job-header">
                  <h3 className="resume-job-title">Software Engineering,</h3>
                  <p className="resume-company">General Assembly Bootcamp</p>
                  <p className="resume-date">Jun 2021 - Dec 2021</p>
                </div>
                <ul className="resume-list">
                  <li>Developed a full-stack web application using React for the front end and Express.js for the backend as part of the final project, a web app that allows users to create and vote on polls</li>
                  <li>Developed a ticket managing system with flask a lightweight python back-end framework utilising it's jinja templating engine for the front end</li>
                </ul>
              </div>

              {/* James Cook University */}
              <div className="resume-job">
                <div className="resume-job-header">
                  <h3 className="resume-job-title">Bachelor of Information Technology,</h3>
                  <p className="resume-company">James Cook University</p>
                  <p className="resume-date">2018 – 2020</p>
                </div>
                <ul className="resume-list">
                  <li>Engaged in annual 3-day sprints, working alongside local subject matter experts to create and showcase an MVP solution to a panel of SMEs, achieving 2nd place in the final year with our disaster relief live chatbot prototype.</li>
                  <li>Developed a task management system in Android Studio with Java, featuring intuitive user interfaces for streamlined task organisation, prioritisation, and management, including functionalities for adding, editing, and deleting tasks.</li>
                </ul>
              </div>
            </section>

            {/* Technical Skills Section */}
            <section className="resume-section">
              <h2 className="resume-section-title">Technical Skills</h2>
              <div className="resume-skills">
                <div className="resume-skill-group">
                  <span className="resume-skill">HTML/CSS</span>
                  <span className="resume-skill">JavaScript/Typescript</span>
                  <span className="resume-skill">Python</span>
                  <span className="resume-skill">C#</span>
                  <span className="resume-skill">React Js</span>
                  <span className="resume-skill">React Native</span>
                  <span className="resume-skill">Node.js</span>
                  <span className="resume-skill">Flask</span>
                  <span className="resume-skill">Postgres (SQL)</span>
                  <span className="resume-skill">MongoDB</span>
                  <span className="resume-skill">Sequelize</span>
                  <span className="resume-skill">Unit/End-to-end testing (Jest/Cypress)</span>
                  <span className="resume-skill">Responsive Design</span>
                  <span className="resume-skill">GitHub Actions/Workflows</span>
                  <span className="resume-skill">Agile Methodologies</span>
                  <span className="resume-skill">Docker</span>
                  <span className="resume-skill">Containerization</span>
                  <span className="resume-skill">Database Management</span>
                </div>
              </div>
            </section>
          </div>
      <Footer />
    </div>
  );
}
