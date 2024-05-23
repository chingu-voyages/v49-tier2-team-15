import { useEffect, useState } from 'react';

import {
  generateColorPalette,
  getHexColorFromMessage,
} from '@/helpers/generators';
import { HEX } from '@/types';

/**
 * Custom hook used to generate color palettes using OpenAI based on user input.
 *
 * @returns {{
 *   updatePrompt: (prompt: string | null) => void,
 *   colors: HEX[],
 *   loading: boolean,
 *   error: Error | null
 * }} Object containing methods and state for handling color generation.
 */
export default function useColorGenerator(): {
  updatePrompt: (prompt: string | null) => void;
  colors: HEX[];
  loading: boolean;
  error: Error | null;
} {
  const [prompt, setPrompt] = useState<string | null>(null);
  const [colors, setColors] = useState<HEX[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function generate() {
      if (!prompt) return;

      try {
        setLoading(true);
        const response = await generateColorPalette(prompt);

        if (response.content) {
          setColors(getHexColorFromMessage(response.content));
          return setError(null);
        }

        throw Error(
          'Something went wrong while generating the colors, please try again!',
        );
      } catch (error) {
        if (!(error instanceof Error)) throw error;
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    generate();
  }, [prompt]);

  return { updatePrompt: setPrompt, colors, loading, error };
}
