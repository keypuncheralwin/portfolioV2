"use client";

import { useState } from 'react';
import TabbedSection from './TabbedSection';
import Modal from './Modal';
import SkeletonLoader from './SkeletonLoader';

interface ExperienceData {
  company: string;
  role: string;
  period: string;
  location: string;
  description?: string;
  responsibilities: string[];
  clickableTerms?: Record<string, {
    term: string;
    mediaType: 'image' | 'youtube' | 'gdrive';
    mediaSrc: string;
    altText?: string;
    modalTitle?: string;
  }>;
}

export default function Experience() {
  const [activeCompany, setActiveCompany] = useState<string>("FlightCentre");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPreview, setCurrentPreview] = useState<{
    title: string;
    mediaType: 'image' | 'youtube' | 'gdrive';
    mediaSrc: string;
    altText?: string;
  } | null>(null);
  const [isMediaLoading, setIsMediaLoading] = useState(true);

  const experienceData: Record<string, ExperienceData> = {
    "FlightCentre": {
      company: "Flight Centre Travel Group",
      role: "Mobile Software Engineer",
      period: "Apr 2024 - Current",
      location: "Flight Centre Travel Group",
      description: "At Flight Centre Travel Group (FCTG), a global leader in leisure and corporate travel retailing, I contribute to the mobile app team as a Mobile Software Engineer. I work on the flagship Flight Centre app, which has over a million downloads serving millions of users worldwide, along with apps for other FCTG brands including the recently launched World360 Rewards loyalty program app that enables earning and redeeming points on flights, hotels, cruises, tours, and more.",
      responsibilities: [
        "Reworked the existing Salesforce push notification implementation to ensure the user is correctly being opted in/out of the correct business units while also identifying unnecessary calls being made to the endpoint and refactoring the code to reduce the number of calls being made which in turn sped up the push notification opt in/opt out process.",
        "Implemented an on-device logger for production and staging app builds, significantly improving debugging speed and accelerating app deployments. This self-driven initiative enhanced efficiency and streamlined issue resolution.",
        "Optimised app performance by refactoring key components to eliminate unnecessary API calls and redundant image processing, significantly reducing operations blocking the main thread.",
        "Collaborated with the team to rebuild the app home screen based on UX team designs, focusing on improving user navigation and engagement."
      ],
      clickableTerms: {
        "logger": {
          term: "on-device logger",
          mediaType: "image",
          mediaSrc: "/images/on-device-logger.jpg", 
          altText: "On-device logger screenshot",
          modalTitle: "Flight Centre On-Device Logger"
        }
      }
    },
    "Liftango": {
      company: "Liftango",
      role: "Full Stack Developer",
      period: "Sep 2022 - Mar 2024",
      location: "Liftango",
      description: "At Liftango, a leading provider of on-demand shared transport technology, I worked as a full-stack developer implementing end-to-end features for their mobile app, web dashboard, and supporting backend systems. The company helps global regions and organizations plan, launch, and scale sustainable mobility solutions using a multi-modal platform for fixed-route shuttles, demand-responsive services, carpool programs, public transport digitization, employee shuttles, and community access initiatives.",
      responsibilities: [
        "Optimised monthly Twilio costs by analysing SMS triggers, prioritising push notifications as the primary communication method, and reserving SMS for cases where push notifications fail. Additionally, refined SMS content to reduce character usage, further lowering expenses.",
        "Contributed to refining the front-end, in React Native to meet evolving feature demands and enhance user experience.",
        "Added to the back-end service, working with Express JS to update and overhaul API endpoints for new functionalities and user needs."
      ]
    },
    "Brightspark": {
      company: "Brightspark Labs",
      role: "Full Stack Developer",
      period: "Jan 2022 - Aug 2022",
      location: "Brightspark Labs",
      description: "At brightSPARK Labs, a software development agency specializing in high stakes solutions for government and defence clients, I worked as a full-stack developer. The company delivers mission critical projects, including accredited Defence networks with virtualized infrastructure, SharePoint document management, HP Quality Center testing, continuous integration, and scalable services supporting up to 200 virtual machines.",
      responsibilities: [
        "Contributed to the development of an enhanced prototype for the existing node graph visualiser using React Fiber, enabling finer control over every aspect of the 3D graph due to the limited flexibility of the react-force-graph library.",
        "Enhanced the in-house codebase by contributing to the Angular front end and Java-based Dropwizard backend, resulting in improved application performance.",
        "Simplified software setup with bash scripts that automated configuration and reduced execution time enhancing efficiency and ease of use, fostering a collaborative work environment."
      ]
    },
    "Ipau": {
      company: "Ipau",
      role: "I.T Client Relations Consultant",
      period: "Jan 2021 - Jan 2022",
      location: "Ipau",
      description: "At Ipau, an IT services provider with nearly two decades of experience across education, defence, manufacturing, and logistics, I worked as an IT Specialist providing support for multiple primary schools.",
      responsibilities: [
        "Managed IT operations for multiple primary schools, administering servers, networks, and overall IT infrastructure while optimizing workflows through scripting.",
        "Delivered effective onsite and remote technical support for various IT issues."
      ]
    }
  };

  // Helper function to parse text and make terms clickable
  const renderTextWithClickableTerms = (text: string, terms?: Record<string, {
    term: string;
    mediaType: 'image' | 'youtube' | 'gdrive';
    mediaSrc: string;
    altText?: string;
    modalTitle?: string;
  }>) => {
    if (!terms) return text;
    
    // Create parts array by finding and splitting on each term
    let result = text;
    
    Object.entries(terms).forEach(([key, { term }]) => {
      const parts = result.split(term);
      if (parts.length > 1) {
        result = parts.join(
          `<span class="clickable-term" data-term="${key}">${term}</span>`
        );
      }
    });
    
    return (
      <span 
        dangerouslySetInnerHTML={{ __html: result }} 
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.classList.contains('clickable-term')) {
            const termKey = target.getAttribute('data-term');
            if (termKey && terms[termKey]) {
              const { term, mediaType, mediaSrc, altText, modalTitle } = terms[termKey];
              setCurrentPreview({
                title: modalTitle || term,
                mediaType,
                mediaSrc,
                altText
              });
              setIsMediaLoading(true);
              setIsModalOpen(true);
            }
          }
        }}
      />
    );
  };

  return (
    <section className="experience" id="experience">
      <h2 className="sectionTitle">Experience</h2>
      <TabbedSection
        tabs={Object.keys(experienceData)}
        activeTab={activeCompany}
        setActiveTab={setActiveCompany}
        renderContent={(company) => {
          const data = experienceData[company];
          return (
            <>
              <div className="roleHeader">
                <h3 className="roleTitle">{data.role}</h3>
                <p className="rolePeriod">{data.period}</p>
              </div>
              <p className="companyInfo">{data.location}</p>
              {data.description && (
                <p className="companyDescription">{data.description}</p>
              )}
              <ul className="responsibilities">
                {data.responsibilities.map((responsibility, index) => (
                  <li key={index}>
                    <span className="bulletPoint">›</span> {
                      data.clickableTerms 
                        ? renderTextWithClickableTerms(responsibility, data.clickableTerms)
                        : responsibility
                    }
                  </li>
                ))}
              </ul>
            </>
          );
        }}
        className=""
        tabClassName=""
        highlightClassName="tabHighlight"
        id="experience-tabs"
      />
      
      {/* Preview Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          // Reset loading state when modal closes
          setTimeout(() => setIsMediaLoading(true), 300);
        }}
        title={currentPreview?.title}
      >

        <div className="mediaContainer">
          {/* Skeleton loader */}
          {isMediaLoading && currentPreview?.mediaType && (
            <SkeletonLoader 
              type={currentPreview.mediaType === 'image' ? 'image' : 'video'} 
            />
          )}
          
          {/* Image rendering */}
          {currentPreview?.mediaType === 'image' && currentPreview?.mediaSrc && (
            <div className="image-container" style={{ 
              position: 'relative',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <img 
                src={currentPreview.mediaSrc} 
                alt={currentPreview.altText || currentPreview.title} 
                loading="eager"
                style={{
                  maxWidth: '100%',
                  maxHeight: '650px',
                  display: isMediaLoading ? 'none' : 'block',
                  objectFit: 'contain'
                }}
                onLoad={() => setIsMediaLoading(false)}
                onError={() => setIsMediaLoading(false)}
              />
            </div>
          )}
          {currentPreview?.mediaType === 'youtube' && currentPreview?.mediaSrc && (
            <iframe 
              src={`https://www.youtube.com/embed/${currentPreview.mediaSrc}`} 
              title={currentPreview.title}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="videoFrame"
              style={{ display: isMediaLoading ? 'none' : 'block' }}
              onLoad={() => setIsMediaLoading(false)}
            ></iframe>
          )}
          {currentPreview?.mediaType === 'gdrive' && currentPreview?.mediaSrc && (
            <iframe 
              src={`https://drive.google.com/file/d/${currentPreview.mediaSrc}/preview`} 
              title={currentPreview.title}
              frameBorder="0"
              allow="autoplay" 
              allowFullScreen
              className="videoFrame"
              style={{ display: isMediaLoading ? 'none' : 'block' }}
              onLoad={() => setIsMediaLoading(false)}
            ></iframe>
          )}
        </div>
      </Modal>
    </section>
  );
}
