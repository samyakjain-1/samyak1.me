import { useState } from 'react';
import styled from '@emotion/styled';


const GlassMorphism = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 244px;
  max-width: 244px;
  height: 70px;
  box-sizing: border-box;
  padding: 8px 12px 10px;
  margin: 0 auto;
  border: none;
  border-radius: 99em;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),
    inset 1.8px 3px 0px -2px rgba(0, 0, 0, 0.1),
    inset -2px -2px 0px -2px rgba(0, 0, 0, 0.1),
    inset -3px -8px 1px -6px rgba(0, 0, 0, 0.06),
    inset -0.3px -1px 4px 0px rgba(0, 0, 0, 0.12),
    inset -1.5px 2.5px 0px -2px rgba(0, 0, 0, 0.2),
    inset 0px 3px 4px -2px rgba(0, 0, 0, 0.2),
    inset 2px -6.5px 1px -4px rgba(0, 0, 0, 0.1),
    0px 1px 5px 0px rgba(0, 0, 0, 0.1),
    0px 6px 16px 0px rgba(0, 0, 0, 0.08);
  transition: 
    background-color 400ms 
      cubic-bezier(1, 0.0, 0.4, 1),
    box-shadow 400ms
      cubic-bezier(1, 0.0, 0.4, 1);
`;

const GlassSwitcher = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GlassOption = styled.div`
  --c: #6b7280;
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

  &:hover {
    --c: #1f2937;
    cursor: pointer;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const GlassIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const ThemeSwitcher = () => {
  const [_, setTheme] = useState<'light' | 'dark' | 'dim'>('light');

  const toggleTheme = (newTheme: 'light' | 'dark' | 'dim') => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <GlassMorphism>
      <GlassSwitcher>
        <GlassOption onClick={() => toggleTheme('light')}>
          <GlassIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 .621-.504 1.125-1.125 1.125H6.375a1.125 1.125 0 00-1.125 1.125V18a9 9 0 009 9v.75c0 1.03-.84 1.875-1.875 1.875H14.25A5.25 5.25 0 0112 20.25c-2.07 0-3.75-1.68-3.75-3.75V9.475A5.25 5.25 0 0114.25 5.25h2.625a5.25 5.25 0 013.712 1.305v1.75c0 .621-.504 1.125-1.125 1.125H9.75a1.125 1.125 0 00-1.125 1.125V18a9 9 0 009 9v.75c0 1.03-.84 1.875-1.875 1.875H11.25A5.25 5.25 0 016 20.25c-2.07 0-3.75-1.68-3.75-3.75V9.475A5.25 5.25 0 013 5.25H.75A.75.75 0 000 6v12a.75.75 0 00.75.75H5a.75.75 0 00.75-.75V9.75c0-1.03.84-1.875 1.875-1.875h.675a5.25 5.25 0 013.785 1.615V9a.75.75 0 00-.75-.75z" clipRule="evenodd" />
            </svg>
          </GlassIcon>
          <span>Light</span>
        </GlassOption>
        <GlassOption onClick={() => toggleTheme('dark')}>
          <GlassIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.75 13.5a5.25 5.25 0 0 0-5.25 5.25 5.25 5.25 0 0 0 5.25-5.25 5.25 5.25 0 0 0-5.25-5.25 5.25 5.25 0 0 0 5.25 5.25M9.75 13.5a5.25 5.25 0 0 1 8.25-4.5 5.25 5.25 0 0 1 8.25 4.5 5.25 5.25 0 0 1-8.25-4.5 5.25 5.25 0 0 1-8.25 4.5M9.75 13.5a5.25 5.25 0 0 0 9.75 0" />
            </svg>
          </GlassIcon>
          <span>Dark</span>
        </GlassOption>
        <GlassOption onClick={() => toggleTheme('dim')}>
          <GlassIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M9.75 13.5a5.25 5.25 0 0 0-5.25 5.25 5.25 5.25 0 0 0 5.25 5.25 5.25 5.25 0 0 0 5.25-5.25 5.25 5.25 0 0 0-5.25-5.25M9.75 13.5a5.25 5.25 0 0 1 8.25-4.5 5.25 5.25 0 0 1 8.25 4.5 5.25 5.25 0 0 1-8.25-4.5 5.25 5.25 0 0 1-8.25 4.5M9.75 13.5a5.25 5.25 0 0 0 9.75 0" />
            </svg>
          </GlassIcon>
          <span>Dim</span>
        </GlassOption>
      </GlassSwitcher>
    </GlassMorphism>
  );
};


export default ThemeSwitcher;
