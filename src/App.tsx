import { HashRouter as Router } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import SEO from './components/SEO';
import TypewriterText from './components/TypewriterText';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import ParticlesBackground from './components/ParticlesBackground';

const FloatingElement = styled(motion.div)`
  position: fixed;
  border-radius: 50%;
  background: ${props => props.theme === 'dark' ? 'rgba(145, 161, 209, 0.1)' : 'rgba(74, 86, 128, 0.1)'};
  pointer-events: none;
  z-index: 0;
  filter: blur(100px);
  opacity: 0.6;
  mix-blend-mode: normal;
  transition: transform 0.2s ease-out;
`;

const GlobalWrapper = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#23283C' : '#F8F9FC'};
  background-image: linear-gradient(${props => props.theme === 'dark' ? 'rgba(204, 205, 250, 0.03)' : 'rgba(74, 86, 128, 0.03)'} 1px, transparent 1px),
                    linear-gradient(90deg, ${props => props.theme === 'dark' ? 'rgba(204, 205, 250, 0.03)' : 'rgba(74, 86, 128, 0.03)'} 1px, transparent 1px);
  background-size: 30px 30px;
  background-position: center center;
  min-height: 100vh;
  width: 100%;
  position: relative;
`;

const BackgroundLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme === 'dark' ? '#23283C' : '#F8F9FC'};
  background-image: linear-gradient(${props => props.theme === 'dark' ? 'rgba(204, 205, 250, 0.05)' : 'rgba(74, 86, 128, 0.05)'} 1px, transparent 1px),
                    linear-gradient(90deg, ${props => props.theme === 'dark' ? 'rgba(204, 205, 250, 0.05)' : 'rgba(74, 86, 128, 0.05)'} 1px, transparent 1px);
  background-size: 40px 40px;
  background-attachment: fixed;
  background-position: center center;
  z-index: -1;
`;

const ContentLayer = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
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
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

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

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(100vh - 100px);
  margin-bottom: 2rem;
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
  position: relative;
  gap: 0.5rem;

  @media (min-width: 640px) {
    gap: 0.75rem;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#2D3348'};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding: 0 1rem;

  @media (min-width: 480px) {
    font-size: 2.5rem;
    gap: 0.5rem;
  }

  @media (min-width: 640px) {
    font-size: 4rem;
  }
`;

const StyledTypewriter = styled(TypewriterText)`
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#2D3348'};
  text-align: center;
  
  @media (max-width: 480px) {
    white-space: pre-wrap;
  }

  @media (min-width: 481px) {
    white-space: pre;
  }
  
  span.highlight {
    background: linear-gradient(120deg, #91a1d1 0%, ${props => props.theme === 'dark' ? '#8B9FE8' : '#91a1d1'} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: 1.75rem;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#2D3348'};
  margin: 0.75rem 0;
  font-weight: 700;

  @media (min-width: 640px) {
    font-size: 2.5rem;
    margin: 1rem 0;
  }
`;

const HeroText = styled(motion.p)`
  font-size: 1.1rem;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  margin: 0.75rem auto;
  line-height: 1.6;
  max-width: 800px;
  text-align: center;

  @media (min-width: 640px) {
    font-size: 1.25rem;
    margin: 1rem auto;
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 1rem;

  @media (min-width: 640px) {
    gap: 1rem;
    margin-top: 1.5rem;
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
  position: relative;
  overflow: hidden;
  z-index: 1;

  @media (min-width: 640px) {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, #91a1d1 0%, ${props => props.theme === 'dark' ? '#8B9FE8' : '#91a1d1'} 100%);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease;
  }

  &:hover {
    color: ${props => props.theme === 'dark' ? '#23283C' : '#F8F9FC'};
    border-color: #91a1d1;

    &::before {
      opacity: 1;
    }
  }
`;

const SectionWrapper = styled(motion.div)`
  opacity: 0;
`;

const BackToTop = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: ${props => props.theme === 'dark' ? 'rgba(204, 205, 250, 0.1)' : 'rgba(74, 86, 128, 0.1)'};
  border: 1px solid ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 90;

  &:hover {
    background: ${props => props.theme === 'dark' ? 'rgba(204, 205, 250, 0.2)' : 'rgba(74, 86, 128, 0.2)'};
    transform: translateY(-2px);
  }

  @media (max-width: 640px) {
    bottom: 1rem;
    right: 1rem;
  }
`;

const ScrollProgress = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: ${props => props.theme === 'dark' ? '#91a1d1' : '#4A5680'};
  transform-origin: 0%;
  opacity: 0.8;
  z-index: 100;
  box-shadow: 0 0 10px ${props => props.theme === 'dark' ? 'rgba(145, 161, 209, 0.5)' : 'rgba(74, 86, 128, 0.5)'};
`;

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [age, setAge] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Floating elements configuration
  const floatingElements = [
    {
      size: 800,
      initialX: "-10%",
      initialY: "20%",
      duration: 50,
    },
    {
      size: 600,
      initialX: "60%",
      initialY: "10%",
      duration: 45,
    },
    {
      size: 700,
      initialX: "80%",
      initialY: "60%",
      duration: 55,
    }
  ];

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
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight);
      setScrollProgress(progress);

      // Show/hide back to top button
      setShowBackToTop(window.scrollY > window.innerHeight * 0.5);

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach((anchor: Element) => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault();
        if (anchor instanceof HTMLAnchorElement) {
          const href = anchor.getAttribute('href');
          if (href) {
            document.querySelector(href)?.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <GlobalWrapper theme={theme}>
      <SEO />
      <ScrollProgress
        theme={theme}
        style={{ scaleX: scrollProgress }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 0.3 }}
      />
      <BackgroundLayer theme={theme} />
      <ParticlesBackground theme={theme} />
      {floatingElements.map((element, index) => (
        <FloatingElement
          key={index}
          theme={theme}
          style={{
            width: element.size,
            height: element.size,
            left: element.initialX,
            top: element.initialY,
            transform: `translate(
              ${(mousePosition.x * (index + 1)) / (index + 50)}px,
              ${(mousePosition.y * (index + 1)) / (index + 50)}px
            )`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <ContentLayer>
        <Nav theme={theme}>
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
        <AppContainer theme={theme}>
          <HeroContainer>
            <Hero>
              <HeroTitle theme={theme}>
                <StyledTypewriter 
                  text={isMobile ? 
                    `Hi, I am\n${String.fromCharCode(160)}Samyak${String.fromCharCode(160)}Jain.` :
                    `Hi, I am ${String.fromCharCode(160)}Samyak${String.fromCharCode(160)}Jain.`}
                  delay={0.5} 
                  speed={70}
                  theme={theme} 
                />
              </HeroTitle>
              <HeroSubtitle
                theme={theme}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Software Developer
              </HeroSubtitle>
              <HeroText
                theme={theme}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                I am a {age}-year-old aspiring software engineer with a knack for solving problems and building efficient systems. 
                Currently a sophomore studying Computer Science at the University of Wisconsin-Madison, I'm passionate about 
                machine learning, artificial intelligence, large language models (LLMs), and computer vision. Through my coursework, 
                I've developed a strong foundation in both theoretical and practical aspects of computer science, enabling me to 
                approach complex problems with confidence and creativity.
              </HeroText>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <SocialLinks
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 1.3
                      }
                    }
                  }}
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <SocialLink
                      theme={theme}
                      href="mailto:samyakjain2575@gmail.com"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      email
                    </SocialLink>
                  </motion.div>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
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
                  </motion.div>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
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
                  </motion.div>
                </SocialLinks>
              </motion.div>
            </Hero>
          </HeroContainer>

          <SectionWrapper
            id="projects"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Projects />
          </SectionWrapper>
          
          <SectionWrapper
            id="skills"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Skills />
          </SectionWrapper>
          
          <SectionWrapper
            id="contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Contact />
          </SectionWrapper>
        </AppContainer>
      </ContentLayer>
      <AnimatePresence>
        {showBackToTop && (
          <BackToTop
            theme={theme}
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ↑
          </BackToTop>
        )}
      </AnimatePresence>
    </GlobalWrapper>
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
