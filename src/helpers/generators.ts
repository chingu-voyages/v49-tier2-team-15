import type { ChatCompletionMessage } from 'openai/resources/index.mjs';

import { openai } from '@/lib/openai';
import type { BasicColorPrompt, GuidedColorPrompt, HEX } from '@/types';

/**
 * Create basic prompt for generating color palette with OpenAI.
 *
 * @param {BasicColorPrompt} input - The input parameters for the prompt.
 * @param {string} input.initialColor - The initial hex color to base the schema on.
 * @param {string} input.usage - The usage context for the color schema.
 * @returns {string} The formatted prompt to be used by OpenAI.
 */
export function createBasicColorPrompt(input: BasicColorPrompt): string {
  return `Generate a color scheme for a design project with the base color ${input.initialColor} to be used for ${input.usage}. Provide only 5 hex colors.`;
}

/**
 * Create a guided prompt for generating color palette with OpenAI.
 *
 * @param {GuidedColorPrompt} input - The input parameters for the prompt.
 * @param {string} input.usage - The usage context for the color scheme.
 * @param {string} input.audience - The target audience for the color scheme.
 * @param {string} input.mood - The desired mood for the color scheme.
 * @param {string[]} input.keywords - Additional keywords to guide the color scheme.
 * @returns {string} The formatted prompt to be used by OpenAI.
 */
export function createGuidedColorPrompt(input: GuidedColorPrompt): string {
  return `Generate a color scheme for a design project to be used for ${input.usage}. The target audience is ${input.audience}. The desired mood is ${input.mood}. Keywords to consider: ${input.keywords.join(', ')}. Provide only 5 hex colors.`;
}

/**
 * Generates a color palette based on the provided prompt.
 *
 * @param {string} prompt - The prompt to send to the OpenAI API.
 * @returns {Promise<string>} A promise that resolves to the generated color palette.
 */
export async function generateColorPalette(
  prompt: string,
): Promise<ChatCompletionMessage> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 100,
    n: 1,
    stop: null,
    temperature: 0.7,
  });

  return completion.choices[0].message;
}

/**
 * Extracts hex color codes from a given message.
 *
 * @param {string} message - The message to search for hex color codes.
 * @returns {HEX[]} An array of found hex color codes.
 */
export function getHexColorFromMessage(message: string): HEX[] {
  const colors = message.match(/#[0-9a-fA-F]{6}/g);
  return (colors || []) as HEX[];
}
