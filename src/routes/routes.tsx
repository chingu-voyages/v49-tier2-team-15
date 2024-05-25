import { RouteObject } from 'react-router-dom';

import Root from './Root';
import ErrorPage from '@/error-page';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <div>Home page</div>,
      },
      {
        path: '/about',
        element: <h1>About page</h1>,
      },
      {
        path: '/ai-generator',
        element: <h1>AI Generator page</h1>,
      },
      {
        path: 'page-3',
        element: <h1>Page 3</h1>,
      },
    ],
  },
];

export { routes };
