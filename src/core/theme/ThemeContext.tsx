import React, {createContext, useContext, useEffect, useState} from 'react';
import {
  Provider as PaperProvider,
  DefaultTheme,
  MD3DarkTheme,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

// Custom themes
export const customDefaultTheme: any = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    backgroundLight: '#ffffff',
    background: '#ffffff',
    text: '#000000',
    card: '#ffffff',
    surface: '#ffffff',
    accent: '#03dac4',
    error: '#B00020',
    onBackground: '#000000',
    onSurface: '#000000',
  },
};

export const customDarkTheme: any = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#bb86fc',
    backgroundLight: '#424242',
    background: '#000',
    text: '#ffffff',
    card: '#121212',
    surface: '#121212',
    accent: '#03dac6',
    error: '#CF6679',
    onBackground: '#ffffff',
    onSurface: '#ffffff',
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('appTheme');
        if (savedTheme) {
          setTheme(savedTheme as 'light' | 'dark');
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem('appTheme', theme);
      } catch (error) {
        console.error('Failed to save theme:', error);
      }
    };

    saveTheme();
  }, [theme]);

  const currentTheme = theme === 'light' ? customDefaultTheme : customDarkTheme;

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <PaperProvider theme={currentTheme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
