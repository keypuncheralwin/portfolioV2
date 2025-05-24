"use client";

import { useState } from 'react';
import TabbedSection from './TabbedSection';
import Modal from './Modal';
import SkeletonLoader from './SkeletonLoader';
import ClarifyIcon from '../svgs/ClarifyIcon';
import ProNotesIcon from '../svgs/ProNotes';

interface ProjectData {
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  githubUrl?: string;
  previewUrl?: string;
  icon?: React.ReactNode; 
  mediaType?: 'image' | 'youtube' | 'gdrive'; 
  mediaSrc?: string; 
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<string>("Clarify");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPreview, setCurrentPreview] = useState<ProjectData | null>(null);
  const [isMediaLoading, setIsMediaLoading] = useState(true);

  const projectsData: Record<string, ProjectData> = {
    "Clarify": {
      title: "Clarify",
      description: "A mobile app to combat online clickbait that allows users to share content directly from their browser or YouTube. It analyzes articles and videos in a bottom sheet without interrupting the browsing experience, helping users make informed decisions",
      technologies: ["Flutter", "Firebase", "Open AI API", "Express.js", "TypeScript", "Cloud Functions"],
      features: [
        "Content analysis with clarity score (0-10) for articles and YouTube videos",
        "Headline evaluation comparing content with title/thumbnail accuracy",
        "Concise summarization of key points from complex content",
        "User history management for previously analyzed content"
      ],
      previewUrl: "#",
      githubUrl: "https://github.com/keypuncheralwin/clarify-mono-repo",
      icon: <ClarifyIcon width={40} height={40} />,
      mediaType: "youtube",
      mediaSrc: "BSUSj-LY_VA" 
    },
    "Pro Notes": {
      title: "Pro Notes",
      description: "A menubar note-taking app with a feature rich text editor which can be accessed from anywhere with a keyboard shortcut. For quick and easy note taking.",
      technologies: ["Electron", "React", "Vite", "JavaScript", "SQLite", "CSS"],
      features: [
        "Quick access to notes directly from the menu bar",
        "Rich text editing with Tip Tap editor for advanced formatting",
        "Cross-platform compatibility using Electron framework",
        "Fast and responsive interface built with React and Vite"
      ],
      githubUrl: "https://github.com/keypuncheralwin/menubar-notes",
      previewUrl: "#",
      icon: <ProNotesIcon width={40} height={40} />,
      mediaType: "gdrive",
      mediaSrc: "1AWSxFPFKOJkmXG5Hz_k6oDUlVI-rd0kl" 
    },
    "Portfolio Site": {
      title: "Personal Portfolio",
      description: "A responsive portfolio website built with Next.js, featuring an admin dashboard for visitor analytics and interactive project previews",
      technologies: ["Next.js", "React", "TypeScript", "CSS", "Supabase", "Formspree"],
      features: [
        "Dark/light mode toggle with system preference detection",
        "Custom Visitor tracking with admin dashboard using Supabase",
        "Interactive project preview modal for images and videos",
        "Contact form integration with Formspree",
        "Custom skeleton loaders with animated states",
        "Responsive design with optimized performance"
      ],
      githubUrl: "https://github.com/keypuncheralwin/portfolioV2",
      icon: "🌐", 
      mediaType: "image",
      mediaSrc: "/images/portfolio-screenshot.png"
    },
  };
  
  const renderProject = (projectKey: string) => {
    const project = projectsData[projectKey];
    return (
      <>
        <div className="projectHeader">
          {project.icon && <span className="projectIcon">{project.icon}</span>}
          <h3 className="projectTitle">{project.title}</h3>
        </div>
        <p className="projectDescription">{project.description}</p>
        
        <div className="projectTech">
          {project.technologies.map((tech, index) => (
            <span key={index} className="techTag">{tech}</span>
          ))}
        </div>
        
        <ul className="projectFeatures">
          {project.features.map((feature, index) => (
            <li key={index}>
              <span className="bulletPoint">›</span> {feature}
            </li>
          ))}
        </ul>
        
        <div className="projectLinks">
          {project.mediaSrc && (
            <button 
              onClick={() => {
                setCurrentPreview(project);
                setIsModalOpen(true);
              }} 
              className="projectLink previewLink"
            >
              Preview
            </button>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="projectLink githubLink">
              GitHub
            </a>
          )}
        </div>
      </>
    );
  };

  return (
    <section className="projects" id="projects">
      <h2 className="sectionTitle">Projects</h2>
      <TabbedSection
        tabs={Object.keys(projectsData)}
        activeTab={activeProject}
        setActiveTab={setActiveProject}
        renderContent={renderProject}
        className=""
        tabClassName=""
        highlightClassName="tabHighlight"
        id="projects-tabs"
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
          {isMediaLoading && currentPreview?.mediaType && (
            <SkeletonLoader 
              type={currentPreview.mediaType === 'image' ? 'image' : 'video'} 
            />
          )}
          
          {currentPreview?.mediaType === 'image' && currentPreview?.mediaSrc && (
            <img 
              src={currentPreview.mediaSrc} 
              alt={currentPreview.title} 
              loading="lazy"
              style={{ display: isMediaLoading ? 'none' : 'block' }}
              onLoad={() => setIsMediaLoading(false)}
              onError={() => setIsMediaLoading(false)} // Show image even if error occurs
            />
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