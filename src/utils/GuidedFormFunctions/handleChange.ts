import countOneWord from './countOneWord';
import { Dispatch } from './formAction';

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
      dispatch({ type: 'SET_MOOD', payload: value });
      if (countOneWord(event)) dispatch({ type: 'SET_MOOD', payload: value });
      else
        dispatch({
          type: 'SET_MOOD_ERROR',
          payload: 'Please use only one word, no spaces.',
        });
      break;
    case 'keywords':
      dispatch({ type: 'SET_KEYWORDS', payload: value });
      break;
    default:
      break;
  }
}
