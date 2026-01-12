import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';

const colors = {
  primary: '#599692', // Teal from main.css
  text: '#1a1a1a',    // Dark gray/black from main.css
  textLight: '#4a4a4a', // Lighter gray for descriptions
  pillBg: 'rgba(89, 150, 146, 0.15)',
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30, // Reduced from 40 for compactness
    fontFamily: 'Helvetica',
    fontSize: 10, // Reduced from 12 for compactness
    lineHeight: 1.4,
    color: colors.text,
  },
  // Header Section
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 20,
  },
  headerLeft: {
    width: '45%',
    minWidth: 180,
    paddingRight: 10,
  },
  headerRight: {
    width: '55%',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8, // Increased from 2 to avoid overlap
    lineHeight: 1.2, // Explicit line height
    color: colors.text,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8, // Increased slightly
    color: colors.text,
  },
  contactInfo: {
    fontSize: 9,
    color: colors.text,
    lineHeight: 1.4,
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    textDecoration: 'none',
    color: colors.text,
  },
  summary: {
    fontSize: 9,
    lineHeight: 1.5,
    color: colors.text,
    textAlign: 'justify',
  },

  // Section Styles
  section: {
    marginBottom: 12, // Compact margin
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingBottom: 2,
    textTransform: 'none',
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Job Styles
  job: {
    marginBottom: 10, // Compact margin
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  jobTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.text,
  },
  company: {
    fontSize: 11,
    fontWeight: 'normal',
    color: colors.text,
    marginLeft: 4,
  },
  date: {
    fontSize: 9,
    fontWeight: 'medium',
    color: colors.text,
    textAlign: 'right',
  },
  description: {
    fontSize: 9,
    fontStyle: 'italic',
    lineHeight: 1.4,
    color: colors.textLight,
    marginBottom: 4,
  },

  // List Styles
  bulletList: {
    marginLeft: 0,
    paddingLeft: 10,
  },
  bulletPoint: {
    fontSize: 9,
    lineHeight: 1.4,
    color: colors.text,
    marginBottom: 1,
    flexDirection: 'row',
  },
  bullet: {
    width: 8,
    fontSize: 9,
    fontWeight: 'bold',
  },
  bulletContent: {
    flex: 1,
  },

  // Skills Styles
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillsText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: colors.text,
  },
});

const BulletPoint = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.bulletPoint}>
    <Text style={styles.bullet}>•</Text>
    <Text style={styles.bulletContent}>{children}</Text>
  </View>
);

const ResumePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.name}>Alwin George</Text>
          <Text style={styles.title}>Software Engineer</Text>
          <View style={styles.contactInfo}>
            <Text>Brisbane, Australia</Text>
            <Link src="https://linkedin.com/in/alwin-george-7599271a8" style={styles.link}>https://linkedin.com/in/alwin-george-7599271a8</Link>
            <Link src="https://alwingeorge.dev" style={styles.link}>alwingeorge.dev</Link>
            <Text>alwingeorge11@gmail.com</Text>
            <Text>0469441155</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.summary}>
            Software Engineer with strong expertise in modern JavaScript/TypeScript ecosystems. I
            focus on building performant, scalable applications and optimising existing systems for
            speed and reliability. I thrive in high responsibility environments such as leading teams,
            architecting scalable solutions and rapidly adapting to my team and my user's needs. My
            work is guided by empathy, clarity and a drive to build products that genuinely serve their
            users and my surrounding community.
          </Text>
        </View>
      </View>

      {/* Work Experience */}
      <Text style={styles.sectionTitle}>Work Experience</Text>

      {/* Flight Centre */}
      <View style={styles.job}>
        <View style={styles.jobHeader}>
          <View style={styles.jobTitleGroup}>
            <Text style={styles.jobTitle}>Mobile Software Engineer,</Text>
            <Text style={styles.company}>Flight Centre Travel Group</Text>
          </View>
          <Text style={styles.date}>Apr 2024 – Current</Text>
        </View>
        <Text style={styles.description}>
          At Flight Centre Travel Group (FCTG), a global leader in leisure and corporate travel retailing, I contribute to the mobile app team as a Mobile Software Engineer. I work on the flagship Flight Centre app, which has over a million downloads serving millions of users worldwide, along with apps for other FCTG brands including the recently launched World360 Rewards loyalty program app that enables earning and redeeming points on flights, hotels, cruises, tours, and more.
        </Text>
        <View style={styles.bulletList}>
          <BulletPoint>Reworked the existing Salesforce push notification implementation to ensure the user is correctly being opted in/out of the correct business units while also identifying unnecessary calls being made to the endpoint and refactoring the code to reduce the number of calls being made which in turn sped up the push notification opt in/opt out process.</BulletPoint>
          <BulletPoint>Implemented an on-device logger for production and staging app builds, significantly improving debugging speed and accelerating app deployments. This self-driven initiative enhanced efficiency and streamlined issue resolution.</BulletPoint>
          <BulletPoint>Optimised app performance by refactoring key components to eliminate unnecessary API calls and redundant image processing, significantly reducing operations blocking the main thread.</BulletPoint>
          <BulletPoint>Collaborated with the team to rebuild the app home screen based on UX team designs, focusing on improving user navigation and engagement.</BulletPoint>
        </View>
      </View>

      {/* Liftango */}
      <View style={styles.job}>
        <View style={styles.jobHeader}>
          <View style={styles.jobTitleGroup}>
            <Text style={styles.jobTitle}>Software Engineer,</Text>
            <Text style={styles.company}>Liftango</Text>
          </View>
          <Text style={styles.date}>Sep 2022 - Mar 2024</Text>
        </View>
        <Text style={styles.description}>
          At Liftango, a leading provider of on-demand shared transport technology, I worked as a full-stack developer implementing end-to-end features for their mobile app, web dashboard, and supporting backend systems. The company helps global regions and organisations plan, launch, and scale sustainable mobility solutions using a multi-modal platform for fixed-route shuttles, demand-responsive services, carpool programs, public transport digitization, employee shuttles, and community access initiatives.
        </Text>
        <View style={styles.bulletList}>
          <BulletPoint>Optimised monthly Twilio costs by analysing SMS triggers, prioritising push notifications as the primary communication method, and reserving SMS for cases where push notifications fail. Additionally, refined SMS content to reduce character usage, further lowering expenses.</BulletPoint>
          <BulletPoint>Contributed to refining the front-end, in React Native to meet evolving feature demands and enhance user experience.</BulletPoint>
          <BulletPoint>Added to the back-end service, working with Express JS to update and overhaul API endpoints for new functionalities and user needs.</BulletPoint>
        </View>
      </View>

      {/* Brightspark Labs */}
      <View style={styles.job}>
        <View style={styles.jobHeader}>
          <View style={styles.jobTitleGroup}>
            <Text style={styles.jobTitle}>Software Engineer,</Text>
            <Text style={styles.company}>Brightspark Labs</Text>
          </View>
          <Text style={styles.date}>Jan 2022 – Aug 2022</Text>
        </View>
        <Text style={styles.description}>
          At brightSPARK Labs, a software development agency specializing in high stakes solutions for government and defence clients, I worked as a full-stack developer. The company delivers mission critical projects, including accredited Defence networks with virtualized infrastructure, SharePoint document management, HP Quality Center testing, continuous integration, and scalable services supporting up to 200 virtual machines.
        </Text>
        <View style={styles.bulletList}>
          <BulletPoint>Contributed to the development of an enhanced prototype for the existing node graph visualiser using React Fiber, enabling finer control over every aspect of the 3D graph due to the limited flexibility of the react-force-graph library.</BulletPoint>
          <BulletPoint>Enhanced the in-house codebase by contributing to the Angular front end and Java-based Dropwizard backend, resulting in improved application performance.</BulletPoint>
          <BulletPoint>Simplified software setup with bash scripts that automated configuration and reduced execution time enhancing efficiency and ease of use, fostering a collaborative work environment.</BulletPoint>
        </View>
      </View>

      {/* Ipau */}
      <View style={styles.job}>
        <View style={styles.jobHeader}>
          <View style={styles.jobTitleGroup}>
            <Text style={styles.jobTitle}>I.T Client Relations Consultant,</Text>
            <Text style={styles.company}>Ipau</Text>
          </View>
          <Text style={styles.date}>Jan 2021 – Jan 2022</Text>
        </View>
        <Text style={styles.description}>
          At Ipau, an IT services provider with nearly two decades of experience across education, defence, manufacturing, and logistics, I worked as an IT Specialist providing support for multiple primary schools.
        </Text>
        <View style={styles.bulletList}>
          <BulletPoint>Managed IT operations for multiple primary schools, administering servers, networks, and overall IT infrastructure while optimizing workflows through scripting.</BulletPoint>
          <BulletPoint>Delivered effective onsite and remote technical support for various IT issues.</BulletPoint>
        </View>
      </View>

      {/* Selected Projects */}
      <Text style={styles.sectionTitle}>Selected Projects</Text>

      <View style={styles.job}>
        <View style={styles.jobHeader}>
          <View style={styles.jobTitleGroup}>
            <Text style={styles.jobTitle}>Clarify – AI-Powered Content Quality Analysis App,</Text>
            <Text style={styles.company}>(Personal Project)</Text>
          </View>
          <Text style={styles.date}>2024 – Present</Text>
        </View>
        <Link src="https://www.clarifynow.app/" style={{ ...styles.link, fontSize: 9, marginBottom: 4, display: 'flex' }}>https://www.clarifynow.app/</Link>
        <View style={styles.bulletList}>
          <BulletPoint>Designed, built, and shipped a production mobile app on iOS and Android enabling users to evaluate the quality and value of online content before opening the video or article.</BulletPoint>
          <BulletPoint>Architected a multi-platform analysis pipeline supporting articles, YouTube videos, and Reddit posts, delivering AI-generated value scores (0–100), summaries, and time-to-consume estimates.</BulletPoint>
          <BulletPoint>Built the mobile client using React Native and TypeScript, with a serverless backend on Firebase (Cloud Functions, Firestore) and Express.js APIs.</BulletPoint>
          <BulletPoint>Integrated Groq AI APIs for low-latency inference, implementing prompt orchestration and result normalization for consistent scoring.</BulletPoint>
          <BulletPoint>Implemented passwordless authentication, anonymous usage with seamless account migration, and a credit-based monetization model using RevenueCat and in-app purchases.</BulletPoint>
          <BulletPoint>Established CI/CD and release automation with fastlane, supporting reliable multi-platform deployments and ongoing iteration.</BulletPoint>
        </View>
      </View>

      {/* Education */}
      <Text style={styles.sectionTitle}>Education</Text>

      <View style={styles.job}>
        <View style={styles.jobHeader}>
          <View style={styles.jobTitleGroup}>
            <Text style={styles.jobTitle}>Software Engineering,</Text>
            <Text style={styles.company}>General Assembly Bootcamp</Text>
          </View>
          <Text style={styles.date}>Jun 2021 - Dec 2021</Text>
        </View>
        <View style={styles.bulletList}>
          <BulletPoint>Developed a full-stack web application using React for the front end and Express.js for the backend as part of the final project, a web app that allows users to create and vote on polls</BulletPoint>
          <BulletPoint>Developed a ticket managing system with flask a lightweight python back-end framework utilising it's jinja templating engine for the front end</BulletPoint>
        </View>
      </View>

      <View style={styles.job}>
        <View style={styles.jobHeader}>
          <View style={styles.jobTitleGroup}>
            <Text style={styles.jobTitle}>Bachelor of Information Technology,</Text>
            <Text style={styles.company}>James Cook University</Text>
          </View>
          <Text style={styles.date}>2018 – 2020</Text>
        </View>
        <View style={styles.bulletList}>
          <BulletPoint>Engaged in annual 3-day sprints, working alongside local subject matter experts to create and showcase an MVP solution to a panel of SMEs, achieving 2nd place in the final year with our disaster relief live chatbot prototype.</BulletPoint>
          <BulletPoint>Developed a task management system in Android Studio with Java, featuring intuitive user interfaces for streamlined task organisation, prioritisation, and management, including functionalities for adding, editing, and deleting tasks.</BulletPoint>
        </View>
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technical Skills</Text>
        <Text style={styles.skillsText}>
          HTML/CSS, JavaScript / TypeScript, Python, C#, React.js, React Native, Node.js, Flask, Postgres (SQL), MongoDB, Sequelize, Unit/End-to-end testing (Jest/Cypress), Responsive Design, GitHub Actions/Workflows, Agile Methodologies, Docker, Containerization, Database Management
        </Text>
      </View>

    </Page>
  </Document>
);

export default ResumePDF;
