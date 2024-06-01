import { RouteObject } from 'react-router-dom';

import ErrorPage from '@/routes/error-page';
import Generator from '@/routes/generator';
import Home from '@/routes/home';
import Root from '@/routes/root';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/generator',
        element: <Generator />,
      },
    ],
  },
];

export { routes };
