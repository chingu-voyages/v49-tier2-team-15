type SetUsageAction = { type: 'SET_USAGE'; payload: string };
type SetAudienceAction = { type: 'SET_AUDIENCE'; payload: string };
type SetMoodAction = { type: 'SET_MOOD'; payload: string };
type SetKeywordsAction = { type: 'SET_KEYWORDS'; payload: string };
type SetKeywordsErrorAction = { type: 'SET_KEYWORDS_ERROR'; payload: string };

export type FormAction =
  | SetUsageAction
  | SetAudienceAction
  | SetMoodAction
  | SetKeywordsAction
  | SetKeywordsErrorAction;

export type Dispatch = (action: FormAction) => void;

export type InitialFormValues = {
  usage: string;
  audience: string;
  mood: string;
  keywords: string;
  keywordsError: string;
};
