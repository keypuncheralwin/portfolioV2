"use client";

import { useTheme } from "@/contexts/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { analytics } from "@/lib/firebase";
import dynamic from "next/dynamic";

const ResumeDownloadButton = dynamic(() => import('@/components/ResumePDFDownloadButton'), {
  ssr: false,
  loading: () => <span>Loading...</span> // Optional loading state
});

export default function Resume() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="container">
      <Header theme={theme} toggleTheme={toggleTheme} />

      {/* Download PDF Button */}
      <div className="resume-download-container">
        <ResumeDownloadButton analytics={analytics} />
      </div>

      <div className="resume-page">
        {/* Header Section with Summary */}
        <header className="resume-header-section">
          <div className="resume-header-left">
            <h1 className="resume-name">Alwin George</h1>
            <p className="resume-title">Software Engineer</p>
            <div className="resume-contact-info">
              <div>Brisbane, Australia</div>
              <div>https://linkedin.com/in/alwin-george-7599271a8</div>
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
              <p className="resume-company">Flight Centre Travel Group</p>
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
              At Liftango, a leading provider of on-demand shared transport technology, I worked as a full-stack developer implementing end-to-end features for their mobile app, web dashboard, and supporting backend systems. The company helps global regions and organisations plan, launch, and scale sustainable mobility solutions using a multi-modal platform for fixed-route shuttles, demand-responsive services, carpool programs, public transport digitization, employee shuttles, and community access initiatives.
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

        {/* Selected Projects Section */}
        <section className="resume-section">
          <h2 className="resume-section-title">Selected Projects</h2>

          <div className="resume-job">
            <div className="resume-job-header">
              <h3 className="resume-job-title">Clarify – AI-Powered Content Quality Analysis App,</h3>
              <p className="resume-company">(Personal Project)</p>
              <p className="resume-date">2024 – Present</p>
            </div>
            <a href="https://www.clarifynow.app/" target="_blank" rel="noopener noreferrer" className="resume-link" style={{ fontSize: '0.9rem', marginBottom: '4px', display: 'block', color: 'inherit', textDecoration: 'none' }}>https://www.clarifynow.app/</a>
            <ul className="resume-list">
              <li>Designed, built, and shipped a production mobile app on iOS and Android enabling users to evaluate the quality and value of online content before opening the video or article.</li>
              <li>Architected a multi-platform analysis pipeline supporting articles, YouTube videos, and Reddit posts, delivering AI-generated value scores (0–100), summaries, and time-to-consume estimates.</li>
              <li>Built the mobile client using React Native and TypeScript, with a serverless backend on Firebase (Cloud Functions, Firestore) and Express.js APIs.</li>
              <li>Integrated Groq AI APIs for low-latency inference, implementing prompt orchestration and result normalization for consistent scoring.</li>
              <li>Implemented passwordless authentication, anonymous usage with seamless account migration, and a credit-based monetization model using RevenueCat and in-app purchases.</li>
              <li>Established CI/CD and release automation with fastlane, supporting reliable multi-platform deployments and ongoing iteration.</li>
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
            <p className="resume-skills-text">
              HTML/CSS, JavaScript / TypeScript, Python, C#, React.js, React Native, Node.js, Flask, Postgres (SQL), MongoDB, Sequelize, Unit/End-to-end testing (Jest/Cypress), Responsive Design, GitHub Actions/Workflows, Agile Methodologies, Docker, Containerization, Database Management
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
