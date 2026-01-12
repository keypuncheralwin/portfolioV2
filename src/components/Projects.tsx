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
  promo?: string;
  websiteUrl?: string;
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
      description: "A mobile app that helps users evaluate online content quality before opening the video or article. Share URLs from articles, YouTube videos, or Reddit posts to get instant AI-powered analysis with value scores, summaries, and insights all without breaking your flow.",
      promo: "Out now on iOS and Android",
      technologies: ["React Native", "Firebase", "Groq AI API", "Express.js", "TypeScript", "Cloud Functions", "Firestore", "RevenueCat", "fastlane"],
      features: [
        "Multi-platform content analysis supporting articles, YouTube videos, and Reddit posts",
        "AI-powered value scoring (0-100) to assess content quality and worth",
        "Instant insights and concise summaries with reading/watch time estimates",
        "Passwordless email authentication with magic codes and user profiles",
        "Credit-based system with in-app purchases for premium analysis",
        "Comprehensive scan history with search, filters, and category organization",
        "Anonymous browsing with seamless account registration and data migration"
      ],
      websiteUrl: "https://www.clarifynow.app/",
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
    "HTML to PDF Converter": {
      title: "ATS-Ready Resume Generator",
      description: "A specialized PDF generation system built with @react-pdf/renderer that programmatically constructs a resume Document Object Model. This ensures 100% text extractability for ATS systems while maintaining a pixel-perfect, consistent visual design across all devices.",
      technologies: ["Next.js", "React", "TypeScript", "@react-pdf/renderer", "CSS"],
      features: [
        "Server-less, client-side generation using React components",
        "Native text rendering for perfect ATS parsing and keyword extraction",
        "Declarative layout engine ensuring consistent results locally and on Vercel",
        "Optimized file size and metadata for professional applications",
        "High-quality vector graphics and accessible text structure",
        "Firebase Analytics integration to track download events",
        "Responsive CSS that adapts styling for both web display and PDF export",
        "A4 format optimization with precise margin and dimension control"
      ],
      githubUrl: "https://github.com/keypuncheralwin/portfolioV2",
      icon: "📄"
    },
    "Portfolio Site": {
      title: "Personal Portfolio",
      description: "A responsive portfolio website built with Next.js, featuring interactive project previews, modern UI design, and integrated analytics",
      technologies: ["Next.js", "React", "TypeScript", "Firebase Analytics", "CSS"],
      features: [
        "Dark/light mode toggle with system preference detection",
        "Interactive project preview modal for images and videos",
        "Firebase Analytics integration for visitor tracking and insights",
        "Privacy-focused analytics with URL-based opt-out mechanism",
        "Custom skeleton loaders with animated states",
        "Responsive design with optimized performance"
      ],
      githubUrl: "https://github.com/keypuncheralwin/portfolioV2",
      icon: "🌐"
    },
  };

  const renderProject = (projectKey: string) => {
    const project = projectsData[projectKey];
    return (
      <>
        <div className="projectHeader">
          {project.icon && <span className="projectIcon">{project.icon}</span>}
          <div className="projectTitleContainer">
            <h3 className="projectTitle">{project.title}</h3>
            {project.promo && project.websiteUrl ? (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="projectPromo"
                onClick={(e) => e.stopPropagation()}
              >
                {project.promo}
              </a>
            ) : project.promo ? (
              <span className="projectPromo">{project.promo}</span>
            ) : null}
          </div>
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
          {project.websiteUrl && (
            <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="projectLink websiteLink">
              Visit Website
            </a>
          )}
          {project.mediaSrc && !project.websiteUrl && (
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