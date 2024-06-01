import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

import useColorGenerator from '@/hooks/useColorGenerator';
import { HEX } from '@/types';

export type ColorContextType = {
  theme: 'light' | 'dark';
  updateTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
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
  // checks if the preferred browser theme is dark
  const isBrowserPreferenceDark: MediaQueryList = window.matchMedia(
    '(prefers-color-scheme: dark)',
  );

  const [theme, setTheme] = useState<'light' | 'dark'>(
    isBrowserPreferenceDark.matches ? 'dark' : 'light',
  );
  const [accentColor, setAccentColor] = useState<HEX>(initialAccentColor);
  const { colors, loading, error, updatePrompt } = useColorGenerator();

  useEffect(() => {
    setAccentColor((current) => colors[0] ?? current);
  }, [colors]);

  const handleThemeChange = useCallback((event: MediaQueryListEvent) => {
    setTheme(event.matches ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    isBrowserPreferenceDark.addEventListener('change', handleThemeChange);
    return () => {
      isBrowserPreferenceDark.removeEventListener('change', handleThemeChange);
    };
  }, [isBrowserPreferenceDark, handleThemeChange]);

  return (
    <ColorContext.Provider
      value={{
        theme,
        accentColor,
        updateTheme: setTheme,
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
