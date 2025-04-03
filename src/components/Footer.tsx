import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  padding: 4rem 0;
  border-top: 1px solid #2D3348;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: #91a1d1;
  font-size: 0.875rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const SocialLink = styled(motion.a)`
  color: #CCCDFA;
  font-size: 1.25rem;
  &:hover {
    color: #91a1d1;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </Copyright>
        <SocialLinks>
          <SocialLink
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub
          </SocialLink>
          <SocialLink
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            LinkedIn
          </SocialLink>
          <SocialLink
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Twitter
          </SocialLink>
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 