import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/index.css';
import { RoutesProvider } from '@/routes';

const domElement = document.getElementById('root');

if (!domElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(domElement).render(
  <React.StrictMode>
    <RoutesProvider />
  </React.StrictMode>,
);
