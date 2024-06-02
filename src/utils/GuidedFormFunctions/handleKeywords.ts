import { Dispatch, initialFormValues } from './types';

export function handleAddCustomKeyword(
  state: initialFormValues,
  selectedKeywords: string[],
  setSelectedKeywords: React.Dispatch<React.SetStateAction<string[]>>,
  dispatch: Dispatch,
) {
  if (
    state.keywords &&
    !selectedKeywords.includes(state.keywords) &&
    selectedKeywords.length < 5
  ) {
    setSelectedKeywords([...selectedKeywords, state.keywords]);
    dispatch({ type: 'SET_KEYWORDS', payload: '' });
  } else if (selectedKeywords.length >= 5) {
    dispatch({
      type: 'SET_KEYWORDS_ERROR',
      payload:
        'Maximum number of keywords exceeded. Only 5 keywords are allowed.',
    });
  }
}

export function handleDeleteKeyword(
  keyword: string,
  selectedKeywords: string[],
  setSelectedKeywords: React.Dispatch<React.SetStateAction<string[]>>,
  dispatch: Dispatch,
) {
  setSelectedKeywords(selectedKeywords.filter((word) => word !== keyword));
  dispatch({
    type: 'SET_KEYWORDS_ERROR',
    payload: '',
  });
}
