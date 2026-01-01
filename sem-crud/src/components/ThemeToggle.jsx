import React from 'react';
import { useColorMode, IconButton } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import useThemeStore from '../stores/useThemeStore';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { theme, toggleTheme } = useThemeStore();

  const handleToggle = () => {
    toggleColorMode();
    toggleTheme();
    document.documentElement.className = theme === 'light' ? 'theme-dark' : 'theme-light';
  };

  return (
    <IconButton
      aria-label="Toggle theme"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={handleToggle}
    />
  );
};

export default ThemeToggle;
