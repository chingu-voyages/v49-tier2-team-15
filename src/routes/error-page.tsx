import { useNavigate, useRouteError } from 'react-router-dom';

import { Button } from '@/components/ui/button';

export default function ErrorPage() {
  const error = useRouteError();

  const errorText = {
    name: 'An unexpected error has occurred',
    message: 'Sorry, something went wrong with the request.',
  };

  if (error instanceof Error) {
    (errorText.name = error.name), (errorText.message = error.message);
  }

  const navigate = useNavigate();

  return (
    <main className="p-20 space-y-8">
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{errorText.name || errorText.message}</i>
        </p>
        <Button onClick={() => navigate('/')}>Take me home!</Button>
      </div>
    </main>
  );
}
