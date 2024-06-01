import { createContext, useEffect, useState } from 'react';

import useColorGenerator from '@/hooks/useColorGenerator';
import { ColorContextProviderProps, ColorContextValue, HEX } from '@/types';

export const ColorContext = createContext<ColorContextValue | null>(null);

export default function ColorContextProvider({
  children,
}: ColorContextProviderProps): JSX.Element {
  // checks if the preferred browser theme is dark
  const isBrowserPreferenceDark: MediaQueryList = window.matchMedia(
    '(prefers-color-scheme: dark)',
  );

  const [theme, setTheme] = useState<'light' | 'dark'>(
    isBrowserPreferenceDark.matches ? 'dark' : 'light',
  );

  const [accentColor, setAccentColor] = useState<HEX | null>(null);

  const { colors, loading, error, updatePrompt } = useColorGenerator();

  useEffect(() => {
    setAccentColor(colors.length > 0 ? colors[2] : null);
  }, [colors]);

  function handleThemeChange(event: MediaQueryListEvent): void {
    setTheme(event.matches ? 'dark' : 'light');
  }

  useEffect(() => {
    isBrowserPreferenceDark.addEventListener('change', handleThemeChange);
    return () => {
      isBrowserPreferenceDark.removeEventListener('change', handleThemeChange);
    };
  }, []);

  return (
    <ColorContext.Provider
      value={{
        theme,
        accentColor,
        setTheme,
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
