import { InitialFormValues } from './types';

export function formReducer(
  state: InitialFormValues,
  action: { type: string; payload: string },
) {
  switch (action.type) {
    case 'SET_USAGE':
      return { ...state, usage: action.payload };
    case 'SET_AUDIENCE':
      return { ...state, audience: action.payload };
    case 'SET_MOOD':
      return { ...state, mood: action.payload };
    case 'SET_KEYWORDS':
      return { ...state, keywords: action.payload, keywordsError: '' };
    case 'SET_KEYWORDS_ERROR':
      return { ...state, keywordsError: action.payload };
    default:
      return state;
  }
}
