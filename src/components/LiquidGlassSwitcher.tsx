import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const SwitcherContainer = styled.fieldset<{ theme: string }>`
  position: fixed;
  z-index: 100;
  top: 1.5rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 168px;
  max-width: 168px;
  height: 50px;
  box-sizing: border-box;
  padding: 6px 10px 8px;
  margin: 0;
  border: none;
  border-radius: 99em;
  font-size: 20px;
  background-color: ${props => props.theme === 'dark' 
    ? 'rgba(187, 187, 188, 0.12)' 
    : 'rgba(187, 187, 188, 0.12)'
  };
  backdrop-filter: blur(8px) saturate(150%);
  -webkit-backdrop-filter: blur(8px) saturate(150%);
  box-shadow: 
    inset 0 0 0 1px ${props => props.theme === 'dark' 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(255, 255, 255, 0.1)'
    },
    inset 1.8px 3px 0px -2px ${props => props.theme === 'dark' 
      ? 'rgba(255, 255, 255, 0.27)' 
      : 'rgba(255, 255, 255, 0.9)'
    }, 
    inset -2px -2px 0px -2px ${props => props.theme === 'dark' 
      ? 'rgba(255, 255, 255, 0.24)' 
      : 'rgba(255, 255, 255, 0.8)'
    }, 
    inset -3px -8px 1px -6px ${props => props.theme === 'dark' 
      ? 'rgba(255, 255, 255, 0.18)' 
      : 'rgba(255, 255, 255, 0.6)'
    }, 
    inset -0.3px -1px 4px 0px ${props => props.theme === 'dark' 
      ? 'rgba(0, 0, 0, 0.24)' 
      : 'rgba(0, 0, 0, 0.12)'
    }, 
    inset -1.5px 2.5px 0px -2px ${props => props.theme === 'dark' 
      ? 'rgba(0, 0, 0, 0.4)' 
      : 'rgba(0, 0, 0, 0.2)'
    }, 
    inset 0px 3px 4px -2px ${props => props.theme === 'dark' 
      ? 'rgba(0, 0, 0, 0.4)' 
      : 'rgba(0, 0, 0, 0.2)'
    }, 
    inset 2px -6.5px 1px -4px ${props => props.theme === 'dark' 
      ? 'rgba(0, 0, 0, 0.2)' 
      : 'rgba(0, 0, 0, 0.1)'
    }, 
    0px 1px 5px 0px ${props => props.theme === 'dark' 
      ? 'rgba(0, 0, 0, 0.2)' 
      : 'rgba(0, 0, 0, 0.1)'
    }, 
    0px 6px 16px 0px ${props => props.theme === 'dark' 
      ? 'rgba(0, 0, 0, 0.16)' 
      : 'rgba(0, 0, 0, 0.08)'
    };
  transition: 
    background-color 400ms cubic-bezier(1, 0.0, 0.4, 1),
    box-shadow 400ms cubic-bezier(1, 0.0, 0.4, 1);

  &::after {
    content: '';
    position: absolute;
    left: 4px;
    top: 4px;
    display: block;
    width: 74px;
    height: calc(100% - 10px);
    border-radius: 99em;
    background-color: ${props => props.theme === 'dark' 
      ? 'rgba(187, 187, 188, 0.36)' 
      : 'rgba(187, 187, 188, 0.36)'
    };
    z-index: -1;
    box-shadow: 
      inset 0 0 0 1px ${props => props.theme === 'dark' 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(255, 255, 255, 0.1)'
      },
      inset 2px 1px 0px -1px ${props => props.theme === 'dark' 
        ? 'rgba(255, 255, 255, 0.27)' 
        : 'rgba(255, 255, 255, 0.9)'
      }, 
      inset -1.5px -1px 0px -1px ${props => props.theme === 'dark' 
        ? 'rgba(255, 255, 255, 0.24)' 
        : 'rgba(255, 255, 255, 0.8)'
      }, 
      inset -2px -6px 1px -5px ${props => props.theme === 'dark' 
        ? 'rgba(255, 255, 255, 0.18)' 
        : 'rgba(255, 255, 255, 0.6)'
      }, 
      inset -1px 2px 3px -1px ${props => props.theme === 'dark' 
        ? 'rgba(0, 0, 0, 0.4)' 
        : 'rgba(0, 0, 0, 0.2)'
      }, 
      inset 0px -4px 1px -2px ${props => props.theme === 'dark' 
        ? 'rgba(0, 0, 0, 0.2)' 
        : 'rgba(0, 0, 0, 0.1)'
      }, 
      0px 3px 6px 0px ${props => props.theme === 'dark' 
        ? 'rgba(0, 0, 0, 0.16)' 
        : 'rgba(0, 0, 0, 0.08)'
      };
    transition: 
      background-color 400ms cubic-bezier(1, 0.0, 0.4, 1),
      box-shadow 400ms cubic-bezier(1, 0.0, 0.4, 1),
      transform 400ms cubic-bezier(1, 0.0, 0.4, 1);
  }

  &[data-option="1"]::after {
    transform: translateX(0);
    animation: scaleToggle 440ms ease;
  }

  &[data-option="2"]::after {
    transform: translateX(76px);
    animation: scaleToggle2 440ms ease;
  }

  @keyframes scaleToggle {
    0% { scale: 1 1; }
    50% { scale: 1.1 1; }
    100% { scale: 1 1; }
  }

  @keyframes scaleToggle2 {
    0% { scale: 1 1; }
    50% { scale: 1.2 1; }
    100% { scale: 1 1; }
  }

  @media (max-width: 768px) {
    right: 1rem;
    width: 140px;
    max-width: 140px;
    height: 60px;
    padding: 6px 10px 8px;
    
    &::after {
      width: 60px;
    }

    &[data-option="2"]::after {
      transform: translateX(62px);
    }
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const SwitcherLegend = styled.legend`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
`;

const SwitcherInput = styled.input`
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
  height: 1px;
  width: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
`;

const SwitcherOption = styled.label<{ theme: string; isChecked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  width: 68px;
  height: 100%;
  box-sizing: border-box;
  border-radius: 99em;
  opacity: 1;
  transition: all 160ms;
  cursor: pointer;
  color: ${props => props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};

  &:hover {
    color: ${props => props.theme === 'dark' ? '#91a1d1' : '#91a1d1'};
  }

  &:hover svg {
    transform: scale(1.2);
  }

  ${props => props.isChecked && `
    color: ${props.theme === 'dark' ? '#CCCDFA' : '#4A5680'};
    cursor: auto;
    
    svg {
      transform: scale(1);
    }
  `}

  @media (max-width: 768px) {
    width: 56px;
    padding: 0 12px;
  }
`;

const SwitcherIcon = styled.svg`
  display: block;
  width: 100%;
  height: 24px;
  transition: transform 200ms cubic-bezier(0.5, 0, 0, 1);
  fill: currentColor;

  @media (max-width: 768px) {
    height: 20px;
  }
`;

const LiquidGlassSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const switcherRef = useRef<HTMLFieldSetElement>(null);
  const selectedOption = theme === 'light' ? '1' : '2';

  useEffect(() => {
    const switcher = switcherRef.current;
    if (!switcher) return;

    switcher.setAttribute('data-option', selectedOption);
  }, [selectedOption]);

  const handleOptionChange = (option: string) => {
    const newTheme = option === '1' ? 'light' : 'dark';
    if (newTheme !== theme) {
      toggleTheme();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <SwitcherContainer 
        ref={switcherRef} 
        theme={theme} 
        className="switcher"
        data-option={selectedOption}
      >
        <SwitcherLegend>Choose theme</SwitcherLegend>
        
        <SwitcherOption theme={theme} isChecked={selectedOption === '1'}>
          <SwitcherInput 
            type="radio" 
            name="theme" 
            value="light" 
            data-option="1" 
            checked={selectedOption === '1'}
            onChange={() => handleOptionChange('1')}
          />
          <SwitcherIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 36">
            <path fillRule="evenodd" d="M18 12a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" clipRule="evenodd"/>
            <path d="M17 6.038a1 1 0 1 1 2 0v3a1 1 0 0 1-2 0v-3ZM24.244 7.742a1 1 0 1 1 1.618 1.176L24.1 11.345a1 1 0 1 1-1.618-1.176l1.763-2.427ZM29.104 13.379a1 1 0 0 1 .618 1.902l-2.854.927a1 1 0 1 1-.618-1.902l2.854-.927ZM29.722 20.795a1 1 0 0 1-.619 1.902l-2.853-.927a1 1 0 1 1 .618-1.902l2.854.927ZM25.862 27.159a1 1 0 0 1-1.618 1.175l-1.763-2.427a1 1 0 1 1 1.618-1.175l1.763 2.427ZM19 30.038a1 1 0 0 1-2 0v-3a1 1 0 1 1 2 0v3ZM11.755 28.334a1 1 0 0 1-1.618-1.175l1.764-2.427a1 1 0 1 1 1.618 1.175l-1.764 2.427ZM6.896 22.697a1 1 0 1 1-.618-1.902l2.853-.927a1 1 0 1 1 .618 1.902l-2.853.927ZM6.278 15.28a1 1 0 1 1 .618-1.901l2.853.927a1 1 0 1 1-.618 1.902l-2.853-.927ZM10.137 8.918a1 1 0 0 1 1.618-1.176l1.764 2.427a1 1 0 0 1-1.618 1.176l-1.764-2.427Z"/>
          </SwitcherIcon>
        </SwitcherOption>
        
        <SwitcherOption theme={theme} isChecked={selectedOption === '2'}>
          <SwitcherInput 
            type="radio" 
            name="theme" 
            value="dark" 
            data-option="2"
            checked={selectedOption === '2'}
            onChange={() => handleOptionChange('2')}
          />
          <SwitcherIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 36">
            <path d="M12.5 8.473a10.968 10.968 0 0 1 8.785-.97 7.435 7.435 0 0 0-3.737 4.672l-.09.373A7.454 7.454 0 0 0 28.732 20.4a10.97 10.97 0 0 1-5.232 7.125l-.497.27c-5.014 2.566-11.175.916-14.234-3.813l-.295-.483C5.53 18.403 7.13 11.93 12.017 8.77l.483-.297Zm4.234.616a8.946 8.946 0 0 0-2.805.883l-.429.234A9 9 0 0 0 10.206 22.5l.241.395A9 9 0 0 0 22.5 25.794l.416-.255a8.94 8.94 0 0 0 2.167-1.99 9.433 9.433 0 0 1-2.782-.313c-5.043-1.352-8.036-6.535-6.686-11.578l.147-.491c.242-.745.573-1.44.972-2.078Z"/>
          </SwitcherIcon>
        </SwitcherOption>
      </SwitcherContainer>
    </motion.div>
  );
};

export default LiquidGlassSwitcher;
