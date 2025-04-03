import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ProjectsSection = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 3rem;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#2D3348'};
  text-align: center;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme === 'dark' ? '#2D3348' : '#FFFFFF'};
  border-radius: 12px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  box-shadow: ${props => props.theme === 'dark' ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '0 4px 6px rgba(45, 51, 72, 0.08)'};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme === 'dark' ? '0 12px 24px rgba(0, 0, 0, 0.2)' : '0 12px 24px rgba(45, 51, 72, 0.12)'};
  }
`;

const ProjectTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#2D3348'};
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  margin-bottom: 2rem;
  line-height: 1.6;
  font-size: 1.1rem;
  opacity: 0.9;
`;

const TechStack = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2.5rem;
`;

const Tech = styled.span`
  color: #91a1d1;
  font-size: 1rem;
  opacity: 0.9;
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: auto;
`;

const IconLink = styled(motion.a)`
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  font-size: 1.5rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.8;
  transition: opacity 0.2s ease;

  &:hover {
    color: #91a1d1;
    opacity: 1;
  }
`;

const projects = [
  {
    title: 'Mental Health Chatbot',
    description: 'A chatbot designed to assist users with mental health concerns. Offers a platform where individuals can talk about their issues and receive supportive responses. Promotes emotional well-being through accessible communication.',
    tech: ['Python', 'PyTorch', 'NLP', 'Machine Learning'],
    demo: 'https://samyakjain-1.github.io/chatbot',
    github: 'https://github.com/samyakjain-1/chatbot'
  },
  {
    title: 'Cell Image Clustering Tool',
    description: 'A Dockerized machine learning tool that automatically clusters unlabeled microscopy images using K-Means clustering. Features image preprocessing, PCA dimensionality reduction, and automated organization of biomedical research datasets. Includes visualization tools for validating cluster coherence and biological pattern separation.',
    tech: ['Python', 'OpenCV', 'scikit-learn', 'Docker'],
    github: 'https://github.com/samyakjain-1/cell-image-clustering'
  },
  {
    title: 'Personal Website',
    description: 'My personal portfolio website showcasing my background, skills, and projects in a clean and structured format. Built with modern web technologies and features a responsive design with dark/light mode.',
    tech: ['React', 'TypeScript', 'Emotion', 'Framer Motion'],
    demo: 'https://samyak1.me',
    github: 'https://github.com/samyakjain-1/website'
  }
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