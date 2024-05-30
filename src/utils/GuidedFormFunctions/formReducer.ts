export const initialFormValues = {
  usage: '',
  usageError: '',
  audience: '',
  audienceError: '',
  mood: '',
  moodError: '',
  keywords: '',
  keywordsError: '',
};

export function formReducer(
  state: typeof initialFormValues,
  action: { type: string; payload: string },
) {
  switch (action.type) {
    case 'SET_USAGE':
      return { ...state, usage: action.payload, usageError: '' };
    case 'SET_USAGE_ERROR':
      return { ...state, usageError: action.payload };

    case 'SET_AUDIENCE':
      return { ...state, audience: action.payload, audienceError: '' };
    case 'SET_AUDIENCE_ERROR':
      return { ...state, audienceError: action.payload };

    case 'SET_MOOD':
      return { ...state, mood: action.payload, moodError: '' };
    case 'SET_MOOD_ERROR':
      return { ...state, moodError: action.payload };

    case 'SET_KEYWORDS':
      return { ...state, keywords: action.payload, keywordsError: '' };
    case 'SET_KEYWORDS_ERROR':
      return { ...state, keywordsError: action.payload };

    default:
      return state;
  }
}
