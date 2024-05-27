import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { routes } from './routes';

const router = createBrowserRouter(routes);

const RoutesProvider = () => {
  return <RouterProvider router={router} />;
};

export { RoutesProvider };
