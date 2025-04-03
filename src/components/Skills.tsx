import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const SkillsSection = styled.section`
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

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
`;

const SkillCard = styled(motion.div)`
  background: ${props => props.theme === 'dark' ? '#2D3348' : '#FFFFFF'};
  border-radius: 8px;
  padding: 1.25rem 1.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  box-shadow: ${props => props.theme === 'dark' ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '0 4px 6px rgba(45, 51, 72, 0.08)'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme === 'dark' ? '0 8px 16px rgba(0, 0, 0, 0.2)' : '0 8px 16px rgba(45, 51, 72, 0.12)'};
  }
`;

const SkillIcon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const SkillName = styled.span`
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  font-size: 0.9rem;
  margin-top: 0.5rem;
  font-weight: 500;
`;

const skills = [
  {
    name: 'Python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
  },
  {
    name: 'Java',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
  },
  {
    name: 'HTML',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
  },
  {
    name: 'CSS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
  },
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
  },
  {
    name: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
  },
  {
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
  },
  {
    name: 'Git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
  },
  {
    name: 'Bash',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg'
  },
  {
    name: 'Docker',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'
  },
  {
    name: 'PyTorch',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg'
  }
];

const Skills = () => {
  const { theme } = useTheme();
  
  return (
    <SkillsSection id="skills">
      <SectionTitle
        theme={theme}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        SKILLS
      </SectionTitle>
      <SkillsGrid>
        {skills.map((skill, index) => (
          <SkillCard
            key={index}
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <SkillIcon src={skill.icon} alt={skill.name} />
            <SkillName theme={theme}>{skill.name}</SkillName>
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsSection>
  );
};

export default Skills; 