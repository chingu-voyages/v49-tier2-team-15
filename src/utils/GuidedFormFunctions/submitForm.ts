import hasEmptyValues from './checkEmptyValues';
import { Dispatch, FormAction } from './formAction';
import { initialFormValues } from './formReducer';
import { createGuidedColorPrompt } from '@/helpers/generators';
import { GuidedColorPrompt } from '@/types';

const isValidKey = (key: string): key is keyof GuidedColorPrompt => {
  return ['usage', 'audience', 'keywords', 'mood'].includes(key);
};

export default function submitForm(
  event: React.FormEvent<HTMLFormElement>,
  state: typeof initialFormValues,
  selectedKeywords: string[],
  dispatch: Dispatch,
  updatePrompt: (value: string | null) => void,
) {
  event.preventDefault();

  const promptValues: GuidedColorPrompt = {
    initialColor: '#anyColor',
    usage: state.usage,
    audience: state.audience,
    keywords: selectedKeywords,
    mood: state.mood,
  };

  if (hasEmptyValues(promptValues)) {
    (Object.keys(promptValues) as Array<keyof GuidedColorPrompt>).forEach(
      (key) => {
        const value = promptValues[key];

        if (value === '' || value.length === 0) {
          if (isValidKey(key)) {
            let actionType: FormAction['type'] = 'SET_USAGE_ERROR';

            switch (key) {
              case 'usage':
                actionType = 'SET_USAGE_ERROR';
                break;
              case 'audience':
                actionType = 'SET_AUDIENCE_ERROR';
                break;
              case 'keywords':
                actionType = 'SET_KEYWORDS_ERROR';
                break;
              case 'mood':
                actionType = 'SET_MOOD_ERROR';
                break;
            }

            dispatch({
              type: actionType,
              payload: 'This field is required.',
            });
          }
        }
      },
    );
    return;
  }

  const GUIDED = createGuidedColorPrompt(promptValues);
  updatePrompt(GUIDED);
}
