import { hex as contrast } from 'wcag-contrast';

import type { HEX } from '@/types';

/**
 * Determines the appropriate text color (black or white) for a given background color based on WCAG contrast ratio.
 *
 * @param {string} color - The background color in HEX format.
 * @returns {string} The text color (black or white) that provides good contrast against the background color.
 */
export function getWCAGTextColor(color: HEX): 'white' | 'black' {
  return contrast(color, '#fff') > 2 ? 'white' : 'black';
}
