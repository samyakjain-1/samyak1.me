import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ProjectsSection = styled.section`
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 640px) {
    padding: 5rem 0;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#2D3348'};
  text-align: center;

  @media (min-width: 640px) {
    font-size: 3rem;
    margin-bottom: 3rem;
  }
`;

const ProjectsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  justify-content: center;

  @media (max-width: 480px) {
    gap: 1rem;
    padding: 0 0.5rem;
  }

  @media (min-width: 640px) {
    gap: 2rem;
  }

  & > * {
    flex: 1 1 300px;
    max-width: 400px;
    min-width: 280px;
  }

  @media (max-width: 480px) {
    & > * {
      flex: 1 1 100%;
      max-width: 100%;
      min-width: 100%;
    }
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme === 'dark' ? '#2D3348' : '#FFFFFF'};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  box-shadow: ${props => props.theme === 'dark' ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '0 4px 6px rgba(45, 51, 72, 0.08)'};

  @media (max-width: 480px) {
    padding: 1.25rem;
    border-radius: 10px;
  }

  @media (min-width: 640px) {
    padding: 2.5rem;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme === 'dark' ? '0 12px 24px rgba(0, 0, 0, 0.2)' : '0 12px 24px rgba(45, 51, 72, 0.12)'};
  }

  @media (max-width: 480px) {
    &:hover {
      transform: translateY(-4px);
    }
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#2D3348'};

  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }

  @media (min-width: 640px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 1rem;
  opacity: 0.9;

  @media (min-width: 640px) {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

const TechStack = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;

  @media (min-width: 640px) {
    gap: 1.2rem;
    margin-bottom: 2.5rem;
  }
`;

const Tech = styled.span`
  color: #91a1d1;
  font-size: 0.875rem;
  opacity: 0.9;
  font-weight: 500;

  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: auto;

  @media (min-width: 640px) {
    gap: 1.5rem;
  }
`;

const IconLink = styled(motion.a)`
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  font-size: 1.25rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.8;
  transition: opacity 0.2s ease;

  @media (min-width: 640px) {
    font-size: 1.5rem;
  }

  &:hover {
    color: #91a1d1;
    opacity: 1;
  }
`;

const projects = [
  {
    title: 'SmartRepos',
    description: 'A modern platform for discovering trending GitHub repositories with personalized AI-powered insights and recommendations. Features repository bookmarking, AI analysis, interactive chat, and personalized learning guides built with the Modelence framework.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Modelence', 'MongoDB', 'GPT-4o', 'GitHub API'],
    github: 'https://github.com/samyakjain-1/SmartRepos',
    demo: 'https://smartrepos.onrender.com'
  },
  {
    title: 'UW Madison Live Parking Map',
    description: 'A live, interactive map helping users find available parking at UW-Madison campus. Features real-time data scraping, destination search with autocomplete, smart filtering by proximity, and color-coded availability markers.',
    tech: ['React', 'Google Maps API', 'Flask', 'Python', 'BeautifulSoup', 'Web Scraping'],
    github: 'https://github.com/samyakjain-1/uw-parking',
    demo: 'https://uw-parking.onrender.com'
  },
  {
    title: 'UW-Madison Course Insights Platform',
    description: 'A modern, AI-powered web platform that helps UW-Madison students explore courses through real student experiences collected from Reddit. Features smart summaries, sentiment analysis, and course discovery tools.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Python', 'AI/LLM', 'Reddit API'],
    demo: 'https://courseinsight.vercel.app',
    github: 'https://github.com/samyakjain-1/courseinsight'
  },
  {
    title: 'IPL Match Visualizer',
    description: 'An interactive web application built with Python and Streamlit that helps cricket fans explore historical IPL data through beautiful visualizations. Features team performance analysis, toss impact studies, and nail-biting match identification.',
    tech: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'Altair', 'Data Analysis'],
    demo: 'https://statsipl.streamlit.app',
    github: 'https://github.com/samyakjain-1/IPL-Stats'
  },
  {
    title: 'Sales Order Processing Automation Tool',
    description: 'Built a full stack webapp to automate order processing with PDF upload, 95% accurate product matching (FastAPI + SQLite), real-time React dashboard, and CSV export.',
    tech: ['Python', 'FastAPI', 'React', 'TypeScript', 'SQLAlchemy'],
    github: 'https://github.com/samyakjain-1/sales-automation'
  },
  {
    title: 'Mental Health Chatbot',
    description: 'A chatbot designed to assist users with mental health concerns. Offers a platform where individuals can talk about their issues and receive supportive responses. Promotes emotional well-being through accessible communication.',
    tech: ['Python', 'PyTorch', 'NLP', 'Machine Learning'],
    demo: 'https://samyakjain-1.github.io/chatbot',
    github: 'https://github.com/samyakjain-1/chatbot'
  },
];

const Projects = () => {
  const { theme } = useTheme();
  
  return (
    <ProjectsSection id="projects">
      <SectionTitle
        theme={theme}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        PROJECTS
      </SectionTitle>
      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectTitle theme={theme}>{project.title}</ProjectTitle>
            <ProjectDescription theme={theme}>{project.description}</ProjectDescription>
            <TechStack>
              {project.tech.map((tech, techIndex) => (
                <Tech key={techIndex}>{tech}</Tech>
              ))}
            </TechStack>
            <ProjectLinks>
              {project.github && (
                <IconLink
                  theme={theme}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </IconLink>
              )}
              {project.demo && (
                <IconLink
                  theme={theme}
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </IconLink>
              )}
            </ProjectLinks>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsSection>
  );
};

export default Projects; 