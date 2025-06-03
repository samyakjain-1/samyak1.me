import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const SkillsSection = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 3rem;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#2D3348'};
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  
  &::before,
  &::after {
    content: "";
    height: 100%;
    position: absolute;
    width: 80px;
    z-index: 2;
    pointer-events: none;
    top: 0;
  }
  
  &::after {
    right: 0;
    background: linear-gradient(to left, ${props => props.theme === 'dark' ? '#23283C' : '#F8F9FC'} 0%, transparent 100%);
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, ${props => props.theme === 'dark' ? '#23283C' : '#F8F9FC'} 0%, transparent 100%);
  }
  
  @media (max-width: 768px) {
    &::before,
    &::after {
      width: 40px;
    }
  }
  
  @media (max-width: 480px) {
    &::before,
    &::after {
      width: 20px;
    }
  }
`;

const SlideTrack = styled.div`
  display: flex;
  gap: 1rem;
  width: calc((180px + 1rem) * 26);
  animation: scroll 45s linear infinite;
  padding: 1rem 0;
  
  @keyframes scroll {
    0% { 
      transform: translateX(0); 
    }
    100% { 
      transform: translateX(calc((-180px - 1rem) * 13));
    }
  }
  
  @media (max-width: 768px) {
    gap: 0.75rem;
    width: calc((120px + 0.75rem) * 26);
    animation: scrollTablet 35s linear infinite;
    
    @keyframes scrollTablet {
      0% { 
        transform: translateX(0); 
      }
      100% { 
        transform: translateX(calc((-120px - 0.75rem) * 13));
      }
    }
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
    width: calc((90px + 0.5rem) * 26);
    animation: scrollMobile 30s linear infinite;
    padding: 0.5rem 0;
    
    @keyframes scrollMobile {
      0% { 
        transform: translateX(0); 
      }
      100% { 
        transform: translateX(calc((-90px - 0.5rem) * 13));
      }
    }
  }
  
  @media (max-width: 360px) {
    gap: 0.4rem;
    width: calc((75px + 0.4rem) * 26);
    animation: scrollSmall 25s linear infinite;
    
    @keyframes scrollSmall {
      0% { 
        transform: translateX(0); 
      }
      100% { 
        transform: translateX(calc((-75px - 0.4rem) * 13));
      }
    }
  }
`;

const SkillCard = styled.div`
  background: ${props => props.theme === 'dark' ? '#2D3348' : '#FFFFFF'};
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-shrink: 0;
  width: 180px;
  height: 120px;
  box-shadow: ${props => props.theme === 'dark' ? '0 6px 12px rgba(0, 0, 0, 0.15)' : '0 6px 12px rgba(45, 51, 72, 0.1)'};
  border: 1px solid ${props => props.theme === 'dark' ? 'rgba(204, 205, 250, 0.08)' : 'rgba(74, 86, 128, 0.08)'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme === 'dark' ? '0 8px 16px rgba(0, 0, 0, 0.2)' : '0 8px 16px rgba(45, 51, 72, 0.15)'};
  }
  
  @media (max-width: 768px) {
    width: 120px;
    height: 90px;
    padding: 0.75rem;
    gap: 0.4rem;
    border-radius: 8px;
  }
  
  @media (max-width: 480px) {
    width: 90px;
    height: 75px;
    padding: 0.5rem;
    gap: 0.3rem;
    border-radius: 6px;
  }
  
  @media (max-width: 360px) {
    width: 75px;
    height: 65px;
    padding: 0.4rem;
    gap: 0.25rem;
  }
`;

const SkillIcon = styled.img<{ isBash?: boolean; theme?: string }>`
  width: 40px;
  height: 40px;
  object-fit: contain;
  ${({ isBash, theme }) => isBash && theme === 'dark' && 'filter: brightness(0) invert(1);'}
  
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
  
  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
  }
  
  @media (max-width: 360px) {
    width: 20px;
    height: 20px;
  }
`;

const SkillName = styled.span`
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
  
  @media (max-width: 360px) {
    font-size: 0.55rem;
  }
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
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-plain.svg'
  },
  {
    name: 'Docker',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'
  },
  {
    name: 'PyTorch',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg'
  },
  {
    name: 'OpenCV',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg'
  },
  {
    name: 'NumPy',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg'
  }
];

const Skills = () => {
  const { theme } = useTheme();
  
  // Create duplicated skills array for seamless infinite scroll
  const duplicatedSkills = [...skills, ...skills];
  
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
      <SliderWrapper theme={theme}>
        <SlideTrack>
          {duplicatedSkills.map((skill, index) => (
            <SkillCard key={`${skill.name}-${index}`} theme={theme}>
              <SkillIcon 
                src={skill.icon} 
                alt={skill.name} 
                isBash={skill.name === 'Bash'} 
                theme={theme} 
              />
              <SkillName theme={theme}>{skill.name}</SkillName>
            </SkillCard>
          ))}
        </SlideTrack>
      </SliderWrapper>
    </SkillsSection>
  );
};

export default Skills; 