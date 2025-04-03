import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ContactSection = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 3rem;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#2D3348'};
  text-align: center;
`;

const EmailButton = styled(motion.a)`
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  padding: 0.75rem 2rem;
  border: 1px solid ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  border-radius: 4px;
  transition: all 0.3s ease;
  background: ${props => props.theme === 'dark' ? 'transparent' : '#FFFFFF'};
  box-shadow: ${props => props.theme === 'dark' ? 'none' : '0 2px 4px rgba(45, 51, 72, 0.08)'};

  &:hover {
    color: #91a1d1;
    border-color: #91a1d1;
    box-shadow: ${props => props.theme === 'dark' ? 'none' : '0 4px 8px rgba(45, 51, 72, 0.12)'};
  }
`;

const Footer = styled.footer`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const FooterText = styled.p`
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Contact = () => {
  const { theme } = useTheme();
  
  return (
    <ContactSection id="contact">
      <SectionTitle
        theme={theme}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        CONTACT
      </SectionTitle>
      <EmailButton
        theme={theme}
        href="mailto:samyakjain2575@gmail.com"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        email me
      </EmailButton>
      <Footer>
        <FooterText theme={theme}>
          Made by Samyak Jain {'❤️'}
        </FooterText>
      </Footer>
    </ContactSection>
  );
};

export default Contact; 