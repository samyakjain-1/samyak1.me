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
  background: ${props => props.theme === 'dark' ? 'rgba(145, 161, 209, 0.03)' : 'rgba(74, 86, 128, 0.03)'};
  pointer-events: none;
  z-index: 0;
  filter: blur(60px);
  opacity: 0.6;
  mix-blend-mode: plus-lighter;
  will-change: transform;
  transform-origin: center center;
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    display: none;
  }
`;

const GlobalWrapper = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#23283C' : '#F8F9FC'};
  background-image: linear-gradient(${props => props.theme === 'dark' ? 'rgba(204, 205, 250, 0.03)' : 'rgba(74, 86, 128, 0.03)'} 1px, transparent 1px),
                    linear-gradient(90deg, ${props => props.theme === 'dark' ? 'rgba(204, 205, 250, 0.03)' : 'rgba(74, 86, 128, 0.03)'} 1px, transparent 1px);
  background-size: 30px 30px;
  background-position: center center;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
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
  overflow-x: hidden;
`;

const AppContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem 0;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  min-height: 100vh;
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;

  @media (max-width: 640px) {
    padding: 0 0.75rem;
    max-width: 100vw;
  }

  @media (min-width: 640px) {
    padding: 3rem 2rem 0;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1.5rem;
  position: fixed;
  top: 1.5rem;
  left: 50%;
  right: auto;
  transform: translateX(-50%);
  width: auto;
  margin: 0 auto;
  background: ${props => props.theme === 'dark' 
    ? 'rgba(35, 40, 60, 0.2)' 
    : 'rgba(248, 249, 252, 0.2)'
  };
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(204, 205, 250, 0.25)' 
    : 'rgba(74, 86, 128, 0.25)'
  };
  border-radius: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  z-index: 100;
  transition: all 0.3s ease;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: ${props => props.theme === 'dark'
      ? 'linear-gradient(to bottom right, rgba(145, 161, 209, 0.1) 0%, transparent 40%, transparent 60%, rgba(145, 161, 209, 0.1) 100%)'
      : 'linear-gradient(to bottom right, rgba(74, 86, 128, 0.1) 0%, transparent 40%, transparent 60%, rgba(74, 86, 128, 0.1) 100%)'
    };
    transform: rotate(25deg);
    z-index: -1;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const MobileNavContainer = styled.div`
  display: none;
  
  @media (max-width: 640px) {
    display: block;
    position: relative;
    width: 100%;
    padding: 1rem;
    
    @media (max-width: 480px) {
      padding: 0.75rem;
    }
  }
`;

const LogoContainer = styled.div`
  position: fixed;
  top: 1.5rem;
  left: 10%;
  right: auto;
  transform: none;
  z-index: 100;
  
  @media (max-width: 640px) {
    position: fixed;
    top: 0.75rem;
    left: 1rem;
    transform: none;
    z-index: 20;
  }
`;

const MobileMenuButtonContainer = styled.div`
  display: none;
  
  @media (max-width: 640px) {
    display: block;
    position: fixed;
    top: 2.1rem;
    right: 1rem;
    z-index: 20;
  }
`;

const Logo = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  text-decoration: none;
  position: relative;
  z-index: 20;
  padding: 0.15rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border: none;
  box-shadow: none;
  overflow: visible;

  &::before {
    display: none;
  }

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 640px) {
    padding: 0.1rem;
    
    &:hover {
      background-color: rgba(145, 161, 209, 0.1);
      transform: none;
    }
  }
`;

const MenuButton = styled(motion.button)`
  display: none;
  
  @media (max-width: 640px) {
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
  }
`;

const ProfileImage = styled(motion.img)`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  object-fit: cover;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme === 'dark' 
    ? 'rgba(204, 205, 250, 0.35)' 
    : 'rgba(74, 86, 128, 0.35)'
  };
  z-index: 1;
  background: transparent;
  mix-blend-mode: ${props => props.theme === 'dark' ? 'luminosity' : 'darken'};
  filter: ${props => props.theme === 'dark' ? 'contrast(1.05) brightness(0.9)' : 'contrast(1.05)'};

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    border: 2px solid transparent;
    mix-blend-mode: normal;
    filter: none;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 640px) {
    width: 80px;
    height: 80px;
    border: 2px solid transparent;
    mix-blend-mode: normal;
    filter: none;
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${props => props.theme === 'dark' ? '#23283C' : '#F8F9FC'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow: hidden;

  @media (min-width: 640px) {
    position: static;
    height: auto;
    width: auto;
    flex-direction: row;
    background-color: transparent;
    gap: 1.5rem;
    transform: none;
    transition: none;
  }
`;

const NavLink = styled(motion.a)`
  text-decoration: none;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  font-weight: 500;
  position: relative;
  font-size: 1.25rem;
  padding: 0.3rem 0.5rem;
  transition: all 0.3s ease;
  border-radius: 4px;
  z-index: 1001;

  @media (max-width: 640px) {
    color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#000000'};
    font-size: 1.5rem;
    padding: 1rem 2rem;
    font-weight: 600;
  }

  @media (min-width: 640px) {
    font-size: 0.9rem;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
    transition: width 0.3s ease;
  }

  @media (max-width: 640px) {
    &::after {
      bottom: -4px;
      left: 0;
      transform: none;
    }
  }

  &:hover {
    background-color: ${props => props.theme === 'dark' 
      ? 'rgba(204, 205, 250, 0.1)' 
      : 'rgba(74, 86, 128, 0.1)'
    };
  }

  @media (max-width: 640px) {
    &:hover {
      background-color: transparent;
    }
  }

  &:hover::after {
    width: 70%;
  }

  @media (max-width: 640px) {
    &:hover::after {
      width: 100%;
    }
  }

  &.active::after {
    width: 70%;
  }

  @media (max-width: 640px) {
    &.active::after {
      width: 100%;
    }
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
  z-index: 1001;

  @media (max-width: 640px) {
    color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#000000'};
    font-size: 2rem;
    padding: 1rem;
  }

  &:hover {
    color: #91a1d1;
    background-color: ${props => props.theme === 'dark' 
      ? 'rgba(204, 205, 250, 0.1)' 
      : 'rgba(74, 86, 128, 0.1)'
    };
  }

  @media (min-width: 640px) {
    margin-left: 0.5rem;
    font-size: 1.1rem;
  }
`;

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: calc(100vh - 100px);
  margin-bottom: 0.5rem;
  padding-top: 4rem;
  overflow-x: hidden;

  @media (max-width: 640px) {
    padding-top: 5rem;
    min-height: calc(100vh - 80px);
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
  position: relative;
  gap: 0.2rem;
  overflow-x: hidden;

  @media (max-width: 480px) {
    padding: 0 0.75rem;
    gap: 0.1rem;
    min-height: calc(100vh - 80px);
    max-width: 100%;
  }

  @media (min-width: 640px) {
    gap: 0.4rem;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#2D3348'};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding: 0 1rem;

  @media (max-width: 480px) {
    font-size: 1.5rem;
    padding: 0 0.5rem;
    gap: 0.1rem;
  }

  @media (min-width: 480px) {
    font-size: 2.5rem;
    gap: 0.5rem;
  }

  @media (min-width: 640px) {
    font-size: 4rem;
    margin-bottom: 0.75rem;
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
  margin: 0 0 0.5rem 0;
  font-weight: 700;

  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin: 0 0 0.3rem 0;
  }

  @media (min-width: 640px) {
    font-size: 2.5rem;
    margin: 0 0 0.75rem 0;
  }
`;

const HeroText = styled(motion.p)`
  font-size: 1.1rem;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  margin: 0.5rem auto 0  auto;
  line-height: 1.6;
  max-width: 800px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin: 0.3rem auto 0 auto;
    line-height: 1.5;
    padding: 0 0.5rem;
  }

  @media (min-width: 640px) {
    font-size: 1.25rem;
    margin: 0.75rem auto 0 auto;
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
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
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

const LoadingScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme === 'dark' ? '#23283C' : '#F8F9FC'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 0.5rem;
  
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
    animation: loadingBounce 1.4s ease-in-out infinite both;
    
    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
    
    &:nth-child(3) {
      animation-delay: 0s;
    }
  }
  
  @keyframes loadingBounce {
    0%, 80%, 100% {
      transform: scale(0);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const LoadingText = styled.p`
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  font-size: 1rem;
  margin-top: 1rem;
  font-weight: 500;
`;

const MobileNav = styled.nav<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 640px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: ${props => props.theme === 'dark' ? '#23283C' : '#F8F9FC'};
    z-index: 500;
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 2.1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#000000'};
  font-size: 1.75rem;
  cursor: pointer;
  z-index: 501;
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    color: #91a1d1;
    background-color: ${props => props.theme === 'dark' ? 'rgba(204, 205, 250, 0.1)' : 'rgba(74, 86, 128, 0.1)'};
  }
`;

const MobileLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 2rem;
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
  const [isLoading, setIsLoading] = useState(true);

  // Floating elements configuration
  const floatingElements = [
    {
      size: 500,
      initialX: "20%",
      initialY: "30%",
      duration: 20,
      movementFactor: 40,
      color: 'rgba(145, 161, 209, 0.03)'
    },
    {
      size: 400,
      initialX: "75%",
      initialY: "20%",
      duration: 25,
      movementFactor: 30,
      color: 'rgba(145, 161, 209, 0.04)'
    },
    {
      size: 300,
      initialX: "85%",
      initialY: "60%",
      duration: 30,
      movementFactor: 20,
      color: 'rgba(145, 161, 209, 0.05)'
    },
    {
      size: 250,
      initialX: "15%",
      initialY: "70%",
      duration: 35,
      movementFactor: 25,
      color: 'rgba(145, 161, 209, 0.04)'
    },
    {
      size: 200,
      initialX: "45%",
      initialY: "30%",
      duration: 40,
      movementFactor: 35,
      color: 'rgba(145, 161, 209, 0.03)'
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

    // Invisible scroll to fix layout calculation issues
    const fixLayoutScroll = () => {
      // Store original scroll behavior
      const originalScrollBehavior = document.documentElement.style.scrollBehavior;
      
      // Temporarily disable smooth scrolling for instant movement
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Force a layout recalculation
      document.body.offsetHeight;
      
      // Get the full page height
      const maxHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      
      // Scroll to bottom instantly (invisible to user due to loading screen)
      window.scrollTo({
        top: maxHeight,
        left: 0,
        behavior: 'auto'
      });
      
      // Small delay then scroll back to top
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto'
        });
        
        // Restore original settings
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = originalScrollBehavior;
        }, 10);
      }, 10);
    };

    // Run the fix and hide loading screen
    const initializePage = async () => {
      // Run layout fixes
      setTimeout(fixLayoutScroll, 50);
      setTimeout(fixLayoutScroll, 200);
      setTimeout(fixLayoutScroll, 500);
      
      // Hide loading screen after fixes are complete
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    };

    initializePage();

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
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
      {isLoading && (
        <LoadingScreen
          theme={theme}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LoadingDots theme={theme}>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </LoadingDots>
          <LoadingText theme={theme}>Loading...</LoadingText>
        </LoadingScreen>
      )}
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
            background: theme === 'dark' ? element.color : element.color.replace('145, 161, 209', '74, 86, 128'),
            transform: `translate(
              ${(mousePosition.x - window.innerWidth / 2) / element.movementFactor}px,
              ${(mousePosition.y - window.innerHeight / 2) / element.movementFactor}px
            )`,
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          }}
          whileHover={{
            opacity: 0.8,
            transition: { duration: 0.3 }
          }}
        />
      ))}
      <ContentLayer>
        <MobileNavContainer>
          <MobileMenuButtonContainer>
            <MenuButton
              theme={theme}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </MenuButton>
          </MobileMenuButtonContainer>
        </MobileNavContainer>
        
        <MobileNav theme={theme} isOpen={isMenuOpen}>
          <CloseButton
            theme={theme}
            onClick={closeMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FiX />
          </CloseButton>
          <MobileLinkContainer>
            <NavLink
              href="#projects"
              className={activeSection === 'projects' ? 'active' : ''}
              theme={theme}
              onClick={closeMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              projects
            </NavLink>
            <NavLink
              href="#skills"
              className={activeSection === 'skills' ? 'active' : ''}
              theme={theme}
              onClick={closeMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              skills
            </NavLink>
            <NavLink
              href="#contact"
              className={activeSection === 'contact' ? 'active' : ''}
              theme={theme}
              onClick={closeMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
          </MobileLinkContainer>
        </MobileNav>
        
        <LogoContainer>
          <Logo
            href="#"
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProfileImage
              src="/profile.png"
              alt="Samyak Jain Profile"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </Logo>
        </LogoContainer>
        <Nav theme={theme}>
          <NavLinks isOpen={isMenuOpen} theme={theme}>
            <NavLink
              href="#projects"
              className={activeSection === 'projects' ? 'active' : ''}
              theme={theme}
              onClick={closeMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              projects
            </NavLink>
            <NavLink
              href="#skills"
              className={activeSection === 'skills' ? 'active' : ''}
              theme={theme}
              onClick={closeMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              skills
            </NavLink>
            <NavLink
              href="#contact"
              className={activeSection === 'contact' ? 'active' : ''}
              theme={theme}
              onClick={closeMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
                I'm a {age}-year-old sophomore Computer Science student at UW–Madison passionate about machine learning, AI, LLMs, and computer vision. I love solving problems and building efficient systems.
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
