/* eslint-disable no-case-declarations */
import { Dispatch } from './types';

export default function handleChange(
  event: React.ChangeEvent<HTMLInputElement>,
  dispatch: Dispatch,
) {
  const { name, value } = event.target;

  switch (name) {
    case 'usage':
      dispatch({ type: 'SET_USAGE', payload: value });
      break;
    case 'audience':
      dispatch({ type: 'SET_AUDIENCE', payload: value });
      break;
    case 'mood':
      const isMoodOneWord = event.target.value.split(' ').length === 1;
      const moodWithoutSymbolsOrNumbers = value.replace(/[^a-zA-Z]/g, '');
      isMoodOneWord &&
        dispatch({ type: 'SET_MOOD', payload: moodWithoutSymbolsOrNumbers });
      break;
    case 'keywords':
      dispatch({ type: 'SET_KEYWORDS', payload: value });
      break;
  }
}
