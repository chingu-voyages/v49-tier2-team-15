export type HEX = `#${string}`;

export type Keyword = string;

export interface BasicColorPrompt {
  initialColor: HEX;
  usage: string;
}

export interface GuidedColorPrompt {
  usage: string;
  audience: string;
  mood: string;
  keywords: Keyword[];
}
