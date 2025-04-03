import { HashRouter as Router } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import SEO from './components/SEO';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const GlobalWrapper = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#23283C' : '#F8F9FC'};
  min-height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
`;

const AppContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  min-height: 100vh;
  position: relative;
  z-index: 1;

  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  position: relative;

  @media (min-width: 640px) {
    padding: 2rem 0;
  }
`;

const Logo = styled(motion.a)`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #91a1d1;
  text-decoration: none;
  position: relative;
  z-index: 20;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: #91a1d1;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const MenuButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 20;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    color: #91a1d1;
    background-color: ${props => props.theme === 'dark' ? 'rgba(204, 205, 250, 0.1)' : 'rgba(74, 86, 128, 0.1)'};
  }

  @media (min-width: 640px) {
    display: none;
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-100%'};
  height: 100vh;
  width: 100%;
  background-color: ${props => props.theme === 'dark' ? '#23283C' : '#F8F9FC'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  transition: right 0.3s ease;
  z-index: 10;

  @media (min-width: 640px) {
    position: static;
    height: auto;
    width: auto;
    flex-direction: row;
    background-color: transparent;
    gap: 2rem;
  }
`;

const NavLink = styled(motion.a)`
  text-decoration: none;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  font-weight: 500;
  position: relative;
  font-size: 1.25rem;

  @media (min-width: 640px) {
    font-size: 1rem;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &.active::after {
    width: 100%;
  }
`;

const ThemeToggle = styled(motion.button)`
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: all 0.3s ease;
  border-radius: 8px;

  &:hover {
    color: #91a1d1;
    background-color: ${props => props.theme === 'dark' ? 'rgba(204, 205, 250, 0.1)' : 'rgba(74, 86, 128, 0.1)'};
  }

  @media (min-width: 640px) {
    margin-left: 0.5rem;
  }
`;

const Hero = styled.section`
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  padding: 0 1rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#2D3348'};
  width: 100%;

  @media (min-width: 640px) {
    font-size: 4rem;
  }
`;

const NameHighlight = styled.span`
  background: linear-gradient(120deg, #91a1d1 0%, ${props => props.theme === 'dark' ? '#8B9FE8' : '#91a1d1'} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: 1.75rem;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#2D3348'};
  margin: 1.5rem 0;
  font-weight: 700;

  @media (min-width: 640px) {
    font-size: 2.5rem;
    margin: 2rem 0;
  }
`;

const HeroText = styled(motion.p)`
  font-size: 1.1rem;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  margin: 1.5rem auto;
  line-height: 1.6;
  max-width: 800px;
  text-align: center;

  @media (min-width: 640px) {
    font-size: 1.25rem;
    margin: 2rem auto;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 1rem;

  @media (min-width: 640px) {
    gap: 1rem;
    margin-top: 2rem;
  }
`;

const SocialLink = styled(motion.a)`
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  font-size: 0.875rem;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  border-radius: 4px;
  transition: all 0.3s ease;

  @media (min-width: 640px) {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }

  &:hover {
    color: #91a1d1;
    border-color: #91a1d1;
  }
`;

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [age, setAge] = useState(0);

  useEffect(() => {
    // Calculate age
    const birthDate = new Date('2005-07-25');
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    setAge(age);

    const handleScroll = () => {
      const sections = ['projects', 'skills', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(currentSection || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <SEO />
      <GlobalWrapper theme={theme} />
      <AppContainer theme={theme}>
        <Nav>
          <Logo
            href="#"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            SJ.
          </Logo>
          <MenuButton
            theme={theme}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </MenuButton>
          <NavLinks isOpen={isMenuOpen} theme={theme}>
            <NavLink
              href="#projects"
              className={activeSection === 'projects' ? 'active' : ''}
              theme={theme}
              onClick={closeMenu}
            >
              projects
            </NavLink>
            <NavLink
              href="#skills"
              className={activeSection === 'skills' ? 'active' : ''}
              theme={theme}
              onClick={closeMenu}
            >
              skills
            </NavLink>
            <NavLink
              href="#contact"
              className={activeSection === 'contact' ? 'active' : ''}
              theme={theme}
              onClick={closeMenu}
            >
              contact
            </NavLink>
            <ThemeToggle
              onClick={toggleTheme}
              theme={theme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </ThemeToggle>
          </NavLinks>
        </Nav>

        <Hero>
          <HeroTitle
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hi, I am <NameHighlight theme={theme}>Samyak Jain</NameHighlight>.
          </HeroTitle>
          <HeroSubtitle
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Software Developer
          </HeroSubtitle>
          <HeroText
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            I am a {age}-year-old aspiring software engineer with a knack for solving problems and building efficient systems. 
            Currently a sophomore studying Computer Science at the University of Wisconsin-Madison, I'm passionate about 
            machine learning, artificial intelligence, large language models (LLMs), and computer vision. Through my coursework, 
            I've developed a strong foundation in both theoretical and practical aspects of computer science, enabling me to 
            approach complex problems with confidence and creativity.
          </HeroText>
          <SocialLinks>
            <SocialLink
              theme={theme}
              href="mailto:samyakjain2575@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              email
            </SocialLink>
            <SocialLink
              theme={theme}
              href="https://github.com/samyakjain-1"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              github
            </SocialLink>
            <SocialLink
              theme={theme}
              href="https://linkedin.com/in/samyak1"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              linkedin
            </SocialLink>
          </SocialLinks>
        </Hero>

        <div id="projects">
          <Projects />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </AppContainer>
    </>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
}

export default App;
