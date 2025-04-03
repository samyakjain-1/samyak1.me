import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const TypewriterContainer = styled(motion.div)`
  display: inline-block;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: -4px;
    top: 10%;
    height: 80%;
    width: 2px;
    background: #91a1d1;
    animation: blink 0.8s infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

interface TypewriterTextProps {
  text: string;
  delay?: number;
  className?: string;
  speed?: number;
}

const TypewriterText = ({ 
  text, 
  delay = 0, 
  className,
  speed = 50 
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      
      const intervalId = setInterval(() => {
        if (currentIndex <= text.length) {
          const currentText = text.slice(0, currentIndex);
          // Apply gradient to name
          const formattedText = currentText.replace(
            /(Samyak\s*Jain)/g,
            '<span class="highlight">$1</span>'
          );
          setDisplayedText(formattedText);
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, speed);

      return () => clearInterval(intervalId);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return (
    <TypewriterContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className={className}
      dangerouslySetInnerHTML={{ __html: displayedText }}
    />
  );
};

export default TypewriterText; 