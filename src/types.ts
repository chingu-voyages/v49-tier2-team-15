export type HEX = `#${string}`;

export type Keyword = string;

export interface BasicColorPrompt {
  initialColor: HEX;
  usage: string;
}

export interface GuidedColorPrompt extends BasicColorPrompt {
  audience: string;
  mood: string;
  keywords: Keyword[];
}

export interface ColorContextValue {
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  colors: HEX[];
  accentColor: HEX | null;
  updatePrompt: (prompt: string | null) => void;
  loading: boolean;
  error: Error | null;
}

export interface ColorContextProviderProps {
  children: React.ReactNode;
}
