import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

import useColorGenerator from '@/hooks/useColorGenerator';
import { HEX } from '@/types';

type ColorContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: HEX[];
  accentColor: HEX;
  updatePrompt: (prompt: string | null) => void;
  loading: boolean;
  error: Error | null;
};

export const ColorContext = createContext<ColorContextType>(null!);

const initialAccentColor = '#ff206e';

export interface ColorProviderProps {
  children: ReactNode;
}

export default function ColorProvider({ children }: ColorProviderProps) {
  const { colors, loading, error, updatePrompt } = useColorGenerator();
  const [accentColor, setAccentColor] = useState<HEX>(initialAccentColor);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // checks if the preferred browser theme is dark
  const isBrowserPreferenceDark: MediaQueryList = window.matchMedia(
    '(prefers-color-scheme: dark)',
  );

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  const handleThemeChange = useCallback((event: MediaQueryListEvent) => {
    setIsDarkMode(event.matches);
    document.documentElement.classList.toggle('dark');
  }, []);

  useEffect(() => {
    setAccentColor((current) => colors[0] ?? current);
  }, [colors]);

  useEffect(() => {
    isBrowserPreferenceDark.addEventListener('change', handleThemeChange);
    return () => {
      isBrowserPreferenceDark.removeEventListener('change', handleThemeChange);
    };
  }, [isBrowserPreferenceDark, handleThemeChange]);

  return (
    <ColorContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        accentColor,
        error,
        updatePrompt,
        loading,
        colors,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
}
