import { InitialFormValues } from './types';
import { createGuidedColorPrompt } from '@/helpers/generators';
import { GuidedColorPrompt } from '@/types';

export default function submitForm(
  event: React.FormEvent<HTMLFormElement>,
  state: InitialFormValues,
  selectedKeywords: string[],
  updatePrompt: (value: string | null) => void,
) {
  event.preventDefault();

  const promptValues: GuidedColorPrompt = {
    usage: state.usage,
    audience: state.audience,
    keywords: selectedKeywords,
    mood: state.mood,
  };

  const GUIDED = createGuidedColorPrompt(promptValues);
  updatePrompt(GUIDED);
}
