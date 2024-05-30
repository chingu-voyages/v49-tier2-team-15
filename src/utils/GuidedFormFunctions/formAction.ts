type SetUsageAction = { type: 'SET_USAGE'; payload: string };
type SetAudienceAction = { type: 'SET_AUDIENCE'; payload: string };
type SetMoodAction = { type: 'SET_MOOD'; payload: string };
type SetKeywordsAction = { type: 'SET_KEYWORDS'; payload: string };
type SetMoodErrorAction = { type: 'SET_MOOD_ERROR'; payload: string };
type SetKeywordsErrorAction = { type: 'SET_KEYWORDS_ERROR'; payload: string };
type SetAudienceErrorAction = { type: 'SET_AUDIENCE_ERROR'; payload: string };
type SetUsageErrorAction = { type: 'SET_USAGE_ERROR'; payload: string };

export type FormAction =
  | SetUsageAction
  | SetAudienceAction
  | SetMoodAction
  | SetMoodErrorAction
  | SetKeywordsAction
  | SetKeywordsErrorAction
  | SetAudienceErrorAction
  | SetUsageErrorAction;

export type Dispatch = (action: FormAction) => void;
