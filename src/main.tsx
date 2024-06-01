import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/index.css';
import { RoutesProvider } from '@/routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RoutesProvider />
  </React.StrictMode>,
);
